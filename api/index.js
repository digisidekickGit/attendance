const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors")
const {autodateCration} = require("./controller/attendanceController")
var cron = require('node-cron');

//Route
const employeeRoute = require("./route/employeeRoute")
const attendanceRoute = require("./route/attendanceRoute")
const userRoute = require("./route/userRoute")


//Middleware
dotenv.config();


//Static file Serve
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(express.static(path.join(__dirname, "./build")));





app.use(express.json());
app.use(cors({origin:true,credentials:true}))




// Entry Point Start
app.use("/api/employee",employeeRoute)
app.use("/api/attendance",attendanceRoute)
app.use("/api/user",userRoute)


// error handler
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something Went Wrong";
    return res.status(status).json({success:false,status,message});
})






cron.schedule('0 0 * * *', () => {autodateCration()},{
    scheduled: true,
    timezone: "Asia/Kolkata"
});



app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname ,"../","client",'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




//Mongo Db Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to Mongodb")).catch(err=>console.log(err));

// cron.schedule('* * * * *', () => {autodateCration()},{
//     scheduled: true,
//     timezone: "Asia/Kolkata"
// });


app.listen(7000,(req,res)=>{
    console.log(`Backend is listening at http://localhost:7000`)
})