import React, { useState } from "react";
// import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from "react-router-dom";
import "./addemployee.css";
// import scrimg from "./images/placeholderimg.png"

import SendIcon from "@mui/icons-material/Send";
// import { Avatar } from '@mui/material'

import "./Creatuser.scss";
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SideBar from "../sideBar/SideBar";
import { axiosInstance } from "../../config";
import { Button } from "@mui/material";
// import { SwapVerticalCircleTwoTone } from '@mui/icons-material';
// import { LoadingButton } from '@mui/lab';
const Creatuser = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  // Family Details Addition dynamically add And Remove Field

  const [selectedImage, setSelectedImage] = useState(null);

  const [formValues, setFormValues] = useState([
    { relativeName: "", relation: "", gender: "", dob: "" },
  ]);

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { relativeName: "", relation: "", gender: "", dob: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const [employee, setemployee] = useState({
    employeeName: "",
    employeeFathername: "",
    employeeMotherName: "",
    employeeGender: "",
    employeecategory: "",
    employeedob: "",
    employeeMobNumber: "",
    employeeEmail: "",
    employeeMaritalStatus: "",
    employeeSpouseName: "",
    employeeAddress: "",
    employeeDesignation: "",
    employeeDepartment: "",
    employeePan: "",
    employeeAdhar: "",
    employeeEPFONumber: "",
    employeeESICNumber: "",
    employeeUANNumber: "",
    employeeDoj: "",
    employeeSalaryType: "",
    employeeSalary: "",
    employeepaymentMode: "",
    BankName: "",
    AccountNumber: "",
    IFSCCode: "",
  });

  // console.log("salary", employee.doj.split("-").reverse().join("/"))

  const onChange = (e) => {
    setemployee({ ...employee, [e.target.name]: e.target.value });
  };

  const {
    employeeName,
    employeeFathername,
    employeeMotherName,
    employeeGender,
    employeecategory,
    employeedob,
    employeeMobNumber,
    employeeEmail,
    employeeMaritalStatus,
    employeeSpouseName,
    employeeAddress,
    employeeDesignation,
    employeeDepartment,
    employeePan,
    employeeAdhar,
    employeeEPFONumber,
    employeeESICNumber,
    employeeUANNumber,
    employeeDoj,
    employeeSalaryType,
    employeeSalary,
    employeepaymentMode,
    BankName,
    AccountNumber,
    IFSCCode,
  } = employee;

  const handleUserdataSubmit = async (e) => {
    e.preventDefault();
    alert("HAndle Submit Clicked");
    setloading(true);
    try {
      const Employee = new FormData();
      Employee.append("employeeName", employeeName);
      Employee.append("employeeFathername", employeeFathername);
      Employee.append("employeeMotherName", employeeMotherName);
      Employee.append("employeeGender", employeeGender);
      Employee.append("employeecategory", employeecategory);
      Employee.append("employeedob", employeedob);
      Employee.append("employeeMobNumber", employeeMobNumber);
      Employee.append("employeeEmail", employeeEmail);
      Employee.append("employeeMaritalStatus", employeeMaritalStatus);
      Employee.append("employeeSpouseName", employeeSpouseName);
      Employee.append("employeeAddress", employeeAddress);
      Employee.append("employeeDesignation", employeeDesignation);
      Employee.append("employeeDepartment", employeeDepartment);
      Employee.append("employeePan", employeePan);
      Employee.append("employeeAdhar", employeeAdhar);
      Employee.append("employeeEPFONumber", employeeEPFONumber);
      Employee.append("employeeESICNumber", employeeESICNumber);
      Employee.append("employeeUANNumber", employeeUANNumber);
      Employee.append("employeeDoj", employeeDoj);
      Employee.append("employeeSalaryType", employeeSalaryType);
      Employee.append("employeeSalary", employeeSalary);
      Employee.append("employeepaymentMode", employeepaymentMode);
      Employee.append("BankName", BankName);
      Employee.append("AccountNumber", AccountNumber);
      Employee.append("IFSCCode", IFSCCode);
      Employee.append("employeeimg", selectedImage);
      Employee.append("FamilyDetails", JSON.stringify(formValues));

      const { data } = await axiosInstance.post(`/api/employee`, Employee, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("fff", data);

      setloading(false);
      alert(data.message);
      navigate("/userdata");
    } catch (error) {
      setloading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {/* <SideBar /> */}
      <div className="p-1 my-container active-cont">
        {/* <!-- Top Nav --> */}
        {/* <nav className="navbar top-navbar navbar-light bg-light px-5">
          <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
        </nav> */}
        {/* <!--End Top Nav --> */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <h1
            style={{
              backgroundColor: "#FF7F50",
              borderRadius: "7px",
              color: "white",
              fontFamily: "initial",
              width: "90%",
              textAlign: "center",
            }}
          >
            {" "}
            ADD EMPLOYEE
          </h1>
        </div>
        <div className="row mx-2 ">
          <form onSubmit={handleUserdataSubmit}>
            <div className="d-flex">
              <h5 style={{ marginRight: "auto" }}>Personal Information</h5>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Employee Name</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeName"
                      onChange={onChange}
                      placeholder="Employee Name"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Father's Name</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeFathername"
                      onChange={onChange}
                      placeholder="Father's Name"
                      required
                    />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className="">Mother's Name</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeMotherName"
                      onChange={onChange}
                      placeholder="Mother's Name"
                    />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Gender</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="employeeGender"
                      onChange={onChange}
                      required
                    >
                      <option value="Employee">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Date of Birth</label>
                    <input
                      className="form-control "
                      type="date"
                      name="employeedob"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Mobile Number</label>
                    <input
                      className="form-control "
                      type="digit"
                      name="employeeMobNumber"
                      onChange={onChange}
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="">Email</label>
                    <input
                      className="form-control "
                      type="email"
                      name="employeeEmail"
                      pattern=".+@gmail\.com"
                      onChange={onChange}
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className="">Marital Status</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="employeeMaritalStatus"
                      onChange={onChange}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>

                  {/* <div className="col-md-4 align-items-center">
                      <label className=''> Employee Activity</label>
                      <select class="form-select" aria-label="Default select example" name="EmployeeActivity" onChange={onChange} >
                      <option value="">Select Employee Activity</option>
                          <option value="Activate">Activate</option>
                          <option value="Deactivate">Deactivate</option>
                      </select>
                    </div> */}

                  <div className="col-md-4 align-items-center">
                    <label className="">Spouse Name</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeSpouseName"
                      onChange={onChange}
                      placeholder="Spouse Name"
                    />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Address</label>
                    <textarea
                      className="form-control "
                      type="text"
                      name="employeeAddress"
                      onChange={onChange}
                      placeholder="Enter Address..."
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2 text-center">
                {selectedImage ? (
                  <div>
                    <img
                      alt="not fount"
                      src={URL.createObjectURL(selectedImage)}
                      className="img-fluid"
                    />
                    <br />
                    <button
                      className="btn btn-warning"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={
                        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                      }
                      alt=""
                      className="img-fluid"
                    />

                    <label className="labelcls" class="custom-file-upload">
                      <input
                        type="file"
                        name="myImage"
                        accept="image/*"
                        onChange={(event) => {
                          console.log(event.target.files[0]);
                          setSelectedImage(event.target.files[0]);
                        }}
                      />
                      Upload Image
                    </label>
                  </>
                )}
                <br />
              </div>
              <hr className="mt-3" />
              <h5>Employee Information</h5>
              <div className="col-md-4 align-items-center">
                <label className="labelcls">Employee Category</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="employeecategory"
                  onChange={onChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Employee">Employee</option>
                  <option value="Labour">Labour</option>
                </select>
              </div>
              {employeecategory == "Employee" && (
                <>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Designation</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeDesignation"
                      onChange={onChange}
                      placeholder="Designation"
                      required
                    />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Department</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeDepartment"
                      onChange={onChange}
                      placeholder="Designation"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Employee PAN</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeePan"
                      onChange={onChange}
                      placeholder="Employee PAN"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Employee UID</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeAdhar"
                      onChange={onChange}
                      placeholder="Employee UID"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">EPFO No.</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeEPFONumber"
                      onChange={onChange}
                      placeholder="EPFO No."
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">ESIC No.</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeESICNumber"
                      onChange={onChange}
                      placeholder="ESIC No."
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">UAN No.</label>
                    <input
                      className="form-control "
                      type="text"
                      name="employeeUANNumber"
                      onChange={onChange}
                      placeholder="UAN No."
                      required
                    />
                  </div>
                </>
              )}

              <div className="col-md-4 align-items-center">
                <label className="labelcls">Employee DOJ</label>
                <input
                  className="form-control "
                  type="date"
                  name="employeeDoj"
                  onChange={onChange}
                  placeholder="Employee DOJ"
                  required
                />
              </div>

              <div className="col-md-4 align-items-center">
                <label className="labelcls">Salary Type</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="employeeSalaryType"
                  onChange={onChange}
                  required
                >
                  <option value="Employee"> Salary Type</option>
                  {employeecategory === "Employee" ? <>
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option> 
                    </>:<option value="Hourly">Hourly</option>
                  }
                  
                  
                </select>
              </div>
              <div className="col-md-4 align-items-center">
                <label className="labelcls">Salary</label>
                <input
                  className="form-control "
                  type="number"
                  name="employeeSalary"
                  onChange={onChange}
                  placeholder="Salary Of Employee/Labour"
                  required
                />
              </div>

              <div className="col-md-4 align-items-center">
                <label className="labelcls">Mode Of Payment</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="employeepaymentMode"
                  onChange={onChange}
                  required
                >
                  <option value="Employee">Payment Mode</option>
                  <option value="Bank">Bank</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              {employeepaymentMode === "Bank" ? (
                <>
                  {" "}
                  <hr className="mt-3" />
                  <h5>Bank Information</h5>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Bank Name</label>
                    <input
                      className="form-control "
                      type="text"
                      name="BankName"
                      onChange={onChange}
                      placeholder="Bank Name"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">Account Number</label>
                    <input
                      className="form-control "
                      type="number"
                      name="AccountNumber"
                      onChange={onChange}
                      placeholder="Account Number"
                      required
                    />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className="labelcls">IFSC Code</label>
                    <input
                      className="form-control "
                      type="text"
                      name="IFSCCode"
                      onChange={onChange}
                      placeholder="IFSC Code"
                      required
                    />
                  </div>{" "}
                </>
              ) : (
                <></>
              )}

              <hr className="mt-3" />

              {employeecategory == "Employee" && (
                <>
                  <div className="d-flex">
                    <h5 style={{ marginRight: "auto" }}>Family Information</h5>
                    <button
                      className="btn btn-primary "
                      onClick={() => addFormFields()}
                    >
                      Add More Family Member
                    </button>
                  </div>
                  {formValues.map((element, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-3 align-items-center">
                        <label className="labelcls">Name</label>
                        <input
                          className="form-control "
                          type="text"
                          name="relativeName"
                          value={element.relativeName || ""}
                          onChange={(e) => handleChange(index, e)}
                          placeholder=" Name"
                          required
                        />
                      </div>
                      <div className="col-md-3 align-items-center">
                        <label className="labelcls">RelationShip</label>
                        <input
                          className="form-control "
                          type="text"
                          name="relation"
                          value={element.relation || ""}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="Relation With Employee"
                          required
                        />
                      </div>
                      <div className="col-md-2 align-items-center">
                        <label>Gender</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          name="gender"
                          value={element.gender}
                          onChange={(e) => handleChange(index, e)}
                          required
                        >
                          <option value="Employee">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>
                      <div className="col-md-2 align-items-center">
                        <label className="labelcls">Date Of Birth</label>
                        <input
                          className="form-control "
                          type="date"
                          name="dob"
                          onChange={(e) => handleChange(index, e)}
                          placeholder="Salary Of Employee/Labour"
                          required
                        />
                      </div>
                      <div className="col-md-2 ">
                        {index ? (
                          <button
                            className=" form-control btn btn-danger align-self-center mt-4"
                            onClick={() => removeFormFields(index)}
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="col-md-12" style={{ padding: "5px" }}>
              <div className="d-flex flex-row">
                {/* <button className="btn "  >Submit</button> */}
                {loading?(<Button
                  // type="submit"
                  style={{
                    backgroundColor: "#FF7F50",
                    borderRadius: "7px",
                    color: "white",
                  }}
                  variant="contained"
                  // endIcon={<SendIcon />}
                >
                  Loading...
                </Button>):(<Button
                  type="submit"
                  style={{
                    backgroundColor: "#FF7F50",
                    borderRadius: "7px",
                    color: "white",
                  }}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              )}  
              </div>

              {/* <LoadingButton
  loading
  loadingPosition="start"
  startIcon={<SwapVerticalCircleTwoTone />}
  variant="outlined"
>
  Save
</LoadingButton> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Creatuser;
