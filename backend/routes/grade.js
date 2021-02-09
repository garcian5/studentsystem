const router = require('express').Router();
const validation = require('../helper/validationHelper');

const Grade = require('../models/gradeModel');
const Student = require('../models/studentModel');
const Subject = require('../models/subjectModel');

/**
 * @route   GET grade/getgrades/:id
 * @desc    gets all available grades from a students entire subject list
 * @component StudentInfo.js
 * */
router.get('/getgrades/:id', async (req, res) =>{
  try {
    const getGrades= await Grade.find({student_id: req.params.id})
      // .populate({path: 'student_id'})
      .populate({path: 'subject_id', populate: {path: 'instructor_id'}})
    res.json(getGrades);
  } catch (err) { res.status(500).json({error: err.message}); }
})

/**
 * @route   POST grade/addgrade/(?student_id=id&subject_id=id)
 * @desc    adds a grade to the subject a student has
 * @component StudentInfo.js
 * */
router.post('/addgrade', async (req, res) =>{
  try {
    //const {student_id, subject_id} = req.query;
    const {student_id, subject_id, prelim, midterm, final} = req.body;
    
    if (!student_id || !subject_id || !prelim || !midterm || !final) return validation('missingEntry', res);
    
    const studentExists = await Student.findById(student_id)
      .populate({path: 'sub_sched_lst', populate: {path: 'subject_id'}});
    
    if (!studentExists) return validation('studentNotExist');
    
    let subjectExists = false;
    for (const subject of studentExists.sub_sched_lst) {
      if (subject.subject_id._id == subject_id) {
        // if this grade already exists in the database, return error message
        const gradeExist = await Grade.findOne({student_id: student_id, subject_id: subject_id});
        if (gradeExist) return validation('gradeExist', res);
        subjectExists = true; 
        break;
      }
    }

    if (!subjectExists) return validation('subjectNotExist', res);

    const saveGrade = await new Grade({
      student_id, subject_id, prelim, midterm, final
    }).save();

    res.json(saveGrade);

  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;