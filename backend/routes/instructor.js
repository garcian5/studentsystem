const router = require('express').Router();

const Instructor = require('../models/instructorModel');

router.post('/addinstructor', async (req, res) => {
  try {
    const {instructor_name} = req.body;
    const savedInstructor = await new Instructor({instructor_name}).save();
    res.json(savedInstructor);
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;