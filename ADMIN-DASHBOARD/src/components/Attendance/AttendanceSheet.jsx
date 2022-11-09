import React from 'react'
import Navbar from '../navbar/Navbar'
import SideBar from '../sideBar/SideBar'
import AttendanceSheetData from './AttendanceSheetData'

const AttendanceSheet = () => {
  return (
    <div  className='UserList'>
    <SideBar />
    <div className='UserList-table'>
     <Navbar/>
     <hr />
     <h1>
       Attendance Sheet
     </h1>
     <AttendanceSheetData />
    </div>
 </div>
  )
}

export default AttendanceSheet


