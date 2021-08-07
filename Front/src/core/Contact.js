import React,{useState} from 'react';
import { ToastContainer,toast } from 'react-toastify';
import Base from "../core/Base"
import axios from "axios"
import contactimg from '../assets/contact.svg'
export default function Contact() {
    const [form, setForm] = useState({
    name:"",
    email:"",
    body:"",
    error:""
   
});
//destructuring form from useStaes
const{name,email,body}=form; 
//method for handling input in form

 const handlechange=name=>event=>{
     setForm({...form,error:false,[name]:event.target.value})
 }

 onsubmit=event=>{
  event.preventDefault();
  setForm({...form,error:false})
 
  axios.post('/api/contact',{name,email,body})
  .then((data)=>{
            
             setForm({...form,name:"",
             email:"",
             body:"",
             error:""})
             toast.success("Message Sent")
      
  }).catch((err)=>{setForm({...form,error:err.response.data.error,name:"",
  email:"",
  body:""})
  toast.error("some error")
})
}
  return (
    <Base title="Contact Us" >
      <ToastContainer/>
      <img src={contactimg} className='img-fluid' />
      <div className="row d-flex align-items-center py-5">
      <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 text-center">
      
        <h1> Welcome to <strong className="text-primary"> E-Admission</strong>   </h1>
        <h2> Here you can take admission online</h2>
        <h2>If you have any query you can contact us on </h2>
        <h2 className="text-primary">support@eadmission.com</h2>
      
        
      </div>
      <div className="col-lg-6 order-1 order-lg-2 h">
      <form>
         <div className="form-group">
                    <label className="text-info">Name</label>
                    <input className="form-control" type="text" onChange={handlechange("name")} value={name} />
                </div>
                <div className="form-group">
                    <label className="text-info">Email</label>
                    <input className="form-control" type="email" onChange={handlechange("email")} value={email} />
                </div>
                <div className="form-group">
                    <label className="text-info">Message</label>
                    <input className="form-control" type="text" onChange={handlechange("body")} value={body}/>
                </div>
                <button type="submit" onClick={onsubmit} className="btn btn-primary btn-block">Send</button>
         </form>
      </div>
      </div>
    </Base>
  );
}
