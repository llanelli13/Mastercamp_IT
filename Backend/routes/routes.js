const express = require("express");
const authentification = require("../middlewares/authentification");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const User = require("../models/User.js");
const Document = require("../models/Document.js");
const Bank = require("../models/Bank.js");
const Token = require("../models/Token.js");
const BankAcc = require("../models/BankAcc.js");


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
    console.log(req.body)
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


router.post("/bank/connect", async (req, res) => {
  try {
  
    const acc = await BankAcc.findOne({ id: req.body.id });
    if (!acc) {
      return res.status(401).json({ message: "Invalid id" });
    }

    if (acc.pwd != req.body.pwd) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const bank = await Bank.findById(acc.bank);
    if (!bank) {
      return res.status(404).send('Bank not found');
    }
    console.log(bank._id)

    // Find users who have the same bank
    const users = await User.find({ bank: bank._id });
    console.log(users)

    // Filter users who are admins
    const admins = [];
    for(let user of users) {
      const admin = await Admin.findOne({ adminUser: user._id });
      if(admin) {
        admins.push(user);
      }
    }

    res.send({id: acc._id, bank: acc.bank, brokers: admins});

  } catch (error) {
    res.status(400).send();
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

router.post("/token/generate", async (req, res) => {
  try {
    let tokenValue;
    let tokenExists;

    const acc = await BankAcc.findOne({ id: req.body.id });
    if (!acc) {
      return res.status(401).json({ message: "Invalid id" });
    }

    if (acc.pwd != req.body.pwd) {
      return res.status(401).json({ message: "Invalid password" });
    } 

    const bank = await Bank.findById(acc.bank);
    if (!bank) {
      return res.status(404).send('Bank not found');
    }
    
    do {
      // Generate a token in the form XXXX-XXXX-XXXX-XXXX
      tokenValue = "";
      for (let i = 0; i < 4; i++) {
        tokenValue += Math.floor(1000 + Math.random() * 9000) + "-";
      }
      tokenValue = tokenValue.slice(0, -1);  // Remove the trailing "-"

      // Check if this token already exists in the database
      tokenExists = await Token.findOne({ tokenValue });
    } while(tokenExists);

    // Create a new token document
    const newToken = new Token({ tokenValue, bank: bank._id });
    await newToken.save();
    
    res.send({ message: "Token generated", token: newToken });

  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});





router.get("/user", authentification, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    console.log("not connected")
    res.status(500).send();
  }
});

router.get("/user/findone/:id", authentification, async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminUser: req.user._id })
    if(!admin){
      return res.status(403).json({error: 'user is not admin'})
    }
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    console.log("not connected")
    res.status(500).send();
  }
});

router.get("/user/isadmin", authentification, async (req, res) => {
  try {
    const adm = await Admin.findOne({ adminUser: req.user._id });
    if(adm){
      res.send(true)
    }
    res.send(false)
  } catch (err) {
    console.log("not connected")
    res.status(500).send();
  }
});
router.get("/user/getAdmins", authentification, async (req, res) => {
  try {
    // Query for all Admins
    const admins = await Admin.find();

    // Fetch each User document
    const adminsWithUsers = await Promise.all(admins.map(async (admin) => {
      if (admin.adminUser.toString() !== req.user._id.toString()) {
        const user = await User.findById(admin.adminUser);
        return { user };
      }
    }));

    // Filter out undefined values (admins that match the current user)
    const filteredAdminsWithUsers = adminsWithUsers.filter(Boolean);
    
    // Send the admins
    res.json(filteredAdminsWithUsers);
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).send();
  }
});


router.post("/admin/toggle", async (req, res) => {
  try {
      
  } catch (error) {

  }
});


