const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();



// routes
router.route("/register").post(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res


      .status(400)
      .json({ err: "no name or email or password provided" });
    }

    const tempUser = { name, email, password: bcrypt.hashSync(password, 6) };
    const user = await User.create({ ...tempUser });
    const saltString = process.env.salt_string;

    const token = jwt.sign(
      { id: user._id, user: user.name },
      saltString,
      { expiresIn: "30d" }
    );
   
    

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(401).json(error);
  }
});


// login route 
router.route("/login").post(async(req, res) => {
  const {email, password}  = req.body
  try {
    
    if (!email || !password){
      res.status(401).json({err: "no email or password provided"})
    }

    const user = await User.findOne({email})
    if (!user){
     return res.status(401).json({err: "no user found "})
    }
    
    token  = jwt.sign({name : user.name , id : user._id },process.env.salt_string)
    res.status(200).json({token:token,user:user})

  } catch (error) {
    res.status(500).json({error})
  }
});
  
module.exports = router;


