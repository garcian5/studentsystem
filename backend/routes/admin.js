const router = require('express').Router();
const validation = require('../helper/validationHelper');

const Admin = require('../models/adminModel');

/**
 * @route   POST student/addstudent
 * @desc    create a student
 * @access  Public
 * */
router.post('/addadmin', async (req, res) => {
  try {
    const {admin_id,
      admin_name,
      password
    } = req.body;

    // if no entered lastname and first name don't process and return error message
    if (!admin_id || !password) return validation('missingEntry', res);

    // find if the admin_id entered already exists in the database
    const existingAdmin = await Admin.findOne({admin_id: admin_id});
    if (existingAdmin) return validation('existingAdmin', res);

    const newAdmin = new Admin({
      admin_id,
      admin_name,
      password
    });

    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (err) { res.status(500).json({error: err.message}); }
});

/**
 * @route   POST admin/getadmin/?admin_id=id&password=pass
 * @desc    authenticates admin login attempt (will fail/return error if wrong info)
 * @component Home.js
 * */
router.get('/getadmin', async (req, res) => {
  try {
    const {admin_id, password} = req.query;
    const adminExists = await Admin.findOne({admin_id: admin_id});
    if (!adminExists) return validation('adminNotExist', res);
    if (password !== adminExists.password) return validation('incorrectAdminPass', res);

    const loginInfo = {
      _id: adminExists._id,
      admin_id: adminExists.admin_id,
      admin_name: adminExists.admin_name
    }
    res.json({msg: 'Login success!', admin: loginInfo});
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;