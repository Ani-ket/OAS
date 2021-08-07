const Joi=require("joi")

const signupvalidation =(data)=>{
    const schema={
        name:Joi.string().min(2).required(),
        email:Joi.string().min(6).required().email,
        password:Joi.string().insensitive(8).required
    };
   return Joi.Validate(data,schema)
}


const signinvalidation =(data)=>{
    const schema={
       
        email:Joi.string().min(6).required().email,
        password:Joi.string().insensitive(8).required
    };
   return Joi.Validate(data,schema)
}

module.exports.signupvalidation=signupvalidation;
module.exports.signinvalidation=signinvalidation;