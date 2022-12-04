const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controlers/jobs");


router.get('/',getAllJobs)
router.post('/', createJob)
router.get('/:id',getJob)
router.post('/:id',updateJob)
router.post('/:id',deleteJob)

module.exports = router;
