const NewApplication=require("../models/newApplication");
const fm=require("formidable");
const _=require("lodash");
const fs=require("fs");
const { updatestatus, addapplication, updatestatusbyappid, setisnew } = require("./user");
const newApplication = require("../models/newApplication");


exports.getnewApplicationById=(req,res,next,id)=>{
    if(id==undefined) return res.status(401).json({err:"id invalid"})
    NewApplication.findById(id).exec((err,newapplication)=>{
        if(err){
            return res.status(400).json({
                error:"Application not found"
                
            })
        }
        req.NewApplication=newapplication;
        next();
    })

}
exports.getapplicationcount=(req,res)=>{
    NewApplication.countDocuments((err,count)=>{
        if(err){
           return res.status(400).json({err:"some error occures"})
        }
       res.status(200).json(count)
    })
}

exports.getapplication=(req,res)=>{
    
    res.json(req.NewApplication);
}
exports.getnewApplicationByuser=(req,res)=>{
    NewApplication.find({userid:req.profile._id})
     .exec((err,newapplication)=>{
         if(err){
             return res.status(400).json({
                 error:"application not found"
                 
             })
         }
      
         res.status(200).json(newapplication);
         
     })
 
 }
exports.updateAstatus=(req,res)=>{
    const{status,remark,branch}=req.body;

  if(remark!=''){
    NewApplication.findByIdAndUpdate(req.NewApplication._id,{remark:remark,branch:branch},(err,result)=>{
        if(err)
        res.status(400).json({err:"updation failed"}) 
        res.json(result)

        if(status)
        updatestatusbyappid(req.NewApplication._id,status)
       

       })
    }
    else{
        NewApplication.findByIdAndUpdate(req.NewApplication._id,{branch:branch},(err,result)=>{
            if(err)
            res.status(400).json({err:"updation failed"}) 
            res.json(result)
    
            if(status)
            updatestatusbyappid(req.NewApplication._id,status)
           
    
           })
    }
}


exports.addpaymentinfo=(id,P_id)=>{
    NewApplication.findByIdAndUpdate(id,{payment:P_id},(err,result)=>{
        if(err)
        return json({err:"Adding payment info to application failed"})    })
}

// exports.getApplication=(req,res)=>{
   
//     res.json(req.NewApplication)
// }
exports.getApplication=(req,res)=>{
    req.NewApplication.photo=undefined;
    req.NewApplication.marksheet=undefined;
    req.NewApplication.scorecard=undefined;
 
   return res.json(req.NewApplication) ; 
 }
exports.photo=(req,res,next)=>{
    if(req.NewApplication.photo.data){
       
        res.set('content-type',req.NewApplication.photo.contentType);
      

        return res.send(req.NewApplication.photo.data);
    }
    next();
}
exports.marksheet=(req,res,next)=>{
    if(req.NewApplication.marksheet.data){
       
        res.set('content-type',req.NewApplication.marksheet.contentType);
      

        return res.send(req.NewApplication.marksheet.data);
    }
    next();
}
exports.scorecard=(req,res,next)=>{
    if(req.NewApplication.scorecard.data){
       
        res.set('content-type',req.NewApplication.scorecard.contentType);
      

        return res.send(req.NewApplication.scorecard.data);
    }
    next();
}




exports.createNewApplication=(req,res)=>{
let form=new fm.IncomingForm();
form.keepExtensions=true;
form.multiples=true;
form.parse(req,(err,fields,files)=>{
    if(err){
        return res.status(400).json({
            error:"file issue"
        })
    }
// destruct
const{name,fname,mname,p1,p2,p3,percentage,mark}=fields;
if(!name ||!fname||!mname||!mark||!percentage ||!p1 ||!p2 ||!p3){
    return res.status(400).json({
        error:"Include all fields"
    })
}
    //field handling
    let application=new NewApplication(fields)
    //file handling
    if(files.photo){
        if(files.photo.size>3000000){
            return res.status(400).json({
                error:"big file"
            })
        }
        application.photo.data=fs.readFileSync(files.photo.path)
        application.photo.contentType=files.photo.type;
     
       
    }
    if(files.scorecard){
        if(files.scorecard.size>3000000){
            return res.status(400).json({
                error:"big file"
            })
        }
        application.scorecard.data=fs.readFileSync(files.scorecard.path)
        application.scorecard.contentType=files.scorecard.contentType;
    }
    if(files.marksheet){
        if(files.marksheet.size>3000000){
            return res.status(400).json({
                error:"big file"
            })
        }
        application.marksheet.data=fs.readFileSync(files.marksheet.path)
        application.marksheet.contentType=files.marksheet.contentType;
    }

    application.save((err,application)=>{
        if(err){
           
            res.status(400).json({
                error:"not saved"
                
            })
        }
        res.json(application._id);

        //NOTE 
        addapplication(req.profile._id,application._id)
        updatestatus(req.profile._id,0);
        setisnew(req.profile._id,true);
        
    })
});

}




exports.deleteNewApplication=(req,res)=>{
    let NewApplication=req.NewApplication;
    NewApplication.remove((err,deletedApplication)=>{
        if(err){
            return res.json({err:"Failed to delete"})
        }
       
        res.json({
            message:" successfully deleted",
            deletedApplication
        })
        //
        updatestatusbyappid(req.NewApplication._id,-1);
    })

}



exports.getAllApplication=(req,res)=>{
    let lmt=req.query.limit? parseInt(req.query.limit):20
    let sortBy=req.query.sortBy ?req.query.sortBy:"_id";
    NewApplication.find()
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

