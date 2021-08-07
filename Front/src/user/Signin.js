import React,{useState} from 'react';
import Base from "../core/Base"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Redirect ,Link} from 'react-router-dom';
import { authenticate ,isAuthenticated} from '../auth';
import {GoogleLogin} from 'react-google-login'
import sgininimg from '../assets/signin.svg'
export default function Signin() {
    const [form, setForm] = useState({
        email:"",
        password:"",
        error:"",
        success:false
    })
//destructuring
const{email,password,error,success}=form;
const {data}=isAuthenticated();
//handling form
const handlechange=name=>event=>{
    setForm({...form,error:false,[name]:event.target.value})
}
onsubmit=event=>{
    event.preventDefault();
    setForm({...form,error:false})
  
    axios.post('/api/signin',{email,password})
    .then((data)=>{
               authenticate(data)
               setForm({...form,email:"",password:"",error:"",success:true})
               toast.success("hello,Welcome")
        
    }).catch((err)=>{setForm({...form,error:err.response.data.error,success:false})
    toast.error(err.response.data.error)
})
}
const googleresponse=response=>{

sendGoogleToken(response.tokenId)
}

const sendGoogleToken = tokenId => {
    axios
      .post(`/api/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        authenticate(res);
        setForm({...form,success:true})
        toast.success("Signed in sucessfully")
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
        toast.error("Sign In failed");
      });
  };
  console.log(`${process.env.HI}`)
     
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

    const SigninForm=()=>{
    return(
        <div className="row d-flex align-items-center">
              <ToastContainer/> 
             <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 text-center bg-light p-5 rounded">
                 <div><h2>Sign In</h2></div>
           <form>
                   <div className="form-group">
                    <label className="text-info">Email</label>
                    <input className="form-control" type="email" onChange={handlechange("email")} value={email} />
                </div>
                <div className="form-group">
                    <label className="text-info">Password</label>
                    <input className="form-control" type="password" onChange={handlechange("password")} value={password}/>
                </div>
                <button onClick={onsubmit} className="btn btn-success btn-block ">Sign in</button>
         </form>
         <GoogleLogin 
         clientId={'717008855303-rjsfplsur3d0nm6ljus5p262965pavkn.apps.googleusercontent.com'}
         onSuccess={googleresponse}
         onFailure={googleresponse}
         cookiePolicy={'single_host_origin'}
         render={props=>(
             <button
             className='btn btn-primary  btn-block mt-2'
             onClick={props.onClick}
             disabled={props.disabled}
             > Sign in with google</button>
         )}
         />
         <Link to='/signup' className="btn btn-info btn-block">Create account with email </Link>
     </div>
     <div className="col-lg-6 order-1 order-lg-2 header-img py-5">
         <img src={sgininimg} alt='Signin' className='img-fluid' />
     </div>
        </div>
    )
}

  return (
    <div>
        <Base title="" >
            {SigninForm()}
             {performRedirect()}
        </Base>
    
    </div>
  );
}
