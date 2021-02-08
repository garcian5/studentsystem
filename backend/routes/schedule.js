const router = require('express').Router();
const validation = require('../helper/validationHelper');

const Schedule = require('../models/scheduleModel');

router.post('/addschedule', async (req, res) => {
  try {
    const {sub_sched_lst} = req.body;
    if (!sub_sched_lst) return validation('missingEntry', res);
    const saveSchedLst = await new Schedule({sub_sched_lst}).save();
    res.json(saveSchedLst);
  } catch (err) { res.status(500).json({error: err.message}); }
})

module.exports = router;