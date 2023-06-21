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
const upload = multer({ dest: 'uploads/' });




const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', cors(), routes)

  

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})