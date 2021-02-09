const router = require('express').Router();
const validation = require('../helper/validationHelper');

const Student = require('../models/studentModel');

/**
 * @route   POST student/addstudent
 * @desc    create a student
 * @access  Public
 * */
router.post('/addstudent', async (req, res) => {
  try {
    const {student_id, 
      lastname, 
      firstname, 
      middlename, 
      age, 
      dob, 
      address, 
      contact, 
      course, 
      yearsection, 
      sub_sched_lst
    } = req.body;

    // if no entered lastname and first name don't process and return error message
    if (!lastname || !firstname || !student_id) return validation('missingEntry', res);

    const newStudent = new Student({
      student_id, 
      lastname, 
      firstname, 
      middlename, 
      age, 
      dob, 
      address, 
      contact, 
      course, 
      yearsection, 
      sub_sched_lst
    });

    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (err) { res.status(500).json({error: err.message}); }
});

/**
 * @route   POST student/getstudents
 * @desc    gets all students names and generated id
 * @component StudentDirectory.js lists all students in department
 * */
router.get('/getstudents', async (req, res) => {
  try {
    const allStudents = await Student.find().sort({lastname: 1});
    res.json(allStudents);
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;