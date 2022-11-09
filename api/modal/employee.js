const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    EmployeeActivity: {
        type: String,
        enum: ["Activate", "Deactivate"],
        default:"Activate",
        // required: true
    },
    EmployeeName: {
        type: String,
        required: [true, "Employee Name Not Provided"]
    },
    EmployeeFatherName: {
        type: String,
        required: [true, "Employee Father Name Not Provided"]
    },
    EmployeeMotherName: {
        type: String,
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Transgender"],
        required: [true, "Gender is Required"]
    },
    DOB: {
        type: String,
        required: [true, "Date of Birth is not Provided"]
    },
    MaritalStatus: {
        type: String,
        enum: ["Single", "Married"]
    },
    SpouseName: {
        type: String
    },
    EmployeeCategory: {
        type: String,
        enum:{
            values:["Labour", "Employee"],
            message:"Labour Employee Only Allowded"
        },
        required: [true, "Employee Category is Not Provided"]
    },
    ModeOfPayment: {
        type: String,
        enum: ["Cash", "Bank"],
        required:[true,"Mode Of Payment is required"]
    },
    BankAccount: {
        AccountNumber: {
            type: String,
        },
        IfscCode: {
            type: String,
        },
        BankName:{
            type:String
        }
    },
    Address: {
        type: String,
        required: [true, "Address is Required"]
    },
    Email: {
        type: String,
        required: [true, "Email is Required"]
    },
    MobileNumber: {
        type: Number,
        required: [true, "MobileNumber is Required"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    SalaryType: {
        type: String,
        required: [true, "Salary Type Required"],
        enum: {
            values: ["Monthly", "Daily", "Hourly"],
            message: 'SalaryType is either: Monthly, Daily, or Hourly',
        },
    },
    Amount: {
        type: Number,
        required: [true, "Amount is Required Required"],
    },
    Designation: {
        type: String,
        // validate: {
        //     validator: function (v) {
        //         if (this.EmployeeCategory === undefined) {
        //             return true;
        //         }
        //         return false;
        //     },
        //     message: 'Designation is Required'
        // },
    },
    Department:{
        type:String,

    },
    AadharID:{
        type:Number,
        // validate: {
        //     validator: function (v) {
        //         if(this.AadharID !== null){
        //             return /^[0-9]{10}/.test(v);
        //         }
        //         return;
               
        //     },
        //     message: '{VALUE} is not a valid 10 digit number!',
           
        // }
    },
    DOJ: {
        type: String,
        required: true
    },
    PAN: {
        type: String,
        // validate: {
        //     validator: function(val) {
        //         return val.toString().length === 10
        //     },
        //     message: val => `${val.value} has to be 10 letter`
        // }
    },
   
    EPFONumber:{
        type:String
    },
    ESICNumber:{
        type:String,
    },
    UANNumber:{
        type:String,
    },
    Image: {
        type: String,
    },
    FamilyDetails:{
        type: Array, default: [],
    },
    NewDoJ:{
        type: String,
    }

        // {
        //     Name:{
        //         type:String,
        //     },
        //     Gender:{
        //         type:String,
        //         enum:{
        //             values:["Male","Female"],
        //             message: 'Gender is either: Male, Female, or TransGender',
        //         }
        //     },
        //     Relationship:{
        //         type:String,
        //     },
        //     DOB:{
        //         type:String
        //     }
        // }
    

  
}, { timestamps: true })

module.exports = mongoose.model("Employee", employeeSchema)