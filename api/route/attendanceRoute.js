const router = require("express").Router();
const {getattendancelist,postattendance,putattendance,deleteattendance,getattendanceDetails,makeAttendance,halfDayAttendance,checkemployeepresent,makeabsent,markallpresent,markallabsent, getattendanceDetailsByYM, getattendanceDetailsByDate, markallHalfDay, setWorkingTiming} = require("../controller/attendanceController")

router.get("/",getattendancelist)
router.post("/",postattendance)
router.put("/makeattendance/:attendanceId/:UserId",makeAttendance)
router.put("/halfdayattendance/:attendanceId/:UserId",halfDayAttendance)
router.put("/absentattendance/:attendanceId/:UserId",makeabsent)
router.put("/markallpresent/:attendanceId",markallpresent)
router.put("/markallabsent/:attendanceId",markallabsent)
router.put("/markallhalfday/:attendanceId",markallHalfDay)
router.delete("/:id", deleteattendance);
router.post("/checkattendance/:UserId", checkemployeepresent);
router.post("/checkattendance", getattendanceDetailsByYM);
router.post("/getattendancebydate", getattendanceDetailsByDate);
router.put("/setHourlyEmployeesTiming", setWorkingTiming);

router.get("/:id", getattendanceDetails);



module.exports = router

// 
// /api/attendance/makeattendance/