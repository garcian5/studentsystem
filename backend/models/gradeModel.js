const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// list of schedules
const gradeSchema = new Schema({
  student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
  subject_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true},
  prelim: {type: Number, required: true},
  midterm: {type: Number, required: true},
  final: {type: Number, required: true}
});

module.exports = gradeModel = mongoose.model('grade', gradeSchema);