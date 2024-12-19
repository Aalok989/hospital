import { now } from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import{ generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary";
export const patientRegister=catchAsyncErrors(async (req,res,next)=>{
    const{firstName,lastName,email,phone,password,gender,dob,nic,role}=req.body;
    if(!firstName||!lastName||!email||!phone||!password||!gender||!dob||!nic||!role){
        return next(new ErrorHandler("please fill Full form completly",400));
    }
    let user=await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Registered",400));
    }
    user=await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role});
    generateToken(user,"user created Successfully",200,res);
    // res.status(200).json({
    //     success:true,
    //     message:"user created Succesfully !"
    // });
});

export const login=catchAsyncErrors(async (req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("please provide all details",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("password is not matched with confirm password!",400));
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid password or Email",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid password or emial",400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("user with this role not found",400));
    }
    // res.status(200).json({
    //     success:true,
    //     message:"user Logged In Successfully!",
    // });
    generateToken(user,"user Login Successfully",200,res);
});

export const addNewAdmin=catchAsyncErrors(async (req,res,next)=>{

    const{firstName,lastName,email,phone,password,gender,dob,nic}=req.body;

    if(!firstName||!lastName||!email||!phone||!password||!gender||!dob||!nic){
        return next(new ErrorHandler("please fill Full form completly",400));
    }

    const isRegistered=await User.findOne({email});
    if(isRegistered){
       return next(new ErrorHandler(`${isRegistered.role} with this email is already exist`,400));
    }
    const admin =await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role:"Admin"});
    res.status(200).json({
        success:true,
        message:"New Admin Registered"
    })
});
export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors= await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,
    });
}) 
export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;// req.user is come from ispatientauth function and isadminauth function from auth.js
    res.status(200).json({
        success:true,
        user,
    });
});
export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"User Logout Successfully"
    });
});
export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"User Logout Successfully"
    });
}); 
 export const addNewDoctor=catchAsyncErrors(async (req,res,next)=>{
    if(!req.files || Object.keys(req.files).length==0){
        return next(new ErrorHandler("Doctor Avatar Required!",400));
    }
    const {docAvatar}=req.files;
    const allowedFormate=["image/png","image/jpeg","image/webp"];
    if(!allowedFormate.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("file formate is not supported",400));
    }
    const{firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment}=req.body;
    if(!firstName||!lastName||!email||!phone||!password||!gender||!dob||!nic ||!doctorDepartment){
        return next(new ErrorHandler("please fill Full Details",400));
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`,400));
    };
    const cloudinaryResponse= await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:",cloudinaryResponse.error || "unknown Cloundinary Error");
    }
    // if we want the value of cloudniaryResponse give then we can do console.log(cloudniaryResponse)
    const doctor=await User.create({firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment,role:"Doctor",
        docAvatar:{public_id:cloudinaryResponse.public_id,url:cloudinaryResponse.secure_url},});
    res.status(200).json({
        success:true,
        message:"New Doctor Resister",
        doctor
    })
 });
