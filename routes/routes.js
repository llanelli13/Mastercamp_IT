const express = require("express");
const authentification = require("../middlewares/authentification");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const User = require("../models/User.js");
const Document = require("../models/Document.js");
const Bank = require("../models/Bank.js");

const Loan = require("../models/Loan.js");
const Messages = require("../models/Messages.js");
const Admin = require("../models/Admin.js");


const router = express.Router();

router.get("/test", async (req, res) => {
  res.send("Coucou")
})


// --------------- [ REQUEST FOR THE USER AUTH ] -----------------

router.post("/user/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
    }

    // Compare the plaintext password with the hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
    }

    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });

  } catch (error) {
    res.status(400).send();
  }
});

router.post("/user/logout", authentification, async (req, res) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/user/logout/all", authentification, async (req, res) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/user/register", async (req, res) => {
  console.log(req.body)

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    
    if (error.code === 11000) {
      res.status(400).json({ message: "This email is already registered" });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while registering the user" });
    }
  }
});

// --------------- [ REQUEST FOR THE LOANS ] -----------------

router.post("/loan/create", authentification, async (req, res) => {
  try {
      // Extract information from request body
      const { amount, duration, purpose } = req.body;

      // Ensure all required information is provided
      if (!amount || !duration || !purpose) {
          return res.status(400).send('Please provide all required information');
      }

      // Create a new loan document
      const loan = new Loan({
          userId: req.user._id,  // Use authenticated user's ID
          amount,
          duration,
          purpose,
          reason: ''
      });

      // Save the new loan to the database
      const savedLoan = await loan.save();

      // Respond with the saved loan
      res.json(savedLoan);
  } catch (error) {
      res.status(500).send(`Failed to create loan: ${error.message}`);
  }
});


router.put('/loan/accept/:id', authentification, async (req, res) => {
  try {

    const admin = await Admin.findOne({ adminUser: req.user._id })
    if(!admin){
      return res.status(403).json({error: 'user is not admin'})
    }

    const {reason} = req.body;
    console.log(reason)
    const loanId = req.params.id;
    
    // Check if loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    
    if(loan.status == 'pending'){
      loan.status = 'accepted'
      loan.reason = reason;
    }else{
      return res.status(404).json({ error: 'Loan is not a pending loan' });

    }

    // Save the updated loan
    const updatedLoan = await loan.save();

    res.json(updatedLoan);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update loan' });
  }
});

router.put('/loan/refuse/:id', authentification, async (req, res) => {
  try {

    const admin = await Admin.findOne({ adminUser: req.user._id })
    if(!admin){
      return res.status(403).json({error: 'user is not admin'})
    }
    const {reason} = req.body;

    const loanId = req.params.id;
    
    // Check if loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    
    if(loan.status == 'pending'){
      loan.status = 'refused';
      loan.reason = reason;

    }else{
      return res.status(404).json({ error: 'Loan is not a pending loan' });
    }

    // Save the updated loan
    const updatedLoan = await loan.save();

    res.json(updatedLoan);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update loan' });
  }
});


router.get('/loan/:id', authentification, async (req, res) => {
  try {
    const loanId = req.params.id;

    // Check if loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const admin = await Admin.findOne({ adminUser: req.user._id })
    if(loan.userId != req.user._id){
      if(!admin){
        return res.status(403).json({error: 'This is not your loan'})
      }
    }

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loan' });
  }
});

router.get('/loan', authentification, async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminUser: req.user._id });
    if (!admin) {
      return res.status(403).json({ error: 'User is not an admin' });
    }

    const loans = await Loan.find();

    res.json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

router.get('/loan/user/:id', authentification, async (req, res) => {
  try {
    const userId = req.params.id;

    // Find loans associated with the specified user ID
    const loans = await Loan.find({ userId })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .exec();

    res.json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user loans' });
  }
});


// --------------- [ REQUEST To upload and get a file ] -----------------

router.post('/upload', authentification, async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminUser: req.user._id });

    // Access the uploaded file using req.file
    const uploadedFile = req.file;

    // Assuming you have a publicly accessible directory 'public/uploads'
    const fileLink = `${req.protocol}://${req.get('host')}/uploads/${uploadedFile.filename}`;

    res.json({ link: fileLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

router.get('/file/:name', authentification, async (req, res) => {
  try {
    const fileName = req.params.name;
    const filePath = path.join(__dirname, '../uploads/', fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Assuming the file is publicly accessible, you can send its link in the response
      const fileLink = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
      res.json({ link: fileLink });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve file link' });
  }
});

// --------------- [ Messagerie ] -----------------



router.post('/message/send', authentification, async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    // Create a new message document
    const message = new Messages({
      senderId: req.user._id,  // Use authenticated user's ID as the sender
      receiverId,
      content
    });

    // Save the new message to the database
    const savedMessage = await message.save();

    res.json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/messages/:userId', authentification, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find messages between the authenticated user and the specified user
    const messages = await Messages.find({
      $or: [
        { senderId: req.user._id, receiverId: userId },
        { senderId: userId, receiverId: req.user._id }
      ]
    })
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .exec();

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// ----------------------- [ get banks ] ------------------------------


router.get('/banks', authentification, async (req, res) => {
  try {    
    // Find messages between the authenticated user and the specified user
    const banks = await Bank.find();
    res.json(banks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});





module.exports = router;
