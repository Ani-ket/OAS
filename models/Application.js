const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var ApplicationSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
   regno:{
        type:Number,
        required:true,
        maxlength:32,
        
    },
    rollno:{
        type:Number,
        required:true,
        maxlength:32,
        
    },
    
    sem:{
        type:String
        
    },
  
    payment:{
        type:ObjectId,
        ref:"Payment"
    },
    branch:{
        type:String
        
    }

},{timestamps:true});

module.exports=mongoose.model("Application",ApplicationSchema);