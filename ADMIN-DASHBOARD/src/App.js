import "./App.scss";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Pagenotfound from "./pages/pageNotFound/Pagenotfound";
import Home from "./pages/home/Home";
// import Login from './pages/login/Login';
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Adduser from "./pages/AddUser/Adduser";
import EditEmployee from "./components/UserCard/EditEmployee";
import AttendanceSheet from "./components/Attendance/AttendanceSheet";
import AttendanceSheetDate from "./components/Attendance/AttendanceSheetByDate";
import AttendanceSheetByDate from "./components/Attendance/AttendanceSheetByDate";
import UserAttendanceSheet from "./components/Attendance/UserAttendanceSheet";
import ReportSection from "./components/Attendance/ReportSection";
import OneUserReport from "./components/Attendance/OneUserReport";
// import Login from './pages/login/Login';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute.jsx";
import MonthlyBaseAtt from "./components/Attendance/MonthlyBaseAtt";
// export const NotifactionContext = createContext();

function App() {
  // const navigate = useNavigate();
  // const [authentication, setAuthentication] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setAuthentication(true);
  //   } else {
  //     setAuthentication(false);
  //   }
  // }, [authentication]);
  return (
    // <NotifactionContext.Provider value={{ authentication, setAuthentication }}>
      <BrowserRouter>
        <Routes>
          

          

          <Route element={<PrivateRoute />}>
            <Route
              index
              path="/dashboard"
              element={
                  <Home />
                
              }
            />
            <Route
              index
              path="/userdata"
              element={ <UserList />}
            />
            {/* <Route index path="/login" element={<Login/>}/> */}
            <Route
              index
              path="/user/:id"
              element={ <User />}
            />
            <Route
              index
              path="/userdata/EditEmployee/:id"
              element={ <EditEmployee />}
            />
            <Route
              index
              path="/adduser"
              element={ <Adduser />}
            />
            <Route
              index
              path="/admin/attendance"
              element={ <AttendanceSheetByDate />}
            />
            <Route
              index
              path="/attendance-sheet"
              element={ <AttendanceSheet />}
            />
            <Route
              path="/admin/markattendance/:id"
              element={ <UserAttendanceSheet />}
            />
            <Route
              path="/report/Section"
              element={ <ReportSection />}
            />
            <Route
              path="/report/Section/user/:userID"
              element={ <OneUserReport />}
            />
            <Route
              path="/MonthlyBaseAtt"
              element={ <MonthlyBaseAtt />}
            />
            {/* <Route path="/login" element={<Login />} /> */}
          </Route>
          <Route path="/" element={<Login />} />

          {/* /<Route path="*" element={<Pagenotfound />} /> */}
        </Routes>
      </BrowserRouter>
    // </NotifactionContext.Provider>
  );
}

export default App;
