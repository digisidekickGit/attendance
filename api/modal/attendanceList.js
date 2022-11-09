const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    AttendanceYear:{
        type:String,
        enum:["2021","2022","2023","2024","2025","2026"],
        required:true
    },
    AttendanceMonth:{
        type:String,
        enum:["January","February","March","April","May","June","July","August","September","October","November","December"],
        required:true
    },
    AttendanceDay:{
        type:Number,
        enum:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        required:true
    },
    EmployeePresent:{
        type:[String],
        default:[]
    },
    HalfDayEmployeeList:{
        type:[String],
        default:[]
    },
    HourlyEmployeesTiming:{
        type:[Object],
        default:[],
    },
    // AbsentEmployeeList:{
    //     type:[String],
    //     default:[]
    // }
},{timestamps:true})

module.exports = mongoose.model("Attendance",attendanceSchema)