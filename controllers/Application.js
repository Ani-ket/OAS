const fs=require("fs");
const { updatestatus, addapplication, updatestatusbyappid, setisnew } = require("./user");
const Application = require("../models/Application");


exports.getApplicationById=(req,res,next,id)=>{
    if(id==undefined) return res.status(401).json({err:"id invalid"})
    Application.findById(id).exec((err,application)=>{
        if(err){
            return res.status(400).json({
                error:"Application not found"
                
            })
        }
        req.Application=application;
        next();
    })

}
exports.getapplicationcount=(req,res)=>{
    Application.countDocuments((err,count)=>{
        if(err){
           return res.status(400).json({err:"some error occures"})
        }
       res.status(200).json(count)
    })
}

exports.getapplication=(req,res)=>{
    
    res.json(req.Application);
}





exports.addopaymentinfo=(id,P_id)=>{
    NewApplication.findByIdAndUpdate(id,{payment:P_id},(err,result)=>{
        if(err)
        return json({err:"Adding payment info to application failed"})    })
}


exports.getApplication=(req,res)=>{
  
   return res.json(req.Application) ; 
 }







exports.createApplication=(req,res)=>{

const{name,regno,rollno,branch,sem}=req.body;

if(!name ||!rollno||!regno||!branch||!sem){
    return res.status(400).json({
        error:req.body
        
    })
}
    
    let application=new Application(req.body);


    application.save((err,application)=>{
        if(err){
         
           return res.status(400).json({
                error:"not saved"
                
            })
        }
        res.json(application);

        addapplication(req.profile._id,application._id);
        updatestatus(req.profile._id,3);
        setisnew(req.profile._id,false);
       })
 }




exports.deleteApplication=(req,res)=>{
    let Application=req.Application;
    Application.remove((err,deletedApplication)=>{
        if(err){
            return res.json({err:"Failed to delete"})
        }
        res.json({
            message:" successfully deleted",
            deletedApplication
        })
        updatestatus(req.profile._id,-1);
    })

}



exports.getAllApplication=(req,res)=>{
    let lmt=req.query.limit? parseInt(req.query.limit):20
    let sortBy=req.query.sortBy ?req.query.sortBy:"_id";
    Application.find()
    .select("-photo -marksheet -scorecard")
    .limit(lmt)
    .populate("userid")
    .sort([[sortBy,"asc"]])
    .exec((err,applications)=>{
        if(err){
            return res.status(400).json({
                error:"No Application found"
            })
        }
        res.json(applications);
    })
}