router.post("/user/register", async (req, res) => {
  console.log(req.body);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    if(req.body.token){
      // Check if token exists in the TOKEN database and it's not used
      console.log(req.body.bank)
      const token = await Token.findOne({ tokenValue: req.body.token, used: false, bank: req.body.bank });
      console.log(token)

      if(token){
        // If token exists and is not used, mark it as used
        

        // Remove the 'token' field from the request body before creating a user
        delete req.body.token;

        // Create a new user
        const user = new User(req.body);
        await user.save();

        // Add the user to Admins
        const adminUser = new Admin({
          adminUser: user._id, // assuming user._id as the id of the user
        });
        console.log(adminUser)
        await adminUser.save();

        token.used = true;
        await token.save();

        res.status(200).json(user);
      } else {
        // If token is not found or already used, send an error response
        res.status(400).json({ message: "Invalid or expired token" });
      }
    } else {
      // If there is no token in the request body, just create a new user
      const user = new User(req.body);
      await user.save();

      res.status(200).json(user);
    }
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
      const { amount, duration, purpose, broker } = req.body;

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
          broker,
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
      loan.status = 'rejected';
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
    if(loan.userId.toString() != req.user._id){
      if(!admin){
        return res.status(403).json({error: 'This is not your loan'})
      }
    }

    let idDoc = 0;
    if (await Document.exists({ loanId: loan._id, documentName: 'id' })) {
      const idDocDocument = await Document.findOne({ loanId: loan._id, documentName: 'id' });
      if(idDocDocument && idDocDocument.validation){
        idDoc = 2;
      } else {
        idDoc = 1;
      }
    }

    let idCompte = 0;
    if (await Document.exists({ loanId: loan._id, documentName: 'compte' })) {
      const idCompteDocument = await Document.findOne({ loanId: loan._id, documentName: 'compte' });
      if(idCompteDocument && idCompteDocument.validation){
        idCompte = 2;
      } else {
        idCompte = 1;
      }
    }

    let idRevenus = 0;
    if (await Document.exists({ loanId: loan._id, documentName: 'revenus' })) {
      const idRevenusDocument = await Document.findOne({ loanId: loan._id, documentName: 'revenus' });
      if(idRevenusDocument && idRevenusDocument.validation){
        idRevenus = 2;
      } else {
        idRevenus = 1;
      }
    }

    // Convert Mongoose document to JS object and add validation array
    let loanObject = loan.toObject();
    loanObject.validation = [idDoc, idCompte, idRevenus];

    res.json(loanObject);
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

    const loansWithUserDetails = await Promise.all(
      loans.map(async (loan) => {
        const user = await User.findOne({ _id: loan.userId });

        let idDoc = 0;
        if (await Document.exists({ loanId: loan._id, documentName: 'id' })) {
          const idDocDocument = await Document.findOne({ loanId: loan._id, documentName: 'id' });
          if(idDocDocument && idDocDocument.validation){
            idDoc = 2;
          } else {
            idDoc = 1;
          }
        }

        let idCompte = 0;
        if (await Document.exists({ loanId: loan._id, documentName: 'compte' })) {
          const idCompteDocument = await Document.findOne({ loanId: loan._id, documentName: 'compte' });
          if(idCompteDocument && idCompteDocument.validation){
            idCompte = 2;
          } else {
            idCompte = 1;
          }
        }

        let idRevenus = 0;
        if (await Document.exists({ loanId: loan._id, documentName: 'revenue' })) {
          const idRevenusDocument = await Document.findOne({ loanId: loan._id, documentName: 'revenue' });
          if(idRevenusDocument && idRevenusDocument.validation){
            idRevenus = 2;
          } else {
            idRevenus = 1;
          }
        }

        let loanObject = loan.toObject();
        loanObject.validation = [idDoc, idCompte, idRevenus];

        return {
          loan: loanObject,
          user
        };
      })
    );

    res.json(loansWithUserDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});




router.get('/myloan', authentification, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user._id }).populate('broker', 'firstName lastName -_id');
  
    if(!loans){
      res.status(500).json({ error: '0 loan found' });
    }

    // Map through the loans array and fetch user details for each loan
    const loansWithUserDetails = await Promise.all(
      loans.map(async (loan) => {
        let idDoc = 0;
        if (await Document.exists({ loanId: loan._id, documentName: 'id' })) {
          const idDocDocument = await Document.findOne({ loanId: loan._id, documentName: 'id' });
          if(idDocDocument && idDocDocument.validation){
            idDoc = 2;
          } else {
            idDoc = 1;
          }
        }

        let idCompte = 0;
        if (await Document.exists({ loanId: loan._id, documentName: 'compte' })) {
          const idCompteDocument = await Document.findOne({ loanId: loan._id, documentName: 'compte' });
          if(idCompteDocument && idCompteDocument.validation){
            idCompte = 2;
          } else {
            idCompte = 1;
          }
        }

        let idRevenus = 0;
        if (await Document.exists({ loanId: loan._id, documentName: 'revenus' })) {
          const idRevenusDocument = await Document.findOne({ loanId: loan._id, documentName: 'revenus' });
          if(idRevenusDocument && idRevenusDocument.validation){
            idRevenus = 2;
          } else {
            idRevenus = 1;
          }
        }
        
        // Convert Mongoose document to JS object and add validation array
        let loanObject = loan.toObject();
        loanObject.validation = [idDoc, idCompte, idRevenus];

        // Concatenate broker's firstName and lastName
        if (loanObject.broker) {
          loanObject.broker = loanObject.broker.firstName + ' ' + loanObject.broker.lastName;
        }

        return loanObject;
      })
    );

    res.json(loansWithUserDetails);
  } catch (error) {
    console.log("eee")
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
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Append extension
  }
})

const storagepp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pp/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Append extension
  }
})

let upload = multer({ storage: storage }).any();
let uploadpp = multer({ storage: storagepp }).any();

router.post('/upload/:id/:type', upload, authentification, async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminUser: req.user._id });

    // Access the uploaded file using req.files
    const uploadedFile = req.files[0];

    // Assuming you have a publicly accessible directory 'public/uploads'
    const fileLink = `http://localhost:3000/uploads/${uploadedFile.filename}`;

    // Create a new Document
    const document = new Document({
      loanId: req.params.id, 
      documentName: req.params.type,
      documentLink: fileLink
    });

    // Save the document
    await document.save();

    res.json({ link: fileLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

router.post('/ppupload/:id', uploadpp, authentification, async (req, res) => {
  try {

    const id = req.params.id;

    const user = await User.findOne({ _id: id });



    // Access the uploaded file using req.files
    const uploadedFile = req.files[0];

    // Assuming you have a publicly accessible directory 'public/pp'
    const fileLink = `http://localhost:3000/pp/${uploadedFile.filename}`;

    user.pp = fileLink;

    await user.save()


    res.json({ link: fileLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});


router.get('/file/:id/:name', authentification, async (req, res) => {
  try {
    const id = req.params.id;
    const documentName = req.params.name;

    const document = await Document.findOne({ loanId: id, documentName: documentName });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ link: document.documentLink, validation:  document.validation});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});

router.post('/fileStatus/', authentification, async (req, res) => {
  try {
    const { ID, Bool } = req.body;  // Get ID and Bool from request body

    const document = await Document.findByIdAndUpdate(ID, { validation: Bool }, { new: true });
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.status(200).json(document);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update file' });
  }
});

router.post('/fileVerification/', authentification, async (req, res) => {
  try {
    const { ID, verification, type } = req.body;  // Get ID, verification status, and document type from request body

    const document = await Document.findOneAndUpdate({ loanId: ID, documentName: type }, { validation: verification }, { new: true });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.status(200).json(document);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update file verification' });
  }
});





// --------------- [ Messagerie ] -----------------



router.post('/message/send', authentification, async (req, res) => {
  try {
    const { content, loanId } = req.body;

    // Create a new message document
    const message = new Messages({
      senderId: req.user._id,  // Use authenticated user's ID as the sender
      loanId,
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

router.get('/messages/:loanId', authentification, async (req, res) => {
  try {
    // Find messages between the authenticated user and the specified loan
    const messages = await Messages.find({ loanId: req.params.loanId })
      .populate('senderId') // This line populates the senderId field
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .exec();

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});


// ----------------------- [ get banks ] ------------------------------


router.get('/banks', async (req, res) => {
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
