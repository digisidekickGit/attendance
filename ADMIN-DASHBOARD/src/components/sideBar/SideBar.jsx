import React, { useContext, useEffect, useState } from 'react'
import "./sideBar.scss"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HelpIcon from '@mui/icons-material/Help';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import CoPresentIcon from '@mui/icons-material/CoPresent';
// import { NotifactionContext } from '../../App';
// import { useState } from 'react';
const SideBar = () => {
//    const [i,seti] = useState(false);
//    const { authentication, setAuthentication} = useContext(NotifactionContext);
 const navigate = useNavigate()
    const handelLogout = () => {
        console.log("running")
        localStorage.removeItem("token");
        // setAuthentication(false)
        navigate("/")
        alert("Logout successfully");

    }
   
    return (
        <div className='sidebar'>
            <div className='logo'>
                <span className='logoIcon'>Mittal Spinners</span>
            </div>

            <hr />

            <div className='center'>
                <ul>
                    <p className='titles'>MAIN</p>
                    {/* <li>
                        <DashboardCustomizeIcon className='icons-item' />
                        <span>Dashboard</span>
                    </li> */}
                    <Link to="/dashboard">
                        <li>
                            <DashboardCustomizeIcon className='icons-item' />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className='titles'>LISTS</p>

                    <Link to="/userdata">
                        <li>
                            <AccountCircleIcon className='icons-item' />
                            <span>Employee</span>
                        </li>
                    </Link>
                    {/* <Link to="/adduser">
                        <li>
                            <AddIcon className='icons-item' />
                            <span>Add User</span>
                        </li>
                    </Link> */}
                    <Link to="/admin/attendance" >
                    <li>
                    <AddTaskIcon className='icons-item' />
                        <span>Attendance Sheet</span>
                    </li>
                    </Link>
                    <Link to="/MonthlyBaseAtt" >
                    <li>
                    <CoPresentIcon className='icons-item' />
                        <span>Check Attendance</span>
                    </li>
                    </Link>
                    {/* <Link to="/attendance-sheet">
                        <li>
                            <AddTaskIcon className='icons-item' />
                            <span>Check Attendance</span>
                        </li>
                    </Link> */}
                    
                    {/* <li>
                        <AddTaskIcon className='icons-item' />
                        <span>Orders</span>
                    </li> */}
                    {/* <li>
                        <LocalShippingIcon className='icons-item' />
                        <span>Delivery</span>
                    </li> */}
                    {/* <p className='titles'>USEFUL</p>
                    <li>
                        <QueryStatsIcon className='icons-item' />

                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsActiveIcon className='icons-item' />
                        <span>Notification</span>
                    </li> */}
                    {/* <li>
                        <HelpIcon className='icons-item' />
                        <span>Help </span>
                    </li> */}

                    <p className='titles'>SERVICES</p>
                    <Link to="/report/Section" >
                    <li>
                        <SettingsSystemDaydreamIcon className='icons-item' />
                        <span>Report Section Info</span>
                    </li>
                    </Link>
                    {/* <li>
                        <PsychologyIcon className='icons-item' />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsSuggestIcon className='icons-item' />
                        <span>Settings</span>
                    </li> */}

                    <p className='titles'>USER INFO</p>
                    <li>
                        <AccountCircleOutlinedIcon className='icons-item' />
                        <span>Profile</span>
                    </li>
                   
                    <li onClick={handelLogout}>
                        <LogoutOutlinedIcon className='icons-item'   />
                        <span>Logout</span>
                    </li>
                   
                </ul>
            </div>


        </div>
    )
}

export default SideBar