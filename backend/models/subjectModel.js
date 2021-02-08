const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// list of schedules
const SubjectSchema = new Schema({
  subject_name: {type: String, required: true},
  instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'}
});

module.exports = subjectModel = mongoose.model('Subject', SubjectSchema);