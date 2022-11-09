import React from 'react'
import Creatuser from '../../components/Creatuser/Creatuser'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sideBar/SideBar'
import "./adduser.scss"
const Adduser = () => {
  return (
    <div>
      <div id="Adduser">
        <SideBar />
        <div className='AdduserContainer'>
          <Navbar />
          <hr />
          <Creatuser />
          
        </div>
        </div>
      </div>
      )
}

      export default Adduser