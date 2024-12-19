import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"User First Name Is Required"],
        minLength:[3,"first name should be atleast three character!"],
    },
    lastName:{
        type:String,
        required:[true,"User Last Name is Required"],
        minLength:[3,"last name should be atleast three character!"],
    },
    email:{
        type:String,
        required:[true,"User Email is required"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email!",
        },
    },
    phone:{
        type:String,
        required:[true,"User Phone Number is required"],
        minLength:[10,"phone number must contain exact 10 character!"],
        maxLength:[10,"phone number must contain exact 10 character!"],
    },
    nic:{
        type:String,
        required:[true,"User NIC is required"],
        minLength:[13,"Nic number must contain exact 13 character!"],
        maxLength:[13,"Nic number must contain exact 13 character!"],
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        type:String,
        required:[true,"User Gender is Required"],
        enum:["male","female","LGBTQ"]
        // enum is the values that is accepted by gender filed so enum is used for accepting only certain value
    },
    password:{
        type:String,
        required:[true, "Password Is Required!"],
        minLength:[8,"password must contain atleast eight character !"],
        select:false
    },
    role:{
        type:String,
        required:[true,"User Role Required!"],
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String,
        
    },
    docAvatar:{
        public_id:String, 
        url:String
    },
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});
// in this userschema.method is equal to user where user is get like this const user= await User(schema).findOne(method)({email:"xyz@gmail.com"})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    });
};
export const User=mongoose.model("User",userSchema);