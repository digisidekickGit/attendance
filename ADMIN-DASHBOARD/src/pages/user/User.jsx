import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sideBar/SideBar'
import TableTransition from '../../components/TableTransition/TableTransition'
import UserCard from '../../components/UserCard/UserCard'
// import { userRows } from '../../utils/api';
import "./user.scss";
import { axiosInstance } from '../../config';


const User = () => {
  const {id} = useParams()


  

  const [employeedetails, setEmployeeDetails] = useState({
    id:"",
    employeeName: "",
    employeeFathername: "",
    employeeMotherName: "",
    employeeGender: "",
    employeecategory:"",
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
    FamilyDetails:[],
    Image:"",
    EmployeeActivity:""
  })

  

  useEffect(() => {
    getemployeedetails();
  }, [])


  const { 
    employeecategory,
    FamilyDetails,Image
  } = employeedetails



  const getemployeedetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/employee/${id}`);
      console.log("dd", data)

      if (data.success) {
        setEmployeeDetails({
          ...employeedetails, employeeName: data.data.EmployeeName,
          employeeFathername: data.data.EmployeeFatherName,
          employeeMotherName: data.data.EmployeeMotherName,
          employeeGender: data.data.Gender,
          employeecategory: data.data.EmployeeCategory,
          employeedob: data.data.DOB,
          employeeMobNumber: data.data.MobileNumber,
          employeeEmail: data.data.Email,
          employeeMaritalStatus: data.data.MaritalStatus,
          employeeSpouseName: data.data.SpouseName,
          employeeAddress: data.data.Address,
          employeeDesignation: data.data.Designation,
          employeeDepartment: data.data.Department,
          employeePan: data.data.PAN,
          employeeAdhar: data.data.AadharID,
          employeeEPFONumber: data.data.EPFONumber,
          employeeESICNumber: data.data.ESICNumber,
          employeeUANNumber: data.data.UANNumber,
          employeeDoj: data.data.DOJ,
          employeeSalaryType: data.data.SalaryType,
          employeeSalary: data.data.Amount,
          employeepaymentMode: data.data.ModeOfPayment,
          BankName: data.data.BankAccount.BankName,
          AccountNumber: data.data.BankAccount.AccountNumber,
          IFSCCode: data.data.BankAccount.IfscCode,
          FamilyDetails:data.data.FamilyDetails,
          Image:data.data.Image,
          id:data.data._id,
          EmployeeActivity:data.data.EmployeeActivity,
          

        })


        // employeedetails.employeeName = data.data.EmployeeName
      }


    } catch (error) {
      console.log(error.response.data.message)
    }

  }





  // let userInfo = userRows.find(row => row.id === +id);
    
  // console.log(userInfo)
  
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  
  return (
    <div className='oneUser'>
      <SideBar />

      <div className='oneUser-data'>
        <Navbar />
        <hr />
        <div className='top'>
          <div className='user-left' >
            
            <UserCard getemployeedetails={getemployeedetails} userInfo={employeedetails}/>
          </div>
          <div className='chart-right' >
          <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
          </div>

        </div>
        
        <div  >
          <div style={{
            display: "flex",
            justifyContent:"center"
          }}>
          <h1 
          style={{
            backgroundColor: "#FF7F50",
            borderRadius: "7px",
            color: "white",
            fontFamily: "initial",
            width:"90%",
            textAlign: "center",
          }}
          > Employee Details</h1>
          </div>
          
          <>
          <div className="p-1  my-container active-cont">
        
       
        <div className="row mx-2  pt-3" >

          <form>
           
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls' >Employee Name</label>
                    <input className="form-control " type="text" name='employeeName' placeholder="Employee Name" value={employeedetails.employeeName} required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Father's Name</label>
                    <input className="form-control " type="text" name='employeeFathername' placeholder="Father's Name" value={employeedetails.employeeFathername} required readonly disabled />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className=''>Mother's Name</label>
                    <input className="form-control " type="text" name='employeeMotherName' value={employeedetails.employeeMotherName} placeholder="Mother's Name" required readonly disabled />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className='labelcls' >Gender</label>
                    <select class="form-select" aria-label="Default select example" name="employeeGender" value={employeedetails.employeeGender} required readonly disabled>
                      <option value="Employee">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Date of Birth</label>
                    <input className="form-control " type="date" name='employeedob' value={employeedetails.employeedob} required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Mobile Number</label>
                    <input className="form-control " type="digit" name='employeeMobNumber' placeholder="Mobile Number" value={employeedetails.employeeMobNumber} required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className=''>Email</label>
                    <input className="form-control " type="email" name='employeeEmail' placeholder="Email" value={employeedetails.employeeEmail} required readonly disabled />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className=''>Marital Status</label>
                    <select class="form-select" aria-label="Default select example" name="employeeMaritalStatus" value={employeedetails.employeeMaritalStatus}  required readonly disabled>
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className=''>Spouse Name</label>
                    <input className="form-control " type="text" name='employeeSpouseName' value={employeedetails.employeeSpouseName} placeholder="Spouse Name" required readonly disabled />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Address</label>
                    <textarea className="form-control " type="text" name='employeeAddress' value={employeedetails.employeeAddress} placeholder="Enter Address..." required readonly disabled />
                  </div>
                </div>

              </div>
              {/* <div className="col-md-2 text-center"> */}
              {/* <img src={`${process.env.REACT_APP_URL}/images/Employee/${Image}`} alt="" className='img-fluid' /> */}

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
                  {/* <br />

                </div> */}
              <hr className='mt-3' />
              <h5>Employee Information</h5>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Employee Category</label>
                <select class="form-select" aria-label="Default select example" name="employeecategory" value={employeedetails.employeecategory} required readonly disabled>
                  <option value="Employee">Select Category</option>
                  <option value="Employee">Employee</option>
                  <option value="Labour">Labour</option>
                </select>
              </div>
              {
                employeedetails.employeecategory == "Employee" && <>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Designation</label>
                    <input className="form-control " type="text" name="employeeDesignation" value={employeedetails.employeeDesignation} placeholder="Designation" required readonly disabled />
                  </div>

                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Department</label>
                    <input className="form-control " type="text" name="employeeDepartment" value={employeedetails.employeeDepartment} placeholder="Designation" required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Employee PAN</label>
                    <input className="form-control " type="text" name="employeePan" value={employeedetails.employeePan} placeholder="Employee PAN" required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>Employee UID</label>
                    <input className="form-control " type="text" name='employeeAdhar' value={employeedetails.employeeAdhar} placeholder="Employee UID" required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>EPFO No.</label>
                    <input className="form-control " type="text" name='employeeEPFONumber' value={employeedetails.employeeEPFONumber} placeholder="EPFO No." required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>ESIC No.</label>
                    <input className="form-control " type="text" name='employeeESICNumber' value={employeedetails.employeeESICNumber} placeholder="ESIC No." required readonly disabled />
                  </div>
                  <div className="col-md-4 align-items-center">
                    <label className='labelcls'>UAN No.</label>
                    <input className="form-control " type="text" name='employeeUANNumber' value={employeedetails.employeeUANNumber} placeholder="UAN No." required readonly disabled />
                  </div>

                </>
              }

              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Employee DOJ</label>
                <input className="form-control " type="date" name='employeeDoj' value={employeedetails.employeeDoj} placeholder="Employee DOJ" required readonly disabled />
              </div>

              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Salary Type</label>
                <select class="form-select" aria-label="Default select example" name="employeeSalaryType" value={employeedetails.employeeSalaryType} required readonly disabled>
                  <option value="Employee"> Salary Type</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Daily">Daily</option>
                  <option value="Hourly">Hourly</option>
                </select>

              </div>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Salary</label>
                <input className="form-control " type="number" name='employeeSalary' value={employeedetails.employeeSalary} placeholder="Salary Of Employee/Labour" required readonly disabled />
              </div>

              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Mode Of Payment</label>
                <select class="form-select" aria-label="Default select example" name="employeepaymentMode" value={employeedetails.employeepaymentMode} required readonly disabled>
                  <option value="Employee">Payment Mode</option>
                  <option value="Bank">Bank</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <hr className='mt-3' />
              <h5>Bank Information</h5>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Bank Name</label>
                <input className="form-control " type="text" name='BankName' value={employeedetails.BankName} placeholder="Bank Name" required readonly disabled />
              </div>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>Account Number</label>
                <input className="form-control " type="number" name='AccountNumber' value={employeedetails.AccountNumber} placeholder="Account Number" required readonly disabled />
              </div>
              <div className="col-md-4 align-items-center">
                <label className='labelcls'>IFSC Code</label>
                <input className="form-control " type="text" name='IFSCCode' value={employeedetails.IFSCCode} placeholder="IFSC Code" required readonly disabled />
              </div>

              <hr className='mt-3' />
              {
                  employeecategory == "Employee" && <>
                    <div className="d-flex">
                      <h5 style={{ marginRight: "auto" }}>Family Information</h5>
                      {/* <button className='btn btn-primary ' onClick={() => addFormFields()}>Add More Family Member</button> */}
                    </div>
                    {FamilyDetails.map((element, index) => (
                      <div className="row" key={index}>
                        <div className="col-md-3 align-items-center">
                          <label className='labelcls'>Name</label>
                          <input className="form-control " type="text" name='relativeName' value={element.relativeName || ""}  placeholder=" Name" required readonly disabled />
                        </div>
                        <div className="col-md-3 align-items-center">
                          <label className='labelcls'>RelationShip</label>
                          <input className="form-control " type="text" name='relation' value={element.relation || ""}  placeholder="Relation With Employee" required readonly disabled />
                        </div>
                        <div className="col-md-2 align-items-center">
                          <label>Gender</label>
                          <select class="form-select" aria-label="Default select example" name="gender" value={element.gender}  required readonly disabled>
                            <option value="Employee">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>
                        <div className="col-md-2 align-items-center">
                          <label className='labelcls'>Date Of Birth</label>
                          <input className="form-control " type="date" name='dob' value={element.dob} placeholder="Salary Of Employee/Labour" required readonly disabled />
                        </div>
                        
                      </div>
                    ))}

                  </>

                }
              <hr className='mt-3' />

              {
                  employeedetails == "Employee" && <>
                    <div className="d-flex">
                      <h5 style={{ marginRight: "auto" }}>Family Information</h5>
                      {/* <button className='btn btn-primary ' onClick={() => addFormFields()}>Add More Family Member</button> */}
                    </div>
                    {employeedetails.FamilyDetails.map((element, index) => (
                      <div className="row" key={index}>
                        <div className="col-md-3 align-items-center">
                          <label className='labelcls'>Name</label>
                          <input className="form-control " type="text" name='relativeName' value={element.relativeName || ""}  placeholder=" Name" required readonly disabled />
                        </div>
                        <div className="col-md-3 align-items-center">
                          <label className='labelcls'>RelationShip</label>
                          <input className="form-control " type="text" name='relation' value={element.relation || ""}  placeholder="Relation With Employee" required readonly disabled />
                        </div>
                        <div className="col-md-2 align-items-center">
                          <label>Gender</label>
                          <select class="form-select" aria-label="Default select example" name="gender" value={element.gender}  required readonly disabled>
                            <option value="Employee">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>
                        <div className="col-md-2 align-items-center">
                          <label className='labelcls'>Date Of Birth</label>
                          <input className="form-control " type="date" name='dob' value={element.dob} placeholder="Salary Of Employee/Labour" required readonly disabled />
                        </div>
                        
                      </div>
                    ))}

                    

                  </>

                }


            </div>








          </form>


        </div>
      </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default User