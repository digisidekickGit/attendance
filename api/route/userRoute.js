const router = require("express").Router();
const {userRegistration,userLogin,userProfile} = require("../controller/userController");
const {verifyToken,verifyTokenAndAdmin} = require("../util/verifyToken")

router.post("/registration",userRegistration)
router.post("/login",userLogin)
router.post("/me",verifyToken,userProfile)


module.exports = router

