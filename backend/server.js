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

// use routes
app.use('/admin', require('./routes/admin'));
app.use('/student', require('./routes/student'));
app.use('/instructor', require('./routes/instructor'));
app.use('/subject', require('./routes/subject'));
app.use('/subsched', require('./routes/subjectscheule'));
app.use('/schedule', require('./routes/schedule'));
app.use('/grade', require('./routes/grade'));

// for production
// create a custom variable inside heroku/this is how we tell our app is on heroku
if (process.env.NODE_ENV === 'production') {
  // add our react/client application into our server
  app.use(express.static('../'))
}

// start our server
app.listen(port, () => {
  console.log(`Server started at ${port}`);
})