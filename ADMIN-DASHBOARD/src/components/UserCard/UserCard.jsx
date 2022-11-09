import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./UserCard.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../config";

const UserCard = ({ userInfo, getemployeedetails }) => {
  console.log("dd", userInfo);

  const {
    employeeName,
    employeeFathername,
    // employeeMotherName,
    employeeGender,
    // employeecategory,
    // employeedob,
    employeeMobNumber,
    employeeEmail,
    EmployeeActivity,
    // employeeMaritalStatus,
    // employeeSpouseName,
    // employeeAddress,
    // employeeDesignation,
    // employeeDepartment,
    // employeePan,
    // employeeAdhar,
    // employeeEPFONumber,
    // employeeESICNumber,
    // employeeUANNumber,
    employeeDoj,

    Image,
    id,
  } = userInfo;

  const editUserData = async () => {
    const date = new Date();
    try {
      if (EmployeeActivity === "Activate") {
        const { data } = await axiosInstance.put(
          `/api/employee/activity/${id}`,
          {
            EmployeeActivity: "Deactivate",
          }
        );
        getemployeedetails();
        alert(data.message);
      } else {
        const { data } = await axiosInstance.put(
          `/api/employee/activity/${id}`,
          {
            EmployeeActivity: "Activate",
            date: date,
          }
        );
        getemployeedetails();
        alert(data.message);
      }
    } catch (err) {}

    // try {
    //   console.log("dd", EmployeeActivity);

    //   const { data } = await axiosInstance.put(`/api/employee/activity/${id}`, {
    //     EmployeeActivity: EmployeeActivity === "Activate" ? "Deactivate" : "Activate",
    //     date: EmployeeActivity === "Activate" && date
    //   });
    //   alert(data.message);
    //   getemployeedetails()
    // } catch (error) {
    //   console.log("error", error.response.data.message);
    // }
  };

  return (
    <div className="User-Card">
      <div className="User-Card-header">
        <p>Employee INFORMATION</p>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            checked={EmployeeActivity === "Activate" ? true : false}
            onClick={() => editUserData()}
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
            {EmployeeActivity}
          </label>
        </div>

        <Link to={`/userdata/EditEmployee/${id}`}>
          {" "}
          <span>
            <EditIcon className="edit-icon" />
            Edit{" "}
          </span>{" "}
        </Link>
      </div>

      <div className="User-Card-footer">
        <img
          src={`http://attendance.newswise.in/images/Employee/${Image}`}
          alt="pic"
        />
        <div className="user-info">
          <ul>
            <p>{employeeName}</p>

            <li>
              <span>Email:</span>
              <h2>{employeeName}</h2>
            </li>
            <li>
              <span>phone: </span> <h2>{employeeMobNumber}</h2>
            </li>
            <li>
              <span>DOB:</span> <h2>{employeeDoj}</h2>
            </li>
            <li>
              <span>Marital Status:</span> <h2>{employeeGender}</h2>
            </li>
            <li>
              <span>Joining date :</span> <h2>{employeeDoj}</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
