import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {DataTable} from '../../components/dataTable/DataTable'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sideBar/SideBar'
import "./userlist.scss"
// import AddIcon from '@mui/icons-material/Add';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
const UserList = () => {
   const [inputData , setInput]= useState();
   const navigate = useNavigate()
   console.log(inputData)
  return (
    <div className='UserList'>
       <SideBar  />
       <div className='UserList-table'>
        <Navbar setInput={setInput}  inputData={inputData}/>
        <hr />
        
        <div style={{
            display: "flex",
            justifyContent:"center",
            margin:"1rem"
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
          > User Lists</h1>
          </div> 
         {/* <Link to="/adduser">
                        <li>
                            <AddIcon className='icons-item' />
                            <span>Add User</span>
                        </li>
                    </Link> */}
                    <Button variant="contained" style={{
                       backgroundColor: "#7f3499b3",
                      //  fontSize: "18px",
                      margin: "1rem"
                    }} startIcon={<AddIcon />}
                    onClick={()=>navigate("/adduser")}
                    >
                    Add User
                    </Button>
        <DataTable inputData={inputData}/>
       </div>
    </div>
  )
}

export default UserList