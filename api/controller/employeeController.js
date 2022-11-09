const employeeSchema = require("../modal/employee");
const { handleError } = require("../util/Errorhandler")

const attendanceSchema = require("../modal/attendanceList");

const getAllEmployee = async (req, res, next) => {
    try {
        const employee = await employeeSchema.find().sort({ _id: -1 });
        res.status(200).json({ success: true, data: employee })
    } catch (error) {
        next(error)
    }
}



const getAllActivitEmployee = async (req, res, next) => {
    try {
        const employee = await  employeeSchema.find({EmployeeActivity:"Activate"}).sort({ _id: -1 });
        res.status(200).json({ success: true, data: employee })
    } catch (error) {
        next(error)
    }
}

const postEmployee = async (req, res, next) => {
    try {
        const { employeeName,
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
            IFSCCode, FamilyDetails } = req.body


            

        const Image = req.file.filename

        const bankaccount = {
            AccountNumber,
            IfscCode: IFSCCode,
            BankName
        }


        const employeedata = {
            EmployeeName: employeeName,
            EmployeeFatherName: employeeFathername,
            EmployeeMotherName: employeeMotherName,
            Gender: employeeGender,
            DOB: employeedob,
            MaritalStatus: employeeMaritalStatus,
            SpouseName: employeeSpouseName,
            EmployeeCategory: employeecategory,
            BankAccount: bankaccount,
            Address: employeeAddress,
            MobileNumber: employeeMobNumber,
            SalaryType: employeeSalaryType,
            Amount: employeeSalary,
            Designation: employeeDesignation,
            Department: employeeDepartment,
            AadharID: employeeAdhar,
            DOJ: employeeDoj,
            PAN: employeePan,
            EPFONumber: employeeEPFONumber,
            ESICNumber: employeeESICNumber,
            UANNumber: employeeUANNumber,
            Image,
            FamilyDetails:JSON.parse(FamilyDetails),
            Email: employeeEmail,
            ModeOfPayment: employeepaymentMode
        }

        const employee = new employeeSchema(employeedata)
        await employee.save()

        // const employee = await employeeSchema.create(req.body)
        res.status(200).json({ success: true, message: "Employee Created Successfully" })
    } catch (error) {
        next(error)
    }
}

const putEmployee = async (req, res, next) => {
    try {
        const updatedEmployee = await employeeSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({ success: true, data: updatedEmployee })
    } catch (error) {
        next(error)
    }
}

const showallEmployeeSalary = async(req,res,next) =>{
    try {

        const Employee = await employeeSchema.find();
        // const attendanceSheet = await attendanceSchema.find({ AttendanceYear: "2022", AttendanceMonth: "October" })

        
const newarray = [{nn:"dd"}]
     const data =   Employee.map(
        async(s)=>
        {
            const employeelistHalfday = await attendanceSchema.find({ AttendanceYear: "2022", AttendanceMonth:"October" , HalfDayEmployeeList: { $in: [s._id] } }).count()
            const employeelistFullday = await attendanceSchema.find({ AttendanceYear: "2022", AttendanceMonth: "October", EmployeePresent: { $in: [s._id] } }).count()
            // console.log("employee",s.EmployeeName,employeelistHalfday,employeelistFullday)
            // return  employeelistHalfday,employeelistFullday,employeelistFullday;
           


            console.log("newarray",newarray);

              newarray.push({ffff:"ffffff"})
            
        }
        )
        console.log(newarray,"dd");

        // console.log(data.map(e=>e.then(e=>console.log(e))))
        // res.status(200).json({ success: true, data: data} )
    } catch (error) {
        console.log(error)
        
    }
}

const updateActvity = async (req, res, next) => {

    console.log("ee",req.body.date);
    try {
        const updatedEmployee = await employeeSchema.findByIdAndUpdate(req.params.id, {

            $set:{ EmployeeActivity : req.body.EmployeeActivity,
                NewDoJ:req.body.date
            }
            // EmployeeActivity : req.body.EmployeeActivity
        },{new:true});
        res.status(200).json({ success: true, data: updatedEmployee , message: ` Is ${updatedEmployee.EmployeeActivity}`})
    } catch (error) {
        next(error)
    }
}

const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await employeeSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: "Employee Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}

const employeeDetails = async (req, res, next) => {
    try {
        const employee = await employeeSchema.findById(req.params.id);
        res.status(200).json({ success: true, data: employee })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllEmployee,getAllActivitEmployee, postEmployee, putEmployee, deleteEmployee, employeeDetails ,updateActvity,showallEmployeeSalary}
