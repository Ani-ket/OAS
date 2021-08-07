const express=require("express");
const dotenv=require("dotenv");
const userRoutes=require("./routes/user")
const applicationRoutes=require("./routes/newApplication")
const paymentRoutes=require("./routes/payment")
const otherapproute=require("./routes/application")
const noticeroute=require("./routes/notice")
const mongoose=require("mongoose")
const path=require("path")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config()
const app=express();

const PORT= process.env.PORT ||8000;

mongoose.connect(process.env.M_URI,
    {useNewUrlParser: true, 
       useUnifiedTopology: true,
       useCreateIndex:true
   }).then(()=>{
       console.log("DB CONNECTED");
   }).catch(err=> console.log(err));

app.use(express.json())



app.use("/api",userRoutes);
app.use("/api",applicationRoutes)
app.use("/api/",paymentRoutes);
app.use("/api/",otherapproute);
app.use("/api/",noticeroute)

//contact form



  app.post("/api/contact",(req,res)=>{
    

    const msg = {
      to: 'nabadeept99@gmail.com',
      from: 'nabadeept11@gmail.com', // Use the email address or domain you verified above
      subject: 'Contact form',
      text: `Name:${req.body.name} MESSAGE:${req.body.body} EMAIL:${req.body.email}`,
      html: `Name:${req.body.name} <br> MESSAGE:${req.body.body} <br> EMAIL:${req.body.email}`,
    };
    //ES6
    sgMail
      .send(msg)
      .then(() => {res.status(200).json({msg:"Message sent"})}, error => {
        //console.error(error);
     
        if (error) {
          return res.status(400).json({err:"Some error occured"},error)
          
        }
        
      });
    
})




 
///////////

app.listen(PORT,()=>{
    console.log(`Backend Server is running at port :${PORT}`)
})
if(process.env.NODE_ENV==='production'){
    app.use(express.static('Front/build'))
    app.get('*/',(req,res)=>{
     res.sendFile(path.resolve(__dirname, 'Front', 'build', 'index.html'));
   })
  }