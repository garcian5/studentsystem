const router = require('express').Router();
const validation = require('../helper/validationHelper');

const SubSched = require('../models/subjectScheduleModel');

/**
 * @route   POST subsched/addsubsched/
 * @desc    adds a schedule for a subject
 * @component RegisterStudent.js & UpdateStudent.js 
 * */
router.post('/addsubsched', async (req, res) => {
  try {
    const {subject_id, time, day} = req.body;
    
    if (!subject_id || !time.from || !time.to || !day) return validation('missingEntry', res);

    const saveSubSched = await new SubSched({
      subject_id, time, day
    }).save();
    res.json(saveSubSched);
  } catch (err) { res.status(500).json({error: err.message}); }
})

/**
 * @route   GET subsched/allsubscheds
 * @desc    gets all subject schedules from the database
 * @component RegisterStudent.js & UpdateStudent.js
 * */
router.get('/allsubscheds', async (req, res) => {
  try {
    const allSubScheds = await SubSched.find({})
      .populate({path: 'subject_id', populate: {path: 'instructor_id'}});

    res.json(allSubScheds);
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;