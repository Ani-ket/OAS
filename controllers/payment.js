require("dotenv").config();
const Razorpay = require("razorpay");
const crypto=require("crypto");
const Payment = require("../models/payment");
const { addpaymentinfo, updateAstatus, updatepstatus } = require("./newApplication");

const { updatestatus } = require("./user");
const { addopaymentinfo } = require("./Application");




exports.payment=async(req,res)=>{
    
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: 50000, 
            currency: "INR",
            
            
        };

        const order = await instance.orders.create(options);
          

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    
}

exports.paymentsuccess=async(req,res)=>{
    
      
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
     
       
        const shasum = crypto.createHmac("sha256",process.env.KEY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

       
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not valid !" });
          else{
            const payment =new Payment({
                orderId:orderCreationId,
                rzPaymentId:razorpayPaymentId,
                rzOrderId:razorpayOrderId,
                rzSignature:razorpaySignature
             })
             payment.save((err,payment)=>{
                 if(err){
                     return res.status(400).json({err:"payment sucess but not saved in DataBase"})
                 }
                if(req.NewApplication)
                { 
                    addpaymentinfo(req.NewApplication._id,payment._id)
                }
                if(req.Application)
                { 
                    addopaymentinfo(req.Application._id,payment._id)
                }
               
                

                 updatestatus(req.profile._id,4)
             })
          }
       

        res.status(200).json({
            msg: "success",
            
        });
    
}