const { json } = require('express');
const user = require('../models/user');
const { findByIdAndUpdate } = require('../models/user');
const User=require('../models/user')


exports.getUserById=(req,res,next,id)=>{
User.findById(id).exec((err,user)=>{
    if( !user){
        return res.status(400).json({error: "User not found"})
    }
    if(err){
        return res.status(400).json({error: "Error, Try Again"})
    }
    req.profile=user;
    next();
})
}
exports.getstudentscount=(req,res)=>{
    User.where({role:0}).countDocuments((err,count)=>{
        if(err){
           return res.status(400).json({err:"some error occures"})
        }
       res.status(200).json(count)
    })
    
}
exports.getadmincount=(req,res)=>{
    User.where({role:1}).countDocuments((err,count)=>{
        if(err){
           return res.status(400).json({err:"some error occures"})
        }
       res.status(200).json(count)
    })
    
}

exports.updatestatusbyappid=(appid,status)=>{
    User.findOneAndUpdate({application:appid},{status:status},(err,user)=>{
        if(err){
            return json({err:"Updation failed"})
        }
    })
    }
exports.getUser=(req,res)=>{
    req.profile.en_password=undefined;
    res.json(req.profile);
}
exports.getUserStatus=(req,res)=>{
    
    res.json({status:req.profile.status});
}
exports.userisnew=(req,res)=>{
    
    res.json(req.profile.isnew);
}
exports.userapp=(req,res)=>{
    
    res.json(req.profile.application);
}

exports.getUserName=(req,res)=>{
    
    res.json({name:req.profile.name});
}


exports.updatestatus=(id,status)=>{
    User.findByIdAndUpdate(id,{status:status},(err,result)=>{
        if(err)
        return json({err:"updation failed"})    })
}
exports.setisnew=(id,val)=>{
    User.findByIdAndUpdate(id,{isnew:val},(err,result)=>{
        if(err)
        return json({err:"updation failed"})    })
}
exports.addapplication=(userid,appId)=>{
    User.findByIdAndUpdate(userid,{application:appId},(err,result)=>{
        if(err)
        return json({err:"updation failed"})    })
}


exports.deleteUser=(req,res)=>{
    const{uid}=req.query;
    User.findByIdAndRemove(uid,{useFindAndModify:false},(err,deleteduser)=>{
        if(err){
            return res.json({err:"Failed to delete"})
        }
        res.json({
            message:" successfully deleted",
            deleteduser
        })
    })

}


    
exports.getAlluser=(req,res)=>{
    let lmt=req.query.limit? parseInt(req.query.limit):20
    let sortBy=req.query.sortBy ?req.query.sortBy:"_id";
    let role=req.query.role?req.query.role:0;
    User.find()
    .limit(lmt)
    .where('role').equals(role)
   .sort([[sortBy,"asc"]])
    .exec((err,users)=>{
        if(err){
            return res.status(400).json({
                err:"No User found"
            })
        }
        res.json(users);
    })
}