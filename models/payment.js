const mongoose=require("mongoose")


var paymentSchema= new mongoose.Schema({
    orderId:{
        type:String,
        trim:true
    },
    rzPaymentId:{
        type:String,
        trim:true
    },
    rzOrderId:{
        type:String,
        trim:true
    },
    rzSignature:{
        type:String,
        trim:true
    },
    
   
  
}, {timestamps:true} );


module.exports=mongoose.model("Payment",paymentSchema)