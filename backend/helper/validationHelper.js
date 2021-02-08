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

    default:
      return console.log(type + "Error Occured.");
  }
}