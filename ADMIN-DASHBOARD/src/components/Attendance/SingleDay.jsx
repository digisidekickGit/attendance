import React from 'react'
import TimeRange from "react-time-range";
const SingleDay = ({ employee,timeemployee,returnFunction,startTime}) => {
    console.log("ee",employee,timeemployee)
    const newdata = timeemployee.find((e)=>e.userid === employee._id)
    console.log("sss",newdata)


    return (
        <>
            <td><div class="form-check">

                


                <TimeRange
                                  startMoment={newdata?.startTime}
                                  endMoment={newdata?.endTime}
                                  onChange={returnFunction}
                                />


                {/* {
                    checkforemployeeattendance(employee._id) ? <input class="form-check-input" type="text" value="" id="flexCheckIndeterminate" /> : <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" checked={false} onClick={() => markabsentAttendance(employee._id)} />
                } */}

            </div></td>
        </>
    )
}

export default SingleDay