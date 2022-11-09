import React, { useEffect, useState } from 'react'
// import { CircularProgressbar } from 'react-circular-progressbar'
import { Navigate, Outlet } from 'react-router-dom'
import { axiosInstance } from '../../config'
import Login from './Login'
// import axios from 'axios'

const PrivateRoute = () => {


    const [user, setuser] = useState("")
    const [loading, setloading] = useState(false)

    useEffect(() => {
        getuser()
    },[loading])




    const getuser = async () => {
        setloading(true)

        // console.log("gg",localStorage.getItem("token"))

        const newtoken = localStorage.getItem("token")
        try {
            const { data } = await axiosInstance.post(`/api/user/me`, {
               "token": newtoken
              })

            console.log("user logn", data)
            setuser(data)
            setloading(false)
            // isAdmin = data.isAdmin
            // console.log("isAdmin", isAdmin   )


        } catch (error) {
            setloading(false)
            setuser("")
            console.log("sss",error.response.data.message)
            // alert(error.response.data.message)
        }
    }


    // console.log("uccccser",isAdmin)
    // console.log("uccccser",user?.isAdmin)

    return (
        <>
            {
             user === "" ? <Login/> : 
                    <>
                        {
                            user.isAdmin ? <Outlet /> : <Navigate to='/' />
                        }

                    </>
            }

        </>

    )
}

export default PrivateRoute