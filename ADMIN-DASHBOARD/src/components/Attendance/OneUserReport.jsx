import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import SideBar from '../sideBar/SideBar'
// import TimeRange from "react-time-range";
// import AttendanceSheetData from './AttendanceSheetData';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import Loader from "react-js-loader";
import { axiosInstance } from '../../config';
import { useEffect } from 'react';
const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 }
  ];
const OneUserReport = () => {
    const {userID} = useParams();
    const [selectedquery, setselectedquery] = useState()
    const [selectMonth, setselectMonth] = useState("")
    const [selectYear, setselectYear] = useState("")
    const [employee, setemployee] = useState()
    const [loading, setloading] = useState(false)
    // const [isdata, setIsDATA] = useState(false)
    const Submitquery = async () => {
        try {
            setloading(true)
            
            const { data } = await axiosInstance.post(`/api/attendance/checkattendance/${userID}`, {
                "AttendanceYear": selectYear,
                "AttendanceMonth": selectMonth
            })
            
          setselectedquery(data.data)
          
          console.log(data.data,"querydata")
          setloading(false)
    
        } catch (error) {
            setloading(false)
          alert(error.response.data.message)
        }
    }
    
    const getemployee = async () => {
        try {
        //   setLoading(true);
          const { data } = await axiosInstance.get("/api/employee/activity");
        //   setLoading(false);
          console.log("employee", data);
          const us = data.data;
        const M =  us.filter(e=>e._id == userID)
        // console.log("M",M[0])
          setemployee(M[0]);
        } catch (error) {
        //   console.log("error", error.response.data.message);
        }
      };
   
    // const returnFunction = (e) => {
    //     if(!selectYear || !selectMonth){

    //         alert("please select a year or Month ")
    //     }
    //     console.log(userID,selectMonth,selectYear)
        
    
        
    
        
    //   };

      useEffect(()=>{
        getemployee()
      },[selectedquery])
  return (
<>

    <div>
    <div id="Adduser">
      <SideBar />
      <div className='AdduserContainer'>
        <Navbar />
        <hr />
        <div style={{
            display: "flex",
            justifyContent:"center",
           
            
          }}>
          <h1 
          style={{
            backgroundColor: "#FF7F50",
            borderRadius: "7px",
            color: "white",
            fontFamily: "initial",
            width:"100%",
            textAlign: "center",
          }}
          > Please Generate Report</h1>
          
          </div>
        
          <div style={{
            margin:"1rem"
          }} className="row">
                    <div className="col-md-4">
                      <div class="form-group">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setselectYear(e.target.value)}>
                          <option selected>Select Year</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setselectMonth(e.target.value)}>
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
                      <button className='btn '  style={{
                         backgroundColor: "#FF7F50",
                         borderRadius: "7px",
                         color: "white",
                      }}onClick={Submitquery}>Submit</button>
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
            ) : (
              <div style={{
                margin:"1rem",
              }}>
               
              
                {
                    selectedquery &&  <table class="table table-sm table-striped table-bordered table-responsive " id="table-to-xls">
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        
                        <th scope="col">Employee Name</th>
                        <th scope="col">No. Of Days</th>
                        <th scope="col">Full Day</th>
                       
                        <th scope="col">Half Day</th>
                      
                        <th scope="col" className="text-center">
                        Absent Day
                        </th>
                        {/* <th scope="col" className="text-center">
                          Half Day
                        </th> */}
                        <th scope="col" className="text-center">
                        HoliDay
                        </th>
                        <th scope="col" className="text-center">
                        Salary Amount
                        </th>
                        {
                                employee?.EmployeeCategory === "Employee" ? <>
                                  <th scope="col">Monthly Salary</th>
                                </> : <th scope="col">Salary Per Day</th>
                              }
                      </tr>
                    </thead>
                    <tbody>
                     
                        
                            <tr>
                            <td>{employee?.EmployeeName}</td>
                              <td>{selectedquery?.TotalWorkingDay}</td>
                              <td>{selectedquery?.TotalFullDay}</td>
                              <td>{selectedquery?.TotalHalfDay}</td>
                              <td>{selectedquery?.TotalAbsentDay}</td>
                              {/* <td></td> */}
                              <td>{selectedquery?.TotalHoliday}</td>
                              <td>₹ {Number(selectedquery?.TotalSalary).toFixed(2)}</td>
                              {
                                employee?.EmployeeCategory === "Employee" ? <>
                                  <td>₹ {employee?.Amount}</td>
                                </> : <td>₹ {employee?.Amount}/day</td>
                              }
                              </tr>
                           
                          
                      
                    </tbody>
                  </table>
                }
                 {selectedquery && (<>
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn bg-warning mt-1"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                      />
               </>)


}
{
    selectedquery && <div > 
         <PieChart  className='boxshadow' width={400} height={300}>
     {/* { name: "Group A", value: 2400 }, */}

   
     <Pie
     
        dataKey="value"
        isAnimationActive={true}
        data={[{ name: "Present", value: selectedquery?.TotalFullDay },{ name: "Absent", value: selectedquery?.TotalAbsentDay },{ name: "HalfDay", value: selectedquery?.TotalHalfDay },]}
       
        outerRadius={80}
        fill="rgb(255, 127, 80)"
        label
      />
     <Tooltip />
   </PieChart>
   </div>
}

              </div>
            )}
          
          
      </div>
      </div>
    </div>
    </>
  )
}

export default OneUserReport