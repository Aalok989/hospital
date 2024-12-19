import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({
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
        minLength:[10,"phone number must contain exact 11 character!"],
        maxLength:[10,"phone number must contain exact 11 character!"],
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"massage should contian minmum teen character!"],
    },
});
export const Message=mongoose.model("Message",messageSchema);
