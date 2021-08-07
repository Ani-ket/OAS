const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var newApplicationSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    fname:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    mname:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
  percentage:{
        type:Number,
        required:true,
        maxlength:32,
        
    },
    mark:{
        type:Number,
        required:true,
        maxlength:32,
        
    },
    p1:{
        type:String,
        trim:true,
       },
       p2:{
        type:String,
        trim:true,
       },
       p3:{
        type:String,
        trim:true,
       },
    
    photo:{
        data:Buffer,
        contentType:String
    },
    marksheet:{
        data:Buffer,
        contentType:String
    },
    scorecard:{
        data:Buffer,
        contentType:String
    },
   
   //NOTE userid removed
    payment:{
        type:ObjectId,
        ref:"Payment"
    },
    branch:{
        type:String
        
    },
    remark:{
        type:String,

    }

},{timestamps:true});

module.exports=mongoose.model("NewApplication",newApplicationSchema);