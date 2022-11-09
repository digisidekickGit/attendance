const jwt = require("jsonwebtoken")
const userSchema = require("../modal/user");
const {handleError} = require("../util/Errorhandler")



const userRegistration = async(req,res,next) =>{
    try {
        const checkUser = await userSchema.findOne({Email:req.body.Email})

        if(checkUser){
            next(handleError(500,"Email Already Exist"))
        }else{
            const user = await userSchema.create(req.body);
            if(user){
                const token = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },process.env.JWT_SECRET_KEY,{expiresIn:"3d"})
    
                return res.status(200).json({success:true,token})   
            }
            next(handleError(500,"User Not Created"))
        }

    } catch (error) {
        next(error)        
    }
}



const userLogin = async(req,res,next)=>{
    try {
        const user = await userSchema.findOne({Email:req.body.Email})
        if(user){
            if(user.Password === req.body.Password){
                const token = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },process.env.JWT_SECRET_KEY,{expiresIn:"3d"})
                return res.status(200).json({success:true,token})
            }
            else{
                next(handleError(500,"PassWord Not Match"))
            }
        }
        else{
            next(handleError(500,"User Not Exist"))
        }

    } catch (error) {
        next(error)
    }
}




const userProfile = async(req,res,next) =>{
    try {
        const user = await userSchema.findById(req.user.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


module.exports = {userRegistration,userLogin,userProfile}
