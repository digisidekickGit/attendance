import React, { useEffect,useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Attendancecolumns, columns, userRows } from "../../utils/api";
import "./datatable.scss";
import { axiosInstance } from "../../config";

const DataTable = ({inputData}) => {


  const [employee, setemployee] = useState([]);
  const [del, setdel] = useState(false)

let filteredemployee;




 if(inputData){
   filteredemployee = employee?.filter(
    (e) =>
      e?.EmployeeName?.toLowerCase()?.includes(inputData?.toLowerCase()) ||
      e?.PAN?.toLowerCase()?.includes(inputData?.toLowerCase()) ||
      e?.MobileNumber?.toString().includes(inputData?.toString()) || 
      e?.AadharID?.toString().includes(inputData?.toString())
  );
 }else{
  filteredemployee = employee;
 }

  
   
  


  useEffect(() => {
    getemployee();
  }, [!del]);

  const getemployee = async () => {
    try {
      const { data } = await axiosInstance.get("/api/employee");

      setemployee(data.data);
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  };

  // console.log("jhgf",employee);

  return (
    <div className="userTable">
      <DataGrid
        rows={filteredemployee}
        key={employee._id}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

// export default DataTable;



const AttendanceDataTable = ({inputData}) => {
  const [employee, setemployee] = useState([]);
  const [del, setdel] = useState(false)
  let filteredemployee;

 
  const getemployee = async () => {
    try {
      const { data } = await axiosInstance.get("/api/employee");
      setemployee(data.data);
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  };

  console.log("jhgf",employee);





   if(inputData){
     filteredemployee = employee?.filter(
      (e) =>
        e?.EmployeeName?.toLowerCase()?.includes(inputData?.toLowerCase()) ||
        e?.PAN?.toLowerCase()?.includes(inputData?.toLowerCase()) ||
        e?.MobileNumber?.toString().includes(inputData?.toString()) || 
        e?.AadharID?.toString().includes(inputData?.toString())
    );
   }else{
    filteredemployee = employee;
   }

   useEffect(() => {
    getemployee();
  }, [!del]);

  return (
    <div className="userTable">
      <DataGrid
        rows={filteredemployee}
        key={filteredemployee._id}
        columns={Attendancecolumns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

 export {AttendanceDataTable,DataTable};
