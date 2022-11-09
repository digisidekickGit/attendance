const attendanceSchema = require("../modal/attendanceList");
const employeeSchema = require("../modal/employee");
const { handleError } = require("../util/Errorhandler");

const getattendancelist = async (req, res, next) => {
  try {
    const attendance = await attendanceSchema.find();
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const postattendance = async (req, res, next) => {
  try {
    const existingattendance = await attendanceSchema.find({
      AttendanceYear: req.body.AttendanceYear,
      AttendanceMonth: req.body.AttendanceMonth,
      AttendanceDay: req.body.AttendanceDay,
    });
    if (existingattendance.length > 0) {
      return res
        .status(200)
        .json({ succes: true, message: "Attendance List Already Exist" });
    } else {
      const attendance = await attendanceSchema.create(req.body);
      res.status(200).json({
        succes: true,
        message: "Attendance list Created SuccessFully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getattendanceDetailsByYM = async (req, res, next) => {
  console.log(req.body);
  try {

    const getAllEmployee = await  employeeSchema.find({});

    const existingattendance = await attendanceSchema
      .find({
        AttendanceYear: req.body.AttendanceYear,
        AttendanceMonth: req.body.AttendanceMonth,
      })
      .populate("EmployeePresent HalfDayEmployeeList");
    
    if (existingattendance) {
      res.status(200).json({ succes: true, existingattendance ,getAllEmployee});
    }
  } catch (error) {
    next(error);
  }
};

const putattendance = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteattendance = async (req, res, next) => {
  try {
    const attendance = await attendanceSchema.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ succes: true, message: "Attendance Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const getattendanceDetails = async (req, res, next) => {
  try {
    const attendance = await attendanceSchema.findById(req.params.id);
    res.status(200).json({
      succes: true,
      message: "Attendance Details Fetched",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

const makeAttendance = async (req, res, next) => {
  try {

    const employee = await employeeSchema.findById(req.params.UserId);
        // console.log(employee.SalaryType,"SalaryType")
      if(employee.SalaryType === "Hourly"){
        return true;
      }
    await attendanceSchema.findByIdAndUpdate(req.params.attendanceId, {
      $pull: { HalfDayEmployeeList: req.params.UserId },
      $addToSet: { EmployeePresent: req.params.UserId },
    });
    res
      .status(200)
      .json({ succes: true, message: "Attendance Marked Successfully" });
  } catch (error) {
    next(error);
  }
};

const halfDayAttendance = async (req, res, next) => {
  try {
    await attendanceSchema.findByIdAndUpdate(req.params.attendanceId, {
      $pull: { EmployeePresent: req.params.UserId },
      $addToSet: { HalfDayEmployeeList: req.params.UserId },
    });
    res.status(200).json({
      succes: true,
      message: "Half Day Attendance Marked Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getattendanceDetailsByDate = async (req, res, next) => {
  try {
    const data = await attendanceSchema.findOne({
      AttendanceYear: req.body.AttendanceYear,
      AttendanceMonth: req.body.AttendanceMonth,
      AttendanceDay: req.body.AttendanceDay,
    });
    res.status(200).json({ succes: true, message: "data find susses", data });
  } catch (error) {
    next(error);
  }
};

const makeabsent = async (req, res, next) => {
  try {
    const attendence = await attendanceSchema.findById(req.params.attendanceId);
    const HalfDayEmployeeList = attendence.HalfDayEmployeeList.filter(
      (s) => s !== req.params.UserId
    );
    const EmployeePresent = attendence.EmployeePresent.filter(
      (s) => s !== req.params.UserId
    );

    const updates = {
      HalfDayEmployeeList,
      EmployeePresent,
    };

    await attendanceSchema.findByIdAndUpdate(req.params.attendanceId, {
      $set: updates,
    });
    res
      .status(200)
      .json({ succes: true, message: "Absent Marked Successfully" });
  } catch (error) {
    next(error);
  }
};

const markallpresent = async (req, res, next) => {
  try {
    await attendanceSchema.findByIdAndUpdate(req.params.attendanceId, {
      $addToSet: { EmployeePresent: req.body.User },
      $set: { HalfDayEmployeeList: [] },
    });
    res.status(200).json({ succes: true, message: "All Marked Present" });
  } catch (error) {
    next(error);
  }
};
const markallHalfDay = async (req, res, next) => {
  // console.log(req.body.User)
  try {
    await attendanceSchema.findByIdAndUpdate(req.params.attendanceId, {
      $addToSet: { HalfDayEmployeeList: req.body.User },
      $set: { EmployeePresent: [] },
    });
    res
      .status(200)
      .json({ succes: true, message: "All  Half Day Marked Present" });
  } catch (error) {
    next(error);
  }
};

const markallabsent = async (req, res, next) => {
  try {
    await attendanceSchema.findByIdAndUpdate(req.params.attendanceId, {
      $set: { HalfDayEmployeeList: [], EmployeePresent: [] },
    });
    res.status(200).json({ succes: true, message: "All Marked Absent" });
  } catch (error) {
    next(error);
  }
};

const setWorkingTiming = async (req, res, next) => {
  try {
    console.log(req.body.user);
    const attendancesheet = await attendanceSchema.findById(req.body.id);

    const checkeduser = attendancesheet.HourlyEmployeesTiming.filter(
      (e) => e.userid.toString() === req.body.user.userid
    ).length > 0

    console.log("hgf",checkeduser);


    if (!checkeduser) {
      await attendanceSchema.findByIdAndUpdate(req.body.id, {
        $push: { HourlyEmployeesTiming: req.body.user },
      });
     return res.status(200).json({ succes: true, message: "Attendance Marked Successfully" });
    }else{
      const user = attendancesheet.HourlyEmployeesTiming.map((s)=>s.userid === req.body.user.userid ? req.body.user :s )
      
      await attendanceSchema.findByIdAndUpdate(req.body.id, {
        $set: { HourlyEmployeesTiming: user },
      });
      return res.status(200).json({ succes: true, message: "Already Attendance Marked" });
    }


   
  } catch (error) {
    next(error);
  }
};

const checkemployeepresent = async (req, res, next) => {
  try {
    function leapYear(year) {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    let year = leapYear(req.body.AttendanceYear);

    let no_of_days;
    let month_number;
    switch (req.body.AttendanceMonth) {
      case "January":
        no_of_days = 31;
        month_number = 01;
        break;
      case "February":
        year ? (no_of_days = 29) : (no_of_days = 28);
        month_number = 02;
        break;
      case "March":
        no_of_days = 31;
        month_number = 03;
        break;
      case "April":
        no_of_days = 30;
        month_number = 04;
        break;
      case "May":
        no_of_days = 31;
        month_number = 05;
        break;
      case "June":
        no_of_days = 30;
        month_number = 06;
        break;
      case "July":
        no_of_days = 31;
        month_number = 07;
        break;
      case "August":
        no_of_days = 31;
        month_number = 08;
        break;
      case "September":
        no_of_days = 30;
        month_number = 09;
        break;
      case "October":
        no_of_days = 31;
        month_number = 10;
        break;
      case "November":
        no_of_days = 30;
        month_number = 11;
        break;
      case "December":
        no_of_days = 31;
        month_number = 12;
        break;
      default:
      // code block
    }

    //Check For Holiday
    const Employee = await employeeSchema.findById(req.params.UserId);

    console.log("hgfds", Employee.DOJ);

   

    if (Employee.DOJ.split("-")[0] <= req.body.AttendanceYear) {
      if (Employee.DOJ.split("-")[1] <= month_number) {
        if (Employee.DOJ.split("-")[2] == month_number) {
          const daysAfterJoining = await attendanceSchema.find({
            AttendanceYear: req.body.AttendanceYear,
            AttendanceMonth: req.body.AttendanceMonth,
            AttendanceDay: { $gte: Employee.DOJ.split("-")[2] },
          });
          const holiday = daysAfterJoining.filter(
            (s) =>
              s.EmployeePresent.length === 0 &&
              s.HalfDayEmployeeList.length === 0
          );
          const halfdaylist = daysAfterJoining.filter((s) =>
            s.HalfDayEmployeeList.includes(req.params.UserId)
          );
          const fulldaylist = daysAfterJoining.filter((s) =>
            s.EmployeePresent.includes(req.params.UserId)
          );

         
          const TotalWorkingDays = daysAfterJoining.length;
          const TotalHoliday = holiday.length;
          const TotalHalfDay = halfdaylist.length;
          const TotalFullDay = fulldaylist.length;
          const TotalAbsentDay =
            TotalWorkingDays - (TotalHoliday + TotalHalfDay + TotalFullDay);

          let TotalSalary;
          if (Employee.EmployeeCategory === "Employee") {
       
            const halfdaysalary =
              (Employee.Amount / no_of_days) * 0.5 * TotalHalfDay;
            const fulldaysalary =
              (Employee.Amount / no_of_days) * (TotalFullDay + TotalHoliday);
            TotalSalary = halfdaysalary + fulldaysalary;
          } else {
            const halfdaysalary = Employee.Amount * 0.5 * TotalHalfDay;
            const fulldaysalary =
              Employee.Amount * (TotalFullDay + TotalHoliday);
            TotalSalary = halfdaysalary + fulldaysalary;
          }

          res.status(200).json({
            success: true,
            data: {
              TotalWorkingDay: TotalWorkingDays,
              TotalFullDay: TotalFullDay,
              TotalHalfDay: TotalHalfDay,
              TotalAbsentDay: TotalAbsentDay,
              TotalSalary: TotalSalary,
              TotalHoliday: TotalHoliday,
            },
          });
        } else {
          const checkforholiday = await attendanceSchema
            .find({
              AttendanceYear: req.body.AttendanceYear,
              AttendanceMonth: req.body.AttendanceMonth,
              HalfDayEmployeeList: { $exists: true, $eq: [] },
              EmployeePresent: { $exists: true, $eq: [] },
            })
            .count();
          const TotalWorkingDay = await attendanceSchema
            .find({
              AttendanceYear: req.body.AttendanceYear,
              AttendanceMonth: req.body.AttendanceMonth,
            })
            .count();
          const employeelistHalfday = await attendanceSchema
            .find({
              AttendanceYear: req.body.AttendanceYear,
              AttendanceMonth: req.body.AttendanceMonth,
              HalfDayEmployeeList: { $in: [req.params.UserId] },
            })
            .count();
          const employeelistFullday = await attendanceSchema
            .find({
              AttendanceYear: req.body.AttendanceYear,
              AttendanceMonth: req.body.AttendanceMonth,
              EmployeePresent: { $in: [req.params.UserId] },
            })
            .count();

          const TotalAbsentDay =
            TotalWorkingDay -
            (employeelistFullday + employeelistHalfday + checkforholiday);

          let TotalSalary;
          if (Employee.EmployeeCategory === "Employee") {
            // console.log(Employee.Salary)
            const halfdaysalary =
              (Employee.Amount / no_of_days) * 0.5 * employeelistHalfday;
            const fulldaysalary =
              (Employee.Amount / no_of_days) *
              (employeelistFullday + checkforholiday);
            TotalSalary = halfdaysalary + fulldaysalary;
          } else {
            const halfdaysalary = Employee.Amount * 0.5 * employeelistHalfday;
            const fulldaysalary =
              Employee.Amount * (employeelistFullday + checkforholiday);
            TotalSalary = halfdaysalary + fulldaysalary;
          }
          res.status(200).json({
            success: true,
            data: {
              TotalWorkingDay: TotalWorkingDay,
              TotalFullDay: employeelistFullday,
              TotalHalfDay: employeelistHalfday,
              TotalAbsentDay: TotalAbsentDay,
              TotalSalary: TotalSalary,
              TotalHoliday: checkforholiday,
            },
          });
        }
      } else {
        next(handleError(500, "Not Part Of Organisation on that month"));
       
      }
    } else {
      next(handleError(500, "Not Part Of rganisation"));
    }

  
  } catch (error) {
    next(error);
  }
};

const autodateCration = async (req, res, next) => {
  try {
    var month = new Date().toLocaleString(
      "en-US",
      { month: "long" },
      { timeZone: "Asia/Kolkata" }
    );
    var indiaTimeone = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const date = indiaTimeone.split("/");

    const newAttendance = new attendanceSchema({
      AttendanceYear: date[2].substring(0, 4),
      AttendanceMonth: month,
      AttendanceDay: date[1],
    });

    const saved = await newAttendance.save();
    // const attendance = await attendanceSchema.create(req.body)
    // res.status(200).json({ succes: true, message: "Attendance list Created SuccessFully" })
  } catch (error) {
    handleError(500, error.message);
  }
};

module.exports = {
  getattendanceDetailsByYM,
  getattendancelist,
  postattendance,
  putattendance,
  deleteattendance,
  getattendanceDetails,
  makeAttendance,
  halfDayAttendance,
  checkemployeepresent,
  makeabsent,
  markallpresent,
  markallabsent,
  autodateCration,
  getattendanceDetailsByDate,
  markallHalfDay,
  setWorkingTiming,
};
