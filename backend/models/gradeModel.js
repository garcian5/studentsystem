const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// list of schedules
const gradeSchema = new Schema({
  student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
  subject_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true},
  Prelim: {type: Number, required: true},
  Midterm: {type: Number, required: true},
  Final: {type: Number, required: true},
  Avg: {type: Number, required: true}
});

module.exports = gradeModel = mongoose.model('grade', gradeSchema);