const router = require('express').Router();
const validation = require('../helper/validationHelper');

const Subject = require('../models/subjectModel');

router.post('/addsubject', async (req, res) => {
  try {
    const {subject_name, instructor_id} = req.body;

    if (!subject_name) return validation('missingEntry', res);

    const saveSubject = await new Subject({
      subject_name,
      instructor_id
    }).save();
    res.json(saveSubject);
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;