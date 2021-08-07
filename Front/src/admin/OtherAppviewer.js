
import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth';
import axios from 'axios'
import APBase from './APBase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function OtherAppviewer({match}) {
    const {data}=isAuthenticated();
   const [Application, setApplication] = useState({});
 
 

  
    const getApplication=()=>{

        axios.get(`/api/application/${match.params.appID}/${data.user._id}`,
        { headers:{
             Authorization:`Bearer ${data.token}`
         }})
        .then(res=>{setApplication(res.data);  
       
     })
        .catch(err=>{console.log(err)})
         //
        
        


    }


    
   useEffect(() => {
      getApplication();
     
     }, [])
  return (
    <APBase>
    <div className="col-md-9">
    <ToastContainer/>
      
  <h5> Name:{Application.name}</h5>
  <h5>Rollno:{Application.rollno}</h5>
  <h5>Reg no:{Application.regno}</h5>
  <h5> Sem:{Application.sem}</h5>
  <h5> Branch :{Application.branch}</h5>
  
 
  <h5> Date:{Application.createdAt}</h5>

  

  
 
 
  
  


  
  
  
    </div>
    
    </APBase>
  );
}
