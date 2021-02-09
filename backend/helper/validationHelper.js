/**
 * Helper functions
 */

/**
 * This method will switch between which condition should be run
 * @param {string} type 
 *      = a string of the type of condition
 * @param {async variable} res
 */ 
module.exports = validationHelper = (type, res) => {
  switch (type) {
    case ("missingEntry"):
      return res.status(400).json({
        msg: "Please Enter all the required fields."
      });
    
    case ("existingAdmin"):
      return res.status(400).json({
        msg: "Admin id already exists. Please choose a different one."
      });
    
    case ("adminNotExist"):
      return res.status(400).json({
        msg: "Admin does not exist."
      });
    
    case ("incorrectAdminPass"):
      return res.status(400).json({
        msg: "Incorrect Password. Please try again."
      });
    
    case ("existingStudentID"):
      return res.status(400).json({
        msg: "A student with this ID already exists."
      });
    
    case ("studentNotExist"):
      return res.status(400).json({
        msg: "This Student Does Not Exist in The Database."
      });
    
    case ("subjectNotExist"):
      return res.status(400).json({
        msg: "This subject does not exist for this student."
      });
    
    case ("gradeExist"):
      return res.status(400).json({
        msg: "The grade for this subject and student already exists in the database."
      });

    default:
      return console.log(type + "Error Occured.");
  }
}