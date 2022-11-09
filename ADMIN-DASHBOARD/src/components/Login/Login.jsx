import { Button, Input } from "@mui/material";
import React, { useEffect } from "react";
// import { Input } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../config";


const Login = ({ authentication }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate();

  const handlelogin = async () => {
    // e.preventDefault()
    try {

      const { data } = await axiosInstance.post("/api/user/login", {
        "Email": email,
        "Password": password
      })
      if (data.success) {
        alert("Login Successful")
        // authentication(true) 
        localStorage.setItem("token", data.token)
        // getuser()
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }


  // const getuser = async () => {
  //   try {

  //     const { data } = await axiosInstance.post("/api/user/me", {
       
  //         "token": localStorage.getItem("token")
        
  //     })

  //     // setuser(data)
  //   } catch (error) {
  //     console.log("ss", error)
  //     // console.log(error.response.data.message)
  //   }
  // }

  // useEffect(() => {
  //   getuser();
  // }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="container " style={{ marginTop: "20px" }}>
          <div className="row  align-items-center   " style={{
            borderRadius: "10px",
            border: "2px solid gray"
          }}>
            <div
              className="col-md-6 rounded "
              style={{
                backgroundImage: `url("https://res.cloudinary.com/talk-private/image/upload/v1667563913/218_1_1_mskc3j.jpg")`,
                height: "90vh",
                backgroundSize: "cover",
                objectFit: "contain"

              }}
            ></div>
            <div className="col-md-6 text-center ">
              <div>
                <div className="col-md-12   m-3">

                  <Typography variant="h2" style={{

                    color: "black",
                    fontFamily: "initial",
                    width: "70%",
                    margin: "1rem",
                    textAlign: "center",
                  }}>Login Page</Typography>
                </div>
                {/* <hr/> */}
                <div className="col-md-12  m-3">
                  <Input
                    className="inputbox"
                    type="email"
                    placeholder=" admin123@gmail.com"
                    style={{
                      width: "70%",
                      height: "60%"
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-md-12 m-3">
                  <Input
                    type="password"
                    className="inputbox"
                    placeholder="  **********"
                    style={{
                      width: "70%",
                      height: "60%"
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12 m-3">

                  <Button style={{
                    width: "70%",
                    height: "20%",
                    backgroundColor: "#FF7F50",
                  }} variant="contained" endIcon={<LockOpenIcon />}
                    onClick={handlelogin}
                  >
                    Login
                  </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
