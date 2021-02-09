const router = require('express').Router();
const validation = require('../helper/validationHelper');

const Student = require('../models/studentModel');
const Grade = require('../models/gradeModel');

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

    const existingStudentId = await Student.findOne({student_id: student_id});
    if (existingStudentId) return validation('existingStudentID', res);

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
    // select only lastname firstname and middlename (_id will always be there)
    const allStudents = await Student.find({})
      .select({"lastname": 1, "firstname": 1, "middlename": 1, "student_id": 1})
      .sort({lastname: 1});
    
    res.json(allStudents);
  } catch (err) { res.status(500).json({error: err.message}); }
})

/**
 * @route   POST student/getstudent/:id
 * @desc    gets a student by a given id (_id)
 * @component StudentInfo.js get a student's info
 * */
router.get('/getstudent/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({path: 'sub_sched_lst', populate: {path: 'subject_id', populate: {path: 'instructor_id'}}})
    if (!student) return validation('studentNotExist', res);
    res.json(student)
  } catch (err) { res.status(500).json({error: err.message}); }
})

/**
 * @route   DELETE student/delstudent/:id
 * @desc    deletes a student and all their grades by a given id (_id)
 * @component StudentInfo.js deletes a student
 * */
router.delete('/delstudent/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    const grades = await Grade.deleteMany({student_id: req.params.id});

    res.json({msg: 'delete successful!', student: student, grades: grades});
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;