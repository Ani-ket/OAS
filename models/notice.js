const mongoose=require('mongoose')
var noticeSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    body:{
        type:String,
        trim:true
    },
    attachment:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true});

module.exports=mongoose.model("Notice",noticeSchema);