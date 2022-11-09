import React from 'react'
import "./ProcessBar.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const ProcessBar = () => {
  return (
    <div className='ProcessBar' >
      <div className='ProcessBar-top'>
        <h1>
        Last 7 mounts Total (Revenue)
        </h1>
        <MoreVertIcon />
      </div>
      <div className='ProcessBar-center'>
        <CircularProgressbar value={65} text={"65%"} styles={buildStyles({
          textColor: "red",
          pathColor: "#FF7F50",
          trailColor: "gold"
        })}  className="CircularProgressbar"/>
        <h1> Total sales made by today </h1>
        <h2> $4000 </h2>
        <h4>
          Previous transactions processing. Last payments may
          not be included.
        </h4>


      </div>
      <div className='ProcessBar-bottom'>
        <div>
          <h3>Target</h3>

          <span className='ProcessBar-bottom-icon negative'><KeyboardArrowDownIcon /> <p>$ 300</p></span>
        </div>

        <div>
          <h3>Last Week</h3>

          <span className='ProcessBar-bottom-icon positive' ><KeyboardArrowUpIcon /> <p>$ 200</p></span>

        </div>
        <div>
          <h3>Last Month</h3>

          <span className='ProcessBar-bottom-icon positive'><KeyboardArrowUpIcon /> <p>$ 100</p></span>
        </div>

      </div>
    </div>
  )
}

export default ProcessBar