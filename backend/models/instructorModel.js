const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// list of schedules
const InstructorSchema = new Schema({
  instructor_name: {type: String, required: true}  
});

module.exports = instructorModel = mongoose.model('Instructor', InstructorSchema);