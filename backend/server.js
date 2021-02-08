// our web server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // mongodb orm

// configure our environment variables
require('dotenv').config();

// initialize database
const app = express();

// open server in port 5000 or if it's busy open in a different port
const port = process.env.PORT || 5000;

// use cors middleware and express middleware
app.use(cors());
app.use(express.json());

const mongodb_uri = process.env.MONGODB_URI;

// connect our server to mongoose
mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// start our server
app.listen(port, () => {
  console.log(`Server started at ${port}`);
})