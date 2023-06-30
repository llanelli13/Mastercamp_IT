require('dotenv').config();
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected !');
})

const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' }); // you will need to use this in your routes file
const uploadpp = multer({ dest: 'pp/' }); // you will need to use this in your routes file

const app = express();

// Enable CORS for all routes
app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use('/api', cors(), routes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // this line serves the files as static files from '/uploads' route
app.use('/pp', express.static(path.join(__dirname, 'pp'))); // this line serves the files as static files from '/uploads' route

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
