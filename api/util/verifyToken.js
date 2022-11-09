const jwt = require("jsonwebtoken");
const {handleError} = require("../util/Errorhandler")

const verifyToken = (req,res,next) =>{
    
    console.log(req.body);
        const authToken = req.body.token
        // const authToken = req.headers.token
        // console.log("auth",auth);
        if(authToken){
            jwt.verify(authToken,process.env.JWT_SECRET_KEY,(err,user)=>{
                if(err){
                    next(err)
                }
                // console.log("req.user",req)
                req.user = user;
                // console.log("req.user",req.user)
                next();
            })
        }
        else{
            next(handleError(403,"You have not permission"))

        }
}



const verifyTokenAndAdmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(handleError(403, "you are not allowded to do that!"));
        }
    })
}



const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(handleError(403, "you are not allowded to do that!"));
            // res.status(403).json("you are not allowded to do that")
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}