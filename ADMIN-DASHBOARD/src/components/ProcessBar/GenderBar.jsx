import React from 'react'

import "./ProcessBar.scss"
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import FemaleIcon from '@mui/icons-material/Female';
import GirlIcon from '@mui/icons-material/Girl';
import ManIcon from '@mui/icons-material/Man';
import TransgenderIcon from '@mui/icons-material/Transgender';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const GenderBar = ({
    male,Female,Transgender,TotalEmp
}) => {
   
    return (
        <div className='ProcessBar' >
          <div className='ProcessBar-top' style={{
                display:"flex",
                justifyContent: "center",
                paddingTop:"10px"
            }}>
            <h1 style={{
                 textAlign: "center",
            }}>
            Gender Ratio
            </h1>
            {/* <MoreVertIcon /> */}
          </div>
          <hr/>
          <div className='ProcessBar-center'>
            {/* <CircularProgressbar value={65} text={"65%"} styles={buildStyles({
              textColor: "red",
              pathColor: "#FF7F50",
              trailColor: "gold"
            })}  className="CircularProgressbar"/> */}
            <h1> Total No Of Employee </h1>
            <h2>{TotalEmp} </h2>
            <hr/>
            <h4>
              Ratio Of Male / Female / Other
            </h4>
    
    
          </div>
          <div className='ProcessBar-bottom' 
          style={{
            marginBottom:"10px"
          }}
          >
            <div>
              <h3>Male+</h3>
    
              <span className='ProcessBar-bottom-icon positive'><ManIcon /> <p>{male}</p></span>
            </div>
    
            <div>
              <h3>Female+</h3>
    
              <span className='ProcessBar-bottom-icon negative' ><GirlIcon /> <p>{Female}</p></span>
    
            </div>
            <div>
              <h3>Other+</h3>
    
              <span className='ProcessBar-bottom-icon positive'><TransgenderIcon /> <p>{Transgender}</p></span>
            </div>
    
          </div>
        </div>
      )
}

export default GenderBar