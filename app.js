const express = require('express')
const connectToDb = require('./db/connect')
const app = express()
require('dotenv').config()
app.use(express.json())

const authenticateUser = require('./middleware/authentication')
// router 
const authRouther = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


//routes
app.use('/api/v1/auth',authRouther)
app.use ('/api/v1/jobs',authenticateUser, jobsRouter)


// connect to db
port = process.env.port || 3000
const start = async()=>{
  try {
    await connectToDb(process.env.jobConnection)
    app.listen(port , console.log(`app starts listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
 
}

start()