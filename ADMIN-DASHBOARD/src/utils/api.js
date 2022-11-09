import { useState } from "react";
import { Link } from "react-router-dom";

const submitReport =(id)=>{
  console.log(id);
 
}
 export const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];



  export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  

  export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      phone: 1564852368,
      Address:" 35-b, Govt. Indl Estate, Charkop, Kandivali (west)",
      Country: "India",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      phone: 1564852368,
      status: "passive",
      Address:"Opp Orkay Silk Mills,saki Naka,saki, Andheri",
      Country: "India",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      phone: 1564852368,
      Address:"64/2, H Siddaiah Road",
      Country: "India",
      status: "pending",
      age: 45,

    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      phone: 1564852368,
      status: "active",
      Address:"B-18, A, Hind Saurashtra Indl Est, M V Road",
      Country: "India",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      phone: 1564852368,
      status: "passive",
      Address:"11 avenues nup gor city 2",
      Country: "India",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      phone: 1564852368,
      Address:"8-2-293, Kamalapuri Colony",
      Country: "India",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      phone: 1564852368,
      Address:"Shahpurjat, Asian Game Vill",
      Country: "India",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      phone: 1564852368,
      Address:" Opp Rly Station, Ghatkoper (east)",
      Country: "India",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      phone: 1564852368,
      Address:"11 avenues nup gor city 2",
      Country: "India",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      phone: 1564852368,
      Address:"A, Hind Saurashtra Indl Est, M V Road, Marol Naka, Andheri (e)",
      Country: "India",
      status: "active",
      age: 65,
    },
  ];


 export const columns = [
    // { field: "_id", headerName: "_id", width: 110, type: "number" },
    {
      field: "EmployeeName",
      headerName: "Name",
      type: "string",
      width: 100,
    },
    {
      field: "",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`http://attendance.newswise.in/images/Employee/${params.row.Image}`} alt="avatar" />
            {params.Image}
          </div>
        );
      },
    },
   
    {
      field: "Email",
      headerName: "Email",
      width: 180,
    },
    
    {
      field: "MobileNumber",
      headerName: "Number",
      // type: "number",
      width: 150,
    },
    {
      field: "ModeOfPayment",
      headerName: "Payment Mode",
      width: 100,
    },
    {
      field: "EmployeeActivity",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <p className={`userStatus ${params.row.EmployeeActivity} `}> {params.row.EmployeeActivity}</p>
        );
      },
    },
    {
        field: "action",
        headerName: "Action",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="Action-button">
                <Link to={`user/${params.row._id}`}>
                <div className=" button Action-button-view">View</div>
                </Link>
                <div className=" button Action-button-delete"> Delete</div>
            </div>
          );
        },
      },
  ];




  export const Attendancecolumns = [
    // { field: "_id", headerName: "_id", width: 110, type: "number" },
    {
      field: "",
      headerName: "Avatar",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`http://attendance.newswise.in/images/Employee/${params.row.Image}`} alt="avatar" />
            {params.Image}
          </div>
        );
      },
    },
    {
      field: "EmployeeName",
      headerName: "Name",
      type: "string",
      width: 150,
    },
    {
      field: "EmployeeCategory",
      headerName: "Employee Type",
      type: "string",
      width: 150,
    },
    // {
    //   field: "Email", //type of field
    //   headerName: "1", // name of field nm any name
    //   width: 230, 
    // },
    
    {
      field: "DOJ",
      headerName: "Date Of Joining",
      // type: "number",
      width: 150,
    },
    {
      field: "ModeOfPayment",
      headerName: "Payment Mode",
      width: 150,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
          
            
    //       params.row.status === "Activate"  ? <div className="button Action-button-view"> {params.row.status}</div> : <div  className="button Action-button-delete"> {params.row.status}</div>
          
    //     )
    //   },
    // },
    {
        field: "action",
        headerName: "User Report",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="Action-button">
                {/* <Link to={`user/${params.row._id}`}>
                <div className=" button Action-button-view">View</div>
                </Link> */}
                <Link to={`user/${params.row._id}`}>
                <div className=" button Action-button-view" onClick={()=>submitReport(params.row._id)}> View Report</div>
                </Link>
            </div>
          );
        },
      },
  ];

















  ////////////////////////////////////////////////////
 



  /////////////////





  