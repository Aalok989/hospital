import mongoose from "mongoose";
import validator from "validator";
const appointmentSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"first name should be atleast three character!"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"last name should be atleast three character!"],
    },
    email:{
        type:String,
        required:true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email!",
        },
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"phone number must contain exact 10 character!"],
        maxLength:[10,"phone number must contain exact 10 character!"],
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"Nic number must contain exact 13 character!"],
        maxLength:[13,"Nic number must contain exact 13 character!"],
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","LGBTQ"]
        // enum is the values that is accepted by gender filed so enum is used for accepting only certain value
    },
   
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    doctor:{
        firstName:{
            type:String,
             required:true,
        },
        lastName:{
            type:String,
            required:true,
        }
    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    // docterId:{
    //     type:mongoose.Schema.ObjectId,
    //     required:true,
    // },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    },
});
export const Appointment=mongoose.model("Appointment",appointmentSchema);