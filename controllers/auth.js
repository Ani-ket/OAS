const User=require("../models/user")
const {validationResult}=require('express-validator')
var jwt=require('jsonwebtoken')
var ejwt=require('express-jwt')
require('dotenv').config()
const bcrypt=require("bcryptjs")
const { OAuth2Client } = require("google-auth-library")


exports.signup=async (req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
            error_pos:errors.array()[0].param
        });
  }
  const emailexist=await User.findOne({email:req.body.email});
  if(emailexist) return res.status(400).json({error:"Email already exist"});

  const salt=await bcrypt.genSalt();
  const hashPW=await bcrypt.hash(req.body.password,salt);
    
    const user=new User({name:req.body.name,
    email:req.body.email,
    en_password:hashPW})

   await user.save((err,user)=>{
        if(err){
           
            return res.status(400).json({
                error:"Problem in signup"
            })
        }
     
        const token=jwt.sign({_id:user._id},process.env.SECRET);
       const{_id,name,email,role,status,application,isnew}=user;
       return res.json({token,user:{_id,name,email,role,status,application,isnew}})
    })
}

//signin method
exports.signin= async (req,res)=>{
    const{email,password}=req.body;
    const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
        error:errors.array()[0].msg,
        errorpos:errors.array()[0].param
    });
   }
   
   await User.findOne({email}).exec((err,user)=>{
       if(err || !user){
          
           return res.status(400).json({error:"email not found"})
       }
      
      
        bcrypt.compare(password,user.en_password).then(result=>{
            if(result==false){
                return res.status(400).json({error:"password incorrect"})
            }else{
                const token=jwt.sign({_id:user._id},process.env.SECRET);
             //res.cookie("token",token,{expire:new Date()+1})

           const{_id,name,email,role,status,application,isnew}=user;
            return res.json({token,user:{_id,name,email,role,status,application,isnew}})

            }
        })
         })

}
//signout
exports.signout=(req,res)=>{
//res.clearcookies("token");
res.json({
    message:"sign out sucessfull"
})
}


// exports.isSignedIn=ejwt({
//     secret:process.env.SECRET,
//     userProperty:"auth",
//     algorithms: ['sha256','HMAC']
    

// });

exports.isSignedIn=(req,res,next)=>{
    if(req.headers.authorization){
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1];

    
    
   if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
     
      if (err) return res.sendStatus(403)
      req.auth = user
      next()
    })
   }
   else if(req.query && req.query.token){
       const token=req.query.token;
       if (token == null) return res.sendStatus(401)
  
       jwt.verify(token, process.env.SECRET, (err, user) => {
        
         if (err) return res.sendStatus(403)
         req.auth = user
         next()
       })

   }
}
exports.isAuthenticated=(req,res,next)=>{
    let checker= req.profile && req.auth && req.profile._id==req.auth._id;
     if(!checker){
        return res.status(403).json({
                error: "ACCESS DENIED"
        });
    }
   
    next();
};

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role == 0){
        return res.status(403).json({
            error:"Admin priviledge required"
        });
    }
next();
};

const client= new OAuth2Client(process.env.CLIENT_ID)
exports.googlelogin=async(req,res)=>{
const {idToken}=req.body;
console.log("REQ=",req.body)
 client.verifyIdToken({idToken,audience:process.env.CLIENT_ID})
.then( resp=>{
    const { email_verified, name, email } = resp.payload;
    if(email_verified){
        User.findOne({email}).exec((err,user)=>{
            if(err ){
               
                return res.status(400).json({error:"Error"})
            }
           if(user){
            const token=jwt.sign({_id:user._id},process.env.SECRET);
           const{_id,name,email,role,status,application,isnew}=user;
            return res.json({token,user:{_id,name,email,role,status,application,isnew}})
           }else{
               //creating user
               const password=email+process.env.SECRET;
            //    const salt= bcrypt.genSalt();
            //    const hashPW= bcrypt.hash(password,salt);
    
        const user=new User({
        name:name,
       email:email,
       en_password:password})

   user.save((err,user)=>{
        if(err){
           
            return res.status(400).json({
                error:"There is some problem"
            })
        }
    
            const token=jwt.sign({_id:user._id},process.env.SECRET);
           const{_id,name,email,role,status,application,isnew}=user;
            return res.json({token,user:{_id,name,email,role,status,application,isnew}})
           
     
         
    })
           }
            
     
           
           
             })
              
     
    }
}).catch()
}