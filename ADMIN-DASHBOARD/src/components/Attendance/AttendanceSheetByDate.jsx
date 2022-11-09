import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { useNavigate } from "react-router-dom";
import "./attendancesheet.scss";
import { axiosInstance } from "../../config";
import { CircularProgressbar } from "react-circular-progressbar";
const AttendanceSheetByDate = () => {
  const [value, onChange] = useState("");

  // console.log("jhdg", value);


  

  // console.log(monthNames[value?.getMonth()]);

  const navigate = useNavigate();

  const getAttendanceSheetData = async (value) => {


    console.log("dggd",value);


    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];








    // console.log(value, "uhuidhiherifuerbfr");
    // console.log("vvvvvv",newdate.getFullYear(), newdate.getMonth()+1, newdate.getDate());
    console.log("running");
    const { data } = await axiosInstance.post(
      "/api/attendance/getattendancebydate",
      {
        AttendanceYear: String(value.getFullYear()),
        AttendanceMonth: String(monthNames[value?.getMonth()]),
        AttendanceDay: String(value.getDate()),
      }
    );
  console.log(data);
    if (data) {
      data.data === null ? alert("no attendance exist") : navigate(`/admin/markattendance/${data.data._id}`);
      
    }
   
  };

  const handleDate = (e) => {
    alert("hdhd")
    
    onChange(e);
    getAttendanceSheetData()
    
    
    
  };
  // useEffect(()=>{
  //   getAttendanceSheetData()
  // },[value])
 
  return (
    <div>
      <div id="Adduser">
        <SideBar />
        <div className="AdduserContainer">
          <Navbar />
          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "90%",
              flexDirection: "column",
            }}
          >
            <h2>Select date</h2>

            <Calendar
              className="calender"
              onChange={(e)=>{getAttendanceSheetData(e)}}
              value={value}
              maxDate={new Date()}
              calendarType="ISO 8601"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheetByDate;
