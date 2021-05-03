const mongoose = require("mongoose")
const crypti = require('crypto')
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name :  {
        type : String,
        trim : true, // for the space before and after 
        required : true,
        maxlength : 32
    },
    email :  {
        type : String,
        trim : true, // for the space before and after 
        required : true,
        unique : true  // it should be unique
    },
    
    hashed_password :  {
        type : String,
        required : true,
    },
    
    about_user :  {
        type : String,
        trim : true, // for the space before and after 
        required : true,
        unique : true  // it should be unique
    },
    salt:String,
    
    role :  {
        type : Number,
        default : 0
    },
    
    history :  {
        type : Array,
        default : []
    }
})