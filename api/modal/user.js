const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

module.exports= mongoose.model("User",userSchema)