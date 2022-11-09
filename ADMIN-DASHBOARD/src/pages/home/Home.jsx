import React, { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import CardData from "../../components/Card/CardData";
import Chart from "../../components/chart/Chart";

import Navbar from "../../components/navbar/Navbar";
import GenderBar from "../../components/ProcessBar/GenderBar";
import ProcessBar from "../../components/ProcessBar/ProcessBar";
import SideBar from "../../components/sideBar/SideBar";
import TableTransition from "../../components/TableTransition/TableTransition";
import { axiosInstance } from "../../config";
import { allemo, oneMAttendance } from "../../utils/api";
import "./home.scss";
const Home = () => {
  //  Mittal Spinners
  const [male, setmale] = useState();
  const [Female, setFemale] = useState();
  const [Transgender, setTransgender] = useState();
  const [TotalEmp, setTotalEmp] = useState();
  const [AttendanceStats, setAttendanceStats] = useState();
  const [HourlyEmp, setHourlyEmp] = useState();

  const getemployeedetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/employee`);

      const male = data.data.filter((e) => e.Gender === "Male");
      const Female = data.data.filter((e) => e.Gender === "Female");
      const Transgender = data.data.filter((e) => e.Gender === "Transgender");
      const totoalnoOfHourlyEmp = data.data.filter(
        (e) => e.SalaryType === "Hourly"
      );
      setTotalEmp(data.data.length);
      setmale(male.length);
      setFemale(Female.length);
      setTransgender(Transgender.length);
      setHourlyEmp(totoalnoOfHourlyEmp.length);
      console.log(data, "home data is that");
    } catch (error) {}
  };

  const getAttendanceSheetData = async () => {
    const date = new Date();

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

    const { data } = await axiosInstance.post(
      "/api/attendance/getattendancebydate",
      {
        AttendanceYear: String(date?.getFullYear()),
        AttendanceMonth: String(monthNames[date?.getMonth()]),
        AttendanceDay: String(date?.getDate()),
      }
    );
    console.log(data, "hoem");
    setAttendanceStats(data.data);
  };
  // console.log(,"absent")
  // console.log(TotalEmp ,"TotalEmp")
  console.log(
    {
      TotalEmp,
      HourlyEmp,
      EmployeePresent: AttendanceStats?.EmployeePresent?.length,
      HalfDayEmployeeList: AttendanceStats?.HalfDayEmployeeList?.length,
    },
    "TotalEmp"
  );
  // console.log(HourlyEmp ,"HourlyEmp")
  // console.log(AttendanceStats?.EmployeePresent?.length ,"EmployeePresent")
  // console.log(AttendanceStats?.HalfDayEmployeeList?.length ,"HalfDayEmployeeList")



   

















  useEffect(() => {
    getemployeedetails();
    getAttendanceSheetData();
    // getMonthAttenddance();
  }, []);
  return (
    <div id="home">
      <SideBar />
      <div className="homeContainer">
        <Navbar />
        <hr />
        <div className="cardsData"></div>
        <div className="charts-bar">
          <Chart />

          <GenderBar
            male={male}
            Female={Female}
            Transgender={Transgender}
            TotalEmp={TotalEmp}
          />
        </div>
        {/* <div className='home-table'>
          <p>Latest transactions</p>
          <TableTransition />
        </div> */}

        <div className="row m-4">
          <div
            className="col-md-5"
            style={{
              // display: "flex",
              boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
              borderRadius: "5px",
            }}
          >
            <p
              className="text-center mt-3"
              style={{
                fontWeight: "700",
                fontSize: " 1.2rem",
                color: "gray",
                fontFamily: "Courier New",
              }}
            >
              Today Present Absent Attendance Stats
            </p>
            <hr />
            <PieChart width={400} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={[
                  {
                    name: "Present ",
                    value: AttendanceStats?.EmployeePresent?.length,
                  },
                  {
                    name: "Absent",
                    value:
                      TotalEmp -
                      HourlyEmp -
                      AttendanceStats?.EmployeePresent?.length -
                      AttendanceStats?.HalfDayEmployeeList?.length,
                  },
                  {
                    name: "HalfDay ",
                    value: AttendanceStats?.HalfDayEmployeeList?.length,
                  },
                  {
                    name: "Hourly Employee Present",
                    value: AttendanceStats?.HourlyEmployeesTiming.length,
                  },
                ]}
                outerRadius={80}
                fill="rgb(255, 127, 80)"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
