
const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;

var userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    en_password:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:-1
    },
    isnew:{
        type:Boolean
    },
    application:{
        type:ObjectId,
        ref:"NewApplication"
    }
}, {timestamps:true} );


module.exports=mongoose.model("User",userSchema)