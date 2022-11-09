const router = require("express").Router();
const {getAllEmployee,postEmployee,putEmployee,deleteEmployee,employeeDetails, updateActvity, getAllActivitEmployee, getMaleFemale, showallEmployeeSalary, getAllEmployeeByid} = require("../controller/employeeController")
const upload = require("../util/imageUploader");




router.get('/',getAllEmployee)
router.get('/activity',getAllActivitEmployee)
router.post('/',upload.single("employeeimg"),postEmployee)
router.put('/:id',putEmployee)
router.delete('/:id',deleteEmployee)
router.get('/:id',employeeDetails)
router.get('/a/showallEmployeeSalary',showallEmployeeSalary)
router.put('/activity/:id',updateActvity)
// router.get('/getAllEmployeeByid',getAllEmployeeByid)


module.exports = router



