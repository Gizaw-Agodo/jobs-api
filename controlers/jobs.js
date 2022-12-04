const Job = require('../models/jobs')
// get all jobs 
const getAllJobs = async(req,res) => {
    try {
        const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
        res.status(200).json({jobs})
    } catch (error) {
        res.status(409).json({error:error.message})
    }
};


// create specific job
const createJob = async(req,res) => {
    try {
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(201).json({job})
        res.json(req.body)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
};

const getJob = () => {};

const updateJob = () => {};

const deleteJob = () => {};



module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
