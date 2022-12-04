const mongoose = require('mongoose')

const userSchma  = new mongoose.Schema({
  
  name : {
    type:String ,
    required :[true,'name is required'],
    minlength : 3,
    maxlength: 50
},

  email : {
    type: String,
    required : [true,'plese provide email'],
    unique :true
  },

  password :  {
    type:String ,
    required :[true,'password is required'],
    minlength : 6,
},

})

const User = mongoose.model('User',userSchma)
module.exports = User