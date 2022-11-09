import React, { useState } from 'react'
import { AttendanceDataTable } from '../dataTable/DataTable';
import Navbar from '../navbar/Navbar'
import SideBar from '../sideBar/SideBar'
// import TimeRange from "react-time-range";

const ReportSection = () => {
 const [inputData,setInput] = useState()
   
  return (
<>
    







    <div>
    <div id="Adduser">
      <SideBar />
      <div className='AdduserContainer'>
        <Navbar setInput={setInput} inputData={inputData}/>
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
          > Please Select A Employee For Generate Report</h1>
          
          </div>
        
          
          <AttendanceDataTable  inputData={inputData} />
      </div>
      </div>
    </div>
    </>
  )
}

export default ReportSection