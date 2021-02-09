const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  student_id: {type: String, required: true, unique: true},
  lastname: {type: String, required: true}, 
  firstname: {type: String, required: true}, 
  middlename: {type: String},
  age: {type: Number},
  dob: {type: Date, default: Date.now},
  address: {type: String},
  contact: {type: String},
  course: {type: String},
  yearsection: {type: String},  
  // subject_schedule_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}
  sub_sched_lst: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject Schedule'}]
});

module.exports = studentModel = mongoose.model('Student', StudentSchema);