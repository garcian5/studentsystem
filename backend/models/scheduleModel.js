const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// list of schedules
const ScheduleSchema = new Schema({
  sub_sched_lst: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject Schedule', require: true}]
});

module.exports = scheduleModel = mongoose.model('Schedule', ScheduleSchema);