const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  admin_id: {type: String, required: true, unique: true},
  admin_name: {type: String},
  password: {type: String, required: true}
});

module.exports = adminModel = mongoose.model('Admin', AdminSchema);