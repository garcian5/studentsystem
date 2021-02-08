const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// list of schedules
const SubjectScheduleSchema = new Schema({
  subject_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true},
  time: {
    from: {type: String, required: true}, 
    to: {type: String, required: true}
  },
  day: {type: String, required: true}
});

module.exports = subjectScheduleModel = mongoose.model('Subject Schedule', SubjectScheduleSchema);