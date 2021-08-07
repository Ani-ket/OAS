const { sortBy } = require('lodash');
const Notice=require('../models/notice')
const formidable=require('formidable')
const fs=require("fs")

exports.getNoticeById=(req,res,next,id)=>{
    if(id==undefined)
    return res.status(401).json({err:"Invalid notice id"});
    Notice.findById(id).exec((err,notice)=>{
        if(err){
            return res.status(400).json({
                err:"Notice not found"
            })
        }
        req.Notice=notice;
        next();
    })
}
exports.getNoticeCount=(req,res)=>{
    Notice.countDocuments((err,count)=>{
        if(err){
            return res.status(400).json({err:err})
        }
        res.status(200).json(count)
    })
}
exports.getNotice=(req,res)=>{
    res.json(req.Notice)
}
exports.attachment=(req,res,next)=>{
if(req.Notice.attachment.data){
 res.set('content-type',req.Notice.attachment.contentType);
 return res.send(req.Notice.attachment.data)
}else{
    return res.status(400).json({err:'No attachment found !'})
}
}

exports.createNotice=(req,res)=>{
let form=new formidable.IncomingForm();
form.keepExtensions=true;
form.multiples=true;
form.parse(req,(err,fields,files)=>{
    if(err){
        return res.status(200).json({
            err:err
        })
    }

    const {title,body}=fields;
let notice=new Notice(fields)
if(files.attachment){
    if(files.attachment.size>3000000){
        return res.json({
            err:"big file size"
        })
    }
    notice.attachment.data=fs.readFileSync(files.attachment.path);
    notice.attachment.contentType=files.attachment.type;
}
notice.save((err,not)=>{
    if(err){
        return res.status(200).json({
            err:err
        })
    }
    res.json(not)
})
})

}


exports.updateNotice=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.multiples=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(200).json({
                err:err
            })
        }
    })
    const {title,body}=fields;
   Notice.findByIdAndUpdate(req.Notice._id,{
       title:title,body:body
   })
    if(files.attachment){
        if(files.attachment.size>3000000){
            return res.json({
                err:"big file size"
            })
        }
      //  notice.attachment.data=fs.readFileSync(files.attachment.path);
       // notice.attachment.contentType=files.attachment.type;
    }


    }

exports.deleteNotice=(req,res)=>{
    let N=req.Notice;
    N.remove((err,deletedNotice)=>{
        if(err){
            console.log("ERR :",err);
            return res.status(200).json({err:"Deletion failed"});
        }
        res.json({
            msg:"Notice Deleted",
            deletedNotice
        })
    })
}
exports.getAllNotice=(req,res)=>{
    Notice.find().sort([[sortBy,"asc"]]).exec((err,notices)=>{
        if(err){
            return res.status(400).json({
                err:err
            })
        }
        res.json(notices)
    })
}
