import React,{useState}from 'react';
import { isAuthenticated } from '../auth';
import DBBase from './DBBase';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import{ BoxLoading} from 'react-loadingg';

let success=false;

export default function OtherAdmission() {
  const {data,token} =isAuthenticated();
    const [values, setValues] = useState({
     name:"",
     rollno:"",
     regno:"",
     sem:"",
     branch:"",
    
     

     });
     const{name,rollno,regno,sem,branch}=values;
     
    const handleChange=name=>event=>{
       
        setValues({...values,[name]:event.target.value})
    }
  
    const onSubmit=(event)=>{
      event.preventDefault();
    
      
        
              
            
              axios.post(`/api/application/create/${data.user._id}`,{name,rollno,regno,sem,branch},{
                headers:{
                    Authorization:`Bearer ${data.token}`
                }
            }).then((data)=>{
               setValues({...values, 
              name:"",
              rollno:"",
              regno:"",
              sem:"",
              branch:""
            
             
               })
          success=true;
          toast.success("Application Submitted")
          toast.info("Now,Go to Paymet section")
          
           
          }).catch(err=>{ 
              setValues({...values, 
                name:"",
                rollno:"",
                regno:"",
                sem:"",
                branch:"",
               
               
            });
            success=false;
             toast.error("Error");
           

            }
            )

          }

   const applictionForm = () => (
        <form className="col-md-9 mx-auto" >
              <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>

          <div className="form-group">
            <input
              onChange={handleChange("rollno")}
              name="rollno"
              type="number"
              className="form-control"
              placeholder="Roll No"
              value={rollno}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("regno")}
              name="regno"
              type='number'
              className="form-control"
              placeholder="Registarion no"
              value={regno}
            />
          </div>
             <div className="form-group">
            <select
              onChange={handleChange("sem")}
              className="form-control"
              placeholder="Semester"
            >
              <option>Select Semester</option>
           
                
                <option key="2" value="3">3</option>
                <option key="3" value="5">5</option>
                <option key="7" value="7">7</option>
           
            </select>
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("branch")}
              className="form-control"
              placeholder="Branch"
            >
              <option>Select Branch</option>
           
                <option key="1" value="cse">CSE</option>
                <option key="2" value="ete">ETE</option>
               
               
           
            </select>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-primary mb-3">
            Submit
          </button>
        </form>
      );
      
  return (
    <DBBase>
    <div className="col-md-9">
      <ToastContainer/>
        <div className="breadcrumb">Admission form  </div>
        <div className="row">
            {applictionForm()}
            {/* {loading &&(<BoxLoading/>)} */}
            
        </div>
    </div>
    </DBBase>
  );
}
