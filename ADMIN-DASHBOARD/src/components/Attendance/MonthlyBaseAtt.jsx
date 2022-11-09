import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../config";
import Navbar from "../navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Loader from "react-js-loader";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import CancelIcon from '@mui/icons-material/Cancel';

import FlakyIcon from '@mui/icons-material/Flaky';
const MonthlyBaseAtt = () => {
  const [AllEmployee, setgetAllEmployee] = useState();
  const [oneMAttendance, setexistingattendance] = useState();

  // const [selectedquery, setselectedquery] = useState();
  const [selectMonth, setselectMonth] = useState("");
  const [selectYear, setselectYear] = useState("");
  // const [isEmployee, setisEmployee] = useState(false);
  const [loading, setloading] = useState(false);
  const getMonthAttenddance = async () => {
    try {
      setloading(true);
      const date = new Date()
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
      const {
        data: { existingattendance, getAllEmployee },
      } = await axiosInstance.post(
        "/api/attendance/checkattendance",
        {
          AttendanceYear: selectYear || String(date.getFullYear()),
          AttendanceMonth: selectMonth || String(monthNames[date.getMonth()]),
        }
      );
      setselectMonth(selectMonth || String(date.getFullYear()));
      setselectYear(selectYear || String(monthNames[date.getMonth()]));
      setexistingattendance(existingattendance);
      // console.log(existingattendance, "existingattendance");
      setgetAllEmployee(
        getAllEmployee.filter((e) => e.EmployeeCategory !== "Labour")
      );

      // console.log("bdu", existingattendance, getAllEmployee);
      setloading(false);
    } catch (error) {
      setloading(false);
      alert(error.data.data);
    }
  };
  useEffect(() => {
    getMonthAttenddance();
  }, []);

  return (
    <>
      <div>
        <div id="Adduser">
          <SideBar />
          <div className="AdduserContainer">
            <Navbar />
            <hr />
            <h1
              style={{
                backgroundColor: "#FF7F50",
                borderRadius: "7px",
                color: "white",
                fontFamily: "initial",
                width: "100%",
                textAlign: "center",
              }}
            >
              {" "}
              Please Generate Report
            </h1>

            <div
              style={{
                margin: "1rem",
              }}
              className="row"
            >
              <div className="col-md-4">
                <div class="form-group">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setselectYear(e.target.value)}
                  >
                    <option selected>Select Year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2024">2025</option>
                    <option value="2024">2026</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div class="form-group">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setselectMonth(e.target.value)}
                  >
                    <option selected>Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <button
                  className="btn "
                  style={{
                    backgroundColor: "#FF7F50",
                    borderRadius: "7px",
                    color: "white",
                  }}
                  onClick={getMonthAttenddance}
                >
                  Submit
                </button>
              </div>
            </div>

            {loading ? (
              <Loader
                type="spinner-cub"
                bgColor={"#FF7F50"}
                title={"spinner-cub"}
                color={"#FFFFFF"}
                size={100}
              />
            ) : (<>
            {(<>
             { oneMAttendance &&  <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn bg-warning m-2"
                        table="table-to-xls"
                        filename={`${selectMonth }/${selectYear}`}
                        sheet="tablexls"
                        buttonText="Download as XLS"
                      />}
               </>)


}
            {  oneMAttendance && <table  className="table table-sm table-striped table-bordered table-responsive " id="table-to-xls">
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Employee Name</th>
                  {oneMAttendance && oneMAttendance?.map((date) => (
                    <th scope="col">{date?.AttendanceDay}</th>
                  ))}
                  {/* <th scope="col">Last</th>
                  <th scope="col">Handle</th> */}
                </tr>
              </thead>
              <tbody>
                {AllEmployee?.map((employee) => (
                  <tr>
                    <th scope="row">
                      {employee.EmployeeName}{" "}
                    </th>
                    {/* oneMAttendance?.map((e) => ()) */}
                    {oneMAttendance?.map((e) => {
                      // console.log(e.AttendanceDay
                      //     ,"running ")
                      // console.log(oneMAttendance,"oneMAttendance")
                      console.log(
                        e.EmployeePresent?.find((e) => e === employee._id) ===
                          employee._id,
                        "EmployeePresent "
                      );
                      // console.log(e.HalfDayEmployeeList?.includes(employee._id), employee.EmployeeName, e.AttendanceDay ,"HalfDayEmployeeList ");
                      // console.count()
                      return (
                        <>
                          {e.EmployeePresent?.includes(employee._id) && (
                            <th scope="row"> present <CheckCircleIcon style={{
                              color: "green"
                            }}
                              /></th>
                          )}
                          {/* {e.AttendanceDay} */}
                          {e.HalfDayEmployeeList?.includes(employee._id) && (
                            <th scope="row"> Half day<FlakyIcon
                            style={{
                              color: "blue"
                            }}
                            /></th>
                          )}
                          {!e.EmployeePresent?.includes(employee._id) &&
                            !e.HalfDayEmployeeList?.includes(employee._id) && (
                              <th scope="row"> Absent <CancelIcon
                              style={{
                                color: "red"
                              }}
                              /></th>
                            )}
                        </>
                      );
                    })}
                  </tr>
                ))}
{
//   <DataGrid
//   rows={rows}
//   columns={columns}
//   pageSize={5}
//   rowsPerPageOptions={[5]}
//   checkboxSelection
// />
}
                {/* <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr> */}
              </tbody>
            </table>}
            
            </>)}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyBaseAtt;
