const router = require('express').Router();
const validation = require('../helper/validationHelper');

const SubSched = require('../models/subjectScheduleModel');

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

module.exports = router;