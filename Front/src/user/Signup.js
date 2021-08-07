import React ,{useState} from 'react';
import Base from "../core/Base";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../auth';
import authimg from '../assets/authentication.svg'

export default function Signup() {
    //useState for managing form
const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
});
//destructuring form from useStates
const{name,email,password,error,success}=form; 
const {data}=isAuthenticated();
//method for handling input in form

 const handlechange=name=>event=>{
     setForm({...form,error:false,[name]:event.target.value})
 }
onsubmit=event=>{
    event.preventDefault();

    if(name && email && password){
        const userdata={
            name:name,
            email:email,
            password:password
        };
        axios.post('/api/signup',userdata)
        .then((data)=>{
            authenticate(data);
             setForm({...form,name:"",email:"",password:"",error:"",success:true}) 
        toast.success("Signup Sucessfully")    
    }).catch(err=>{
        
        setForm({...form,error:err.response.data.error,success:false}) 
                toast.error(err.response.data.error);
    } )
    }
    else{
        toast.error("Please fill all the field")
    }

}
const performRedirect=()=>{
    if(success){
        if(data.user && data.user.role===1){
       return <Redirect to="/adminpanel"/>
        }else if(data.user && data.user.role === 0){
            return <Redirect to="/dashboard"/>
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }
    };   

//form start
    const Form=()=>{
        return(
           
 <div className="row d-flex align-items-center">
     <ToastContainer />
     <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 text-center bg-light p-5 rounded">
        
        <div><h2>Sign Up</h2></div>
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
                    <label className="text-info">Password</label>
                    <input className="form-control" type="password" onChange={handlechange("password")} value={password}/>
                </div>
                <button onClick={onsubmit} className="btn btn-success btn-block">SignUp</button>
                <Link to='/signin' className="btn btn-primary btn-block">Already have account or Signin with Google</Link>
         </form>
     </div>
     <div className="col-lg-6 order-1 order-lg-2 header-img py-5">
         <img src={authimg} alt='Signin' className='img-fluid' />
     </div>
 </div>

        )
    }
    //form end
    const successMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left"> 
        <div className="alert alert-success" style={{display : success ? "" : "none"}} >
         New account created successfully. <Link to="/signin">LogIn</Link> 
        </div>
        </div>
        </div>
        );
    }
    const errorMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left"> 
        <div className="alert alert-danger" style={{display : error ? "" : "none"}} >
         Sign Up failed. <Link to="/signup">Try Again</Link> 
         {error}
        </div>
        </div>
        </div>
        );
    }
  return (
     <div>
    <Base title="" >
        {successMessage()}
        {errorMessage()}
        {performRedirect()}
    {Form()}
    </Base>
    </div>
  );
  }