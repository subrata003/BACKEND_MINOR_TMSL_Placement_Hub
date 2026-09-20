import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true,
        enum:["admin","student"]
    },
    
     
    
    
},{timestamp:true})

const userModal=mongoose.model("user",userSchema);
export default userModal;