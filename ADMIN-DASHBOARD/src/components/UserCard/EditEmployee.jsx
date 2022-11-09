import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config";
import Navbar from "../navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import SendIcon from "@mui/icons-material/Send";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate()


  const [employee, setemployee] = useState({
    // employeename: "",
    // pan: "",
    // uid: "",
    // doj: ""
  })

  const [bankaccount, setbankaccount] = useState({

  })
  const [loading, setloading] = useState(false)


  const {AccountNumber,IfscCode,BankName} = bankaccount





  const {
    AadharID, Address,
    Amount,
    BankAccount,
    DOB, DOJ, Department, Designation, EPFONumber,
    ESICNumber,
    Email,
    EmployeeCategory,
    EmployeeFatherName,
    EmployeeMotherName,
    EmployeeName,
    FamilyDetails,
    Gender,
    Image,
    MaritalStatus,
    MobileNumber,
    ModeOfPayment,
    PAN,
    SalaryType,
    SpouseName,
    UANNumber
  } = employee


 










  const onChange = (e) => {
    setemployee({ ...employee, [e.target.name]: e.target.value })
  }

  const bankAccountonChange = (e) => {
    setbankaccount({ ...bankaccount, [e.target.name]: e.target.value })
  }



  const [formValues, setFormValues] = useState([{ relativeName: "", relation: "", gender: "", dob: "" }])



 

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }


  let addFormFields = (e) => {
    e.preventDefault();
    // alert("Add form clicked")
    console.log('ff', formValues)

    setFormValues([...formValues, { relativeName: "", relation: "", gender: "", dob: "" }])
    console.log("dd", formValues)
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }





  useEffect(() => {
    getemployee()
  }, [])


  const getemployee = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/employee/${id}`)
      console.log("dar", data.data)

      setemployee(data.data)
      setFormValues(data.data.FamilyDetails)
      setbankaccount(data.data.BankAccount)
    

    } catch (error) {
      console.log(error.response.data.message)
    }
  }








  const handledataSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const { data } = await axiosInstance.put(`/api/employee/${id}`, {
        AadharID, Address,
        Amount,
        BankAccount:bankaccount,
        DOB, DOJ, Department, Designation, EPFONumber,
        ESICNumber,
        Email,
        EmployeeCategory,
        EmployeeFatherName,
        EmployeeMotherName,
        EmployeeName,
        FamilyDetails:formValues,
        Gender,
        Image,
        MaritalStatus,
        MobileNumber,
        ModeOfPayment,
        PAN,
        SalaryType,
        SpouseName,
        UANNumber
        // "Name": employeeName,
        // "DOJ": employeedoj,
        // "PAN":employeePan,
        // "UID": employeeUid,
        // "EmployeeCategory":employeecategory,
        // "Salary":salary
      })
      if (data.success) {
        alert("Employee Updated Successfully")
      }
      navigate("/userdata")
      setloading(false)
    } catch (error) {
      setloading(false)
      alert(error.response.data.message)
    }
  }





  return (
    <div className='UserList'>
    <SideBar />
    <div className='UserList-table'>
     <Navbar/>
     <hr />
     <div className="p-1 my-container active-cont" style={{
      display:"flex",
      flexDirection: "column"
    }}>
        {/* <!-- Top Nav --> */}
        {/* <nav className="navbar top-navbar navbar-light bg-light px-5">
          <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
        </nav> */}
        {/* <!--End Top Nav --> */}
        <h3 
        style={{
          backgroundColor: "#FF7F50",
          borderRadius: "7px",
          color: "white",
          fontFamily: "initial",
          width:"90%",
          alignSelf:"center"
          
        }}
        className="text-center p-1 m-4 ">EDIT EMPLOYEE DETAILS
        </h3>
        <div className="row mx-2  " >
          <form onSubmit={handledataSubmit}>
            <div className="d-flex">
              <h5 style={{ marginRight: "auto" }}>Personal Information</h5>
              <h5>Emp. ID : 234</h5>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls' >Employee Name</label>
                    <input className="form-control " type="text" name='EmployeeName' placeholder="Employee Name" value={EmployeeName} onChange={onChange} required />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Father's Name</label>
                    <input className="form-control " type="text" name='EmployeeFatherName' placeholder="Father's Name" value={EmployeeFatherName} onChange={onChange} required />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className=''>Mother's Name</label>
                    <input className="form-control " type="text" name='EmployeeMotherName' value={EmployeeMotherName} placeholder="Mother's Name" onChange={onChange} />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className='labelcls' >Gender</label>
                    <select class="form-select" aria-label="Default select example" name="Gender" value={Gender} onChange={onChange}>
                      <option value="Employee">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Date of Birth</label>
                    <input className="form-control " type="date" name='DOB' value={DOB} onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Mobile Number</label>
                    <input className="form-control " type="digit" name='MobileNumber' placeholder="Mobile Number" value={MobileNumber} onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className=''>Email</label>
                    <input className="form-control " type="email" name='Email' placeholder="Email" value={Email} onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className=''>Marital Status</label>
                    <select class="form-select" aria-label="Default select example" name="MaritalStatus" value={MaritalStatus} onChange={onChange}>
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className=''>Spouse Name</label>
                    <input className="form-control " type="text" name='SpouseName' value={SpouseName} placeholder="Spouse Name" onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Address</label>
                    <textarea className="form-control " type="text" name='Address' value={Address} placeholder=" Address..." onChange={onChange} />
                  </div>
                </div>

              </div>
              <div className="col-md-2 text-center">
                <img src={`${process.env.REACT_APP_URL}/images/Employee/${Image}`} alt="" className='img-fluid' />

                {/* {selectedImage ?
                    <div>
                      <img alt="not fount" src={URL.createObjectURL(selectedImage)} className='img-fluid' />
                      <br />
                      <button className='btn btn-warning' onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                    : <>
                      <img src={scrimg} alt="" className='img-fluid' />


                      <label className='labelcls' class="custom-file-upload">
                        <input type="file"
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
                  } */}
                <br />

              </div>
              <hr className='mt-3' />
              <h5>Employee Information</h5>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Employee Category</label>
                <select class="form-select" aria-label="Default select example" name="employeecategory" value={EmployeeCategory} onChange={onChange} >
                  <option >Select Category</option>
                  <option value="Employee">Employee</option>
                  <option value="Labour">Labour</option>
                </select>
              </div>
              {
                EmployeeCategory == "Employee" && <>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Designation</label>
                    <input className="form-control " type="text" name="Designation" value={Designation} placeholder="Designation" onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Department</label>
                    <input className="form-control " type="text" name="Department" value={Department} placeholder="Designation" onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Employee PAN</label>
                    <input className="form-control " type="text" name="PAN" value={PAN} placeholder="Employee PAN" onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Employee UID</label>
                    <input className="form-control " type="text" name='AadharID' value={AadharID} placeholder="Employee UID" onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>EPFO No.</label>
                    <input className="form-control " type="text" name='EPFONumber' value={EPFONumber} placeholder="EPFO No." onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>ESIC No.</label>
                    <input className="form-control " type="text" name='ESICNumber' value={ESICNumber} placeholder="ESIC No." onChange={onChange} />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>UAN No.</label>
                    <input className="form-control " type="text" name='UANNumber' value={UANNumber} placeholder="UAN No." onChange={onChange} />
                  </div>
                </>
              }
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Employee DOJ</label>
                <input className="form-control " type="date" name='DOJ' value={DOJ} placeholder="Employee DOJ" onChange={onChange} />
              </div>

              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Salary Type</label>
                <select class="form-select" aria-label="Default select example" name="SalaryType" value={SalaryType} onChange={onChange}>
                  <option value="Employee"> Salary Type</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Daily">Daily</option>
                  <option value="Hourly">Hourly</option>
                </select>

              </div>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Salary</label>
                <input className="form-control " type="number" name='Amount' value={Amount} placeholder="Salary Of Employee/Labour" onChange={onChange} />
              </div>

              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Mode Of Payment</label>
                <select class="form-select" aria-label="Default select example" name="ModeOfPayment" value={ModeOfPayment} onChange={onChange}>
                  <option value="Employee">Payment Mode</option>
                  <option value="Bank">Bank</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <hr className='mt-3' />
              <h5>Bank Information</h5>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Bank Name</label>
                <input className="form-control " type="text" name='BankName' value={BankName} placeholder="Bank Name" required onChange={bankAccountonChange} />
              </div>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Account Number</label>
                <input className="form-control " type="number" name='AccountNumber' value={AccountNumber} placeholder="Account Number" required onChange={bankAccountonChange} />
              </div>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>IFSC Code</label>
                <input className="form-control " type="text" name='IfscCode' value={IfscCode} placeholder="IFSC Code" required onChange={bankAccountonChange} />
              </div>

              <hr className='mt-3' />
              {
                EmployeeCategory == "Employee" && <>
                  <div className="d-flex">
                    <h5 style={{ marginRight: "auto" }}>Family Information</h5>
                    <Button  style={{
                    backgroundColor: "#FF7F50",
                    borderRadius: "7px",
                    color: "white",
                  }} onClick={(e) => addFormFields(e)}>Add More Family Member</Button>
                  </div>
                  {formValues.map((element, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-3 align-items-center">
                        <label className='labelcls'>Name</label>
                        <input className="form-control " type="text" name='relativeName' value={element.relativeName || ""} placeholder=" Name" onChange={e => handleChange(index, e)} required />
                      </div>
                      <div className="col-md-3 align-items-center">
                        <label className='labelcls'>RelationShip</label>
                        <input className="form-control " type="text" name='relation' value={element.relation || ""} placeholder="Relation With Employee" onChange={e => handleChange(index, e)} required />
                      </div>
                      <div className="col-md-2 align-items-center">
                        <label>Gender</label>
                        <select class="form-select" aria-label="Default select example" name="gender" value={element.gender} onChange={e => handleChange(index, e)} required >
                          <option value="Employee">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>
                      <div className="col-md-2 align-items-center">
                        <label className='labelcls'>Date Of Birth</label>
                        <input className="form-control " type="date" name='dob' value={element.dob} placeholder="Salary Of Employee/Labour" onChange={e => handleChange(index, e)} required />
                      </div>
                      <div className="col-md-2 ">
                        {
                          index ?
                            <button className=' form-control btn btn-danger align-self-center mt-4' onClick={() => removeFormFields(index)}>Remove</button>
                            : null
                        }
                      </div>

                    </div>
                  ))}
                </>
              }
            </div>

            <div className="col-md-12" style={{ padding: "5px" }}>
              <div className="d-flex flex-row">
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
                {/* <button className="btn btn-success" type='submit' >Submit</button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
     
    </div>
 </div>
  );
};

export default EditEmployee;
