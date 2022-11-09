import React, { useEffect, useState } from "react";

import Loader from "react-js-loader";
// import { axiosInstance } from '../../../config';
// import Sidebar from '../Sidebar/Sidebar';
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
// import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { axiosInstance } from "../../config";
import SideBar from "../sideBar/SideBar";
import Navbar from "../navbar/Navbar";
// import { CircularProgressbar } from "react-circular-progressbar";
import SingleDay from "./SingleDay";

import SearchIcon from "@mui/icons-material/Search";
import TimeRange from "react-time-range";
import { Button } from "@mui/material";
const UserAttendanceSheet = () => {
  const { id } = useParams();
  const [slectedSalaryType, setSlectedSalaryType] = useState("Monthly");

  const [employee, setemployee] = useState([]);
  const [attendancesheet, setattendancesheet] = useState({});
  const [halfdayemployee, sethalfdayemployee] = useState([]);
  const [HourlyEmployeesTiming, setHourlyEmployeesTiming] = useState([]);
  const [fulldayemployee, setfulldayemployee] = useState([]);
  const [dailyemployee, setdailyemployee] = useState([]);
  const [inputtagvalue, setinputtagvalue] = useState("");

  // const [absentemployee, setabsentemployee] = useState([])
  const [date, setdate] = useState("");
  const [employeeName, setemployeeName] = useState("");
  const [timeemployee, settimeemployee] = useState([]);

  const [tiggerstate, settiggerstate] = useState(true);
  const [valuechecked, setvaluechecked] = useState("");
  const [startTime, setstartTime] = useState();
  const [endTime, setendTime] = useState();
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = React.useState(false);
  const [modal, setmodal] = useState(false);

  const [employeedata, setemployeedata] = useState();

  useEffect(() => {
    getemployee();
  }, []);

  useEffect(() => {
    getattendanceSheet();
  }, [tiggerstate]);

  const getemployee = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/employee/activity");
      setLoading(false);
      console.log("employee", data);
      setemployee(data.data);
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  };

  const getattendanceSheet = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/attendance/${id}`);

      console.log("jhjjhggfd", data.data.HourlyEmployeesTiming);
      setattendancesheet(data.data);
      sethalfdayemployee(data.data.HalfDayEmployeeList);
      setfulldayemployee(data.data.EmployeePresent);
      setdailyemployee(data.data.HourlyEmployeesTiming);
      setHourlyEmployeesTiming(data.data.HourlyEmployeesTiming);

      settimeemployee(data.data.HourlyEmployeesTiming);

      // setabsentemployee(data.data.AbsentEmployeeList)
      setdate(
        `${data.data.AttendanceDay}-${data.data.AttendanceMonth}-${data.data.AttendanceYear}`
);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };



  const markFullDayAttendance = async (userid) => {
    setvaluechecked("FullDay");
    try {
      const { data } = await axiosInstance.put(
        `/api/attendance/makeattendance/${id}/${userid}`
      );
      console.log("data", data);
      alert(data.message);
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const markHalfDayAttendance = async (userid) => {
    setvaluechecked("HalfDay");
    try {
      const { data } = await axiosInstance.put(
        `/api/attendance/halfdayattendance/${id}/${userid}`
      );
      console.log("data", data);
      alert(data.message);
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const markabsentAttendance = async (userid) => {
    setvaluechecked("Absent");
    try {
      const { data } = await axiosInstance.put(
        `/api/attendance/absentattendance/${id}/${userid}`
      );
      console.log("data", data);
      alert(data.message);
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const checkfordailyattendance = (id) => {
    const newdata = dailyemployee?.find((s) => s.userid.toString() === id);
    // console.log("ghg",newdata);

    return newdata?.userid;
  };

  const checkforhalfattendance = (id) => {
    const newdata = halfdayemployee?.find((s) => s === id);
    console.log("g", newdata);
    return newdata;
  };

  const checkforfullattendance = (id) => {
    const newdata = fulldayemployee?.find((s) => s === id);
    return newdata;
  };

  const checkforHoverlyattendance = (id) => {
    // console.log(id,HourlyEmployeesTiming,"iejioejiojeioe");

    const newdata = HourlyEmployeesTiming?.find((s) => s.userid === id);
    return newdata;
  };

  const checkforabsentattendance = (id) => {
    if (halfdayemployee.includes(id)) {
      return false;
    }
    if (fulldayemployee.includes(id)) {
      return false;
    }
    return true;

    // const newdata = absentemployee?.find((s) => s === id)
    // return newdata
  };

  const presentAllEmployee = async () => {
    const user = [];
    let newvar = "FullDay";

    setinputtagvalue(newvar);
    employee
      .filter((e) => e.SalaryType !== "Hourly")
      .map((s) => {
        return user.push(s._id);
      });
    try {
      const { data } = await axiosInstance.put(
        `/api/attendance/markallpresent/${id}`,
        {
          User: user,
        }
      );
      console.log("data", data);
      alert(data.message);
     
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const halfdayAllEmployee = async () => {
    const user = [];
    let newvar = "HalfDay";

    setinputtagvalue(newvar);
    employee.map((s) => {
      user.push(s._id);
    });
    try {
      const { data } = await axiosInstance.put(
        `/api/attendance/markallhalfday/${id}`,
        {
          User: user,
        }
      );
      console.log("data", data);
      alert(data.message);
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const absentAllEmployee = async () => {
    let newvar = "Absent";

    setinputtagvalue(newvar);
    try {
      const { data } = await axiosInstance.put(
        `/api/attendance/markallabsent/${id}`
      );
      console.log("data", data);
      alert(data.message);
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  
  const filteredemployee = employee?.filter(
    (e) =>
      e?.EmployeeName?.toLowerCase().includes(employeeName.toLowerCase()) ||
      e?.PAN?.toLowerCase().includes(employeeName.toLowerCase()) ||
      e?.MobileNumber?.toString().includes(employeeName.toString())
  );
  // console.log(filteredemployee, "uehdiweh debiidw dboiewnidne");
  const returnFunction = (e) => {
    console.log(e, " function running");

    let starttime = e.startTime;
    let endtime = e.endTime;

    setstartTime(starttime);
    setendTime(endtime);
  };
  const submitTime = async (userid) => {
    // console.log(startTime,endTime);
    console.log(userid, "hdoieoidhoeiwhoiewf ioefwoefoibewf");
    try {
      if (!startTime) {
        return alert("Please select a start time");
      }
      if (!endTime) {
        return alert("Please select a End time");
      }
      const { data } = await axiosInstance.put(
        `/api/attendance/setHourlyEmployeesTiming`,
        {
          id: id,
          user: {
            userid: userid._id,
            startTime,
            endTime,
          },
        }
      );
      alert(data.message);
      markFullDayAttendance(userid._id); //userid
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const setemployeevalue = (employeedata) => {
    setmodal(true);
    setemployeedata(employeedata);
  };
  return (
    <div className="UserList">
     
      <SideBar />

      <div className="UserList-table">
        <Navbar />
        <hr />

        <>
          <div className="p-1 my-container active-cont overflow-hidden">
            
            <p className="text-dark ">ATTENDANCE SHEET OF({date})</p>
            <div className="row p-3">
              <div className="col-md-3 text-center">
              {slectedSalaryType !== "Hourly" ?<><span style={{ fontSize: 16, fontWeight: "700" }}>
                   All  Absent{" "}
                </span>{" "}
                {/* &nbsp;&nbsp;&nbsp; */}
                <input
                  class="form-check-input "
                  type="radio"
                  value={valuechecked}
                  checked={inputtagvalue === "Absent"}
                  id="flexCheckIndeterminate"
                  onClick={absentAllEmployee}
                /></>:<></> }
                
              </div>
              <div className="col-md-3 text-center">
              {slectedSalaryType !== "Hourly" ?<><span style={{ fontSize: 16, fontWeight: "700" }}>
                   All Half Day
                </span>{" "}
                {/* &nbsp;&nbsp;&nbsp; */}
                <input
                  class="form-check-input  "
                  type="radio"
                  value={valuechecked}
                  checked={inputtagvalue === "HalfDay"}
                  id="flexCheckIndeterminate"
                  onClick={halfdayAllEmployee}
                /></>:<></> }
                
              </div>
              <div className="col-md-3 text-center">
              {slectedSalaryType !== "Hourly" ? (
                <>
                  
                    <span style={{ fontSize: 16, fontWeight: "700" }}>
                       All Present
                    </span>{" "}
                    {/* &nbsp;&nbsp;&nbsp; */}
                    <input
                      class="form-check-input  "
                      type="radio"
                      value={valuechecked}
                      checked={inputtagvalue === "FullDay"}
                      id="flexCheckIndeterminate"
                      onClick={presentAllEmployee}
                    />
                  
                </>
              ) : (
                <></>
              )}
              </div> 

              
              
              <div
              
                style={{
                
                    display:"flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width:"22%",


                  border: "0.50px solid lightgray",
                  padding: "3px",
                }}
              >
                <input
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    paddingLeft: "4px",
                    
                  }}
                  className="inputPlaceholder"
                  type="text"
                  placeholder=" Search By Pan, Phone, Name..."
                  onChange={(e) => setemployeeName(e.target.value)}
                />
                <SearchIcon />
              </div>
            </div>
            <h3
              className="text-center "
              style={{
                backgroundColor: "#FF7F50",
                borderRadius: "7px",
                color: "white",
                fontFamily: "initial",
              }}
            >
              {slectedSalaryType} Based Employee
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "1rem",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setSlectedSalaryType("Hourly")}
              >
                Hourly
              </Button>
              <Button
                variant="contained"
                onClick={() => setSlectedSalaryType("Monthly")}
              >
                Monthly
              </Button>
              <Button
                variant="contained"
                onClick={() => setSlectedSalaryType("Daily")}
              >
                Daily
              </Button>
            </div>
            {loading ? (
              <Loader
                type="spinner-cub"
                bgColor={"#FF7F50"}
                title={"spinner-cub"}
                color={"#FFFFFF"}
                size={100}
              />
            ) : (
              <>
                <table class="table table-sm table-striped table-bordered table-responsive ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">pic </th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Mobile number</th>
                      <th scope="col">Payment mode</th>
                      {/* <th scope="col">PAN Card</th> */}
                      {/* <th scope="col">UID Number</th> */}
                      <th scope="col">Date of Joining</th>
                      {slectedSalaryType === "Hourly" ? (
                        <>
                          <th className="text-center ">Set working Time</th>
                          <th scope="col" className="text-center">
                            submit Time
                          </th>
                        </>
                      ) : (
                        <></>
                      )}

                      <th scope="col" className="text-center">
                        Present
                      </th>

                      {slectedSalaryType !== "Hourly" ?(<>  <th scope="col" className="text-center">
                             Half Day
                           </th>
                           <th scope="col" className="text-center">
                             Absent
                           </th></>):<></>
                           
                      }
                     
                    </tr>
                  </thead>
                  <tbody>
                    {!employee ? (
                      <div
                        className="row d-flex justify-content-center position-relative top-50 mt-5 "
                        style={{ height: "100vh" }}
                      >
                        <div className="col-md-8 text center position-absolute top-40 start-50">
                          <div class="spinner-border text-dark " role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                      </div>
                    ) : employee.length === 0 ||
                      filteredemployee.length === 0 ? (
                      <>
                        <div className="row d-flex justify-content-center mt-5">
                          <div className="col-md-8 text-center">
                            <h4>No employee Available</h4>
                          </div>
                        </div>
                      </>
                    ) : (
                      filteredemployee &&
                      filteredemployee
                        .filter((e) => e.SalaryType === slectedSalaryType)
                        .map((employee, i) => (
                          <>
                            <tr>
                              <th scope="row" key={i}>
                                {i}
                              </th>
                              <th scope="row" key={i}>
                                <img
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%",
                                  }}
                                  className="img-fluid"
                                  src={`http://attendance.newswise.in/images/Employee/${employee.Image}`}
                                  alt="employeeImage"
                                />
                              </th>

                              <td>{employee.EmployeeName}</td>
                              <td>{employee.MobileNumber}</td>
                              <td>{employee.ModeOfPayment}</td>
                             
                              <td>{employee.DOJ}</td>

                              {slectedSalaryType === "Hourly" ? (
                                <>
                                  <td>
                                    <SingleDay
                                      setendTime={setendTime}
                                      setstartTime={setstartTime}
                                      startTime={startTime}
                                      endTime={endTime}
                                      returnFunction={returnFunction}
                                      employee={employee}
                                      timeemployee={timeemployee}
                                    />
                                  </td>
                                </>
                              ) : (
                                <></>
                              )}

                              {slectedSalaryType === "Hourly" ? (
                                <>
                                  <td>
                                   

                                    <>
                                      <tr>
                                       
                                        {modal && (
                                          <>
                                            <div
                                              class="modal fade d-block mt-5"
                                              style={{ opacity: "1" }}
                                              id="exampleModal"
                                              tabindex="-1"
                                              aria-labelledby="exampleModalLabel"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="modal-dialog"
                                                style={{
                                                  margin: "3.75rem auto",
                                                }}
                                              >
                                                <div class="modal-content">
                                                  <div class="modal-header">
                                                    <h5
                                                      class="modal-title"
                                                      id="exampleModalLabel"
                                                    >
                                                      Set Employee Hourly Time
                                                    </h5>
                                                  </div>
                                                  <div class="modal-body">
                                                    <div className="row">
                                                      <div className="col-md-9">
                                                       
                                                        <TimeRange
                                                          startMoment={
                                                            startTime
                                                          }
                                                          endMoment={endTime}
                                                          onChange={
                                                            returnFunction
                                                          }
                                                        />
                                                      </div>
                                                      <div className="col-md-3">
                                                        <button
                                                          className="btn "
                                                          style={{
                                                            backgroundColor:
                                                              "#FF7F50",
                                                          }}
                                                          onClick={() =>
                                                            submitTime(
                                                              employeedata
                                                            )
                                                          }
                                                        >
                                                          Submit
                                                        </button>
                                                      </div>
                                                      
                                                      <div className="col-md-3">
                                                        <button
                                                          type="button"
                                                          class="btn btn-secondary btn-sm close modal-footer mt-5"
                                                          data-bs-dismiss="modal"
                                                          onClick={() => {
                                                            setmodal(false);
                                                         
                                                          }}
                                                        >
                                                          Close
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        {/*  */}
                                        <td>
                                          <EditIcon
                                            style={{
                                              color: "FF7F50",
                                            }}
                                            
                                            onClick={() =>
                                              setemployeevalue(employee)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    </>

                                   
                                  </td>
                                </>
                              ) : (
                                <></>
                              )}

                              <td>
                                <div class="form-check">
                                  {employee._id ==
                                  checkforfullattendance(employee._id) || checkforHoverlyattendance(employee._id)? (
                                    <>
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="true"
                                        id="flexCheckIndeterminate"
                                        checked={true}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="true"
                                        id="flexCheckIndeterminate"
                                        checked={false}
                                        onClick={() =>
                                          markFullDayAttendance(employee._id)
                                        }
                                      />
                                    </>
                                  )}
                                </div>
                              </td>
                             {
                               slectedSalaryType !== "Hourly"  ? (<>
                                <td>
                                <div class="form-check">
                                  {employee._id ===
                                  checkforhalfattendance(employee._id) ? (
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      checked={true}
                                      value=""
                                      id="flexCheckIndeterminate"
                                    />
                                  ) : (
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckIndeterminate"
                                      checked={false}
                                      onClick={() =>
                                        markHalfDayAttendance(employee._id)
                                      }
                                    />
                                  )}
                                </div>
                              </td>
                              <td>
                                <div class="form-check">
                                  {checkforabsentattendance(employee._id) ? (
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      checked={true}
                                      value=""
                                      id="flexCheckIndeterminate"
                                    />
                                  ) : (
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckIndeterminate"
                                      checked={false}
                                      onClick={() =>
                                        markabsentAttendance(employee._id)
                                      }
                                    />
                                  )}
                                </div>
                              </td>
                               </>):<></>
                             }
                            </tr>
                          </>
                        ))
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
        
      </div>
    </div>
  );
};

export default UserAttendanceSheet;
