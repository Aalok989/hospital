class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
// in this class the two datatype message and statuscode is came from error class and usins constructor we intalize it 
// super keyword is used for acces the datatype and function of parent class
 export const errorMiddleware=(err,req,res,next)=>{
    err.messsage=err.message || "internal server error";
    err.statusCode=err.statusCode || 500;
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message="json web token is invalid . try again";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message="json web token is expired . try again";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="CastError"){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    const errormessages=err.errors?Object.values(err.errors).map((error)=>error.message).join(" "):err.messsage;
    return res.status(err.statusCode).json({
        success:false,
        message:errormessages,
    });
 };
 export default ErrorHandler;
  