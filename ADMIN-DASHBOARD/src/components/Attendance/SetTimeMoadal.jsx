import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import TimeRange from "react-time-range";
import { axiosInstance } from '../../config';
const SetTimeMoadal = ({userid}) => {


  
  const {id} = useParams()
  console.log(userid,"userId");
  const [startTime, setstartTime] = useState();
  const [endTime, setendTime] = useState();
  const [tiggerstate, settiggerstate] = useState(true);
  const returnFunction = (e) => {

    setstartTime(e.startTime);
    setendTime(e.endTime);
  };

  const submitTime = async () => {
    console.log(startTime,endTime,id ,"from setTie dkndn ");
    try {
      if (!startTime) {
        return alert("Please select a start time");
      }
      if (!endTime) {
        return alert("Please select a End time");
      }
      const { data } = await axiosInstance.put(
        `/api/attendance/setHourlyEmployeesTiming`,
        {
          id: id,
          user: {
            userid: userid._id,
            startTime,
            endTime,
          },
        }
      );
      alert(data.message);
      settiggerstate(!tiggerstate);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  
  return (
    <>
     
   
  
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Set Employee Time</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h1>
        {userid._id}
        </h1>
      <TimeRange
                                  startMoment={startTime}
                                  endMoment={endTime}
                                  onChange={returnFunction}
                                />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>submitTime()}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
   
  )
}

export default SetTimeMoadal







