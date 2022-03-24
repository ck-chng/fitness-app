const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//so that we can use the dotenv 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//allows frontend and backend of different origin port to interact
app.use(cors());

//enables put and post request data to be parsed as JSON
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})