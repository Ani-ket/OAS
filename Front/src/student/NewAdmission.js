import React,{useState,useEffect}from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { isAuthenticated } from '../auth';
import DBBase from './DBBase';
import axios from "axios"
import { Redirect } from 'react-router-dom';
import{ ThreeHorseLoading} from 'react-loadingg';



export default function NewAdmission() {
  const {data,token} =isAuthenticated();
  

    const [values, setValues] = useState({
     name:"",
     fname:"",
     sname:"",
     
     percentage:"",
     stock:"",
     photo:"",
     marksheet:"",
     scorecard:"",
     
     
     gender:"",
     sem:"",
     mark:"",
     p1:"",p2:"",p3:"",error:"",
     formData:"",
     loading:false,userid:"",
     success:false
     });
     const{name,fname,mname,percentage,gender,photo,sem,p1,p2,mark,marksheet,success,loading,scorecard,p3,formData}=values;
    
    const preload=()=>{
     
              setValues({...values,formData:new FormData()})
             
          }
   
 
  useEffect(() => {
    preload();
  }, [])
  
    const handleChange=name=>event=>{
        const value= name==="photo" ||name==="marksheet"||name==="scorecard"? event.target.files[0] :event.target.value;
      
    formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const onSubmit=(event)=>{
      event.preventDefault();
     
      setValues({...values,error:"",loading:true});
     // toast.info("Uploading...")
              
            
              axios.post(`/api/newapplication/create/${data.user._id}`,formData,{
                headers:{
                    Authorization:`Bearer ${data.token}`
                }
            }).then((data)=>{ setValues({...values, 
              name:"",
            fname:"",
            mname:"",
            percentage:"",
            gender:"",
            photo:"",
            sem:"",
            p1:"",
            p2:"",
            mark:"",
            marksheet:"",
            scorecard:"",
            p3:"",
           

            error:"",
          loading:false
           })
           if(data.data)
           toast.success("Application Submitted")
         
            {<Redirect to="/application"/>}
          })
            .catch(err=>{ 
              setValues({...values, 
                name:"",
              fname:"",
              mname:"",
              percentage:"",
              gender:"",
              photo:"",
              sem:"",
              p1:"",
              p2:"",
              mark:"",
              marksheet:"",
              scorecard:"",
              p3:"",
              loading:false
             });
             toast.error(err.response.data.error)
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
              onChange={handleChange("fname")}
              name="fname"
              className="form-control"
              placeholder="father's Name"
              value={fname}
            />
          </div>
              <div className="form-group">
            <input
              onChange={handleChange("mname")}
              name="fname"
              className="form-control"
              placeholder="Mother's Name"
              value={mname}
            />
          </div>
          <span>Passport size photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-primary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <span>class 12 marksheet/Equivalent</span>
          <div className="form-group">
            <label className="btn btn-block btn-primary">
              <input
                onChange={handleChange("marksheet")}
                type="file"
                name="marksheet"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <span>class cee scorecard</span>
          <div className="form-group">
            <label className="btn btn-block btn-primary">
              <input
                onChange={handleChange("scorecard")}
                type="file"
                name="scorecard"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
      
      
        
        
          <div className="form-group">
            <input
              onChange={handleChange("percentage")}
              type="number"
              className="form-control"
              placeholder="Percentage in last qualified exam"
              value={percentage}
            />
          </div>
             <div className="form-group">
            <input
              onChange={handleChange("mark")}
              type="number"
              className="form-control"
              placeholder="cee mark"
              value={mark}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("gender")}
              className="form-control"
              placeholder="Gender"
             
            >
              <option >Select Gender</option>
           
                <option key="1" value="M">Male</option>
                <option key="2" value="F">Female</option>
                <option key="3" value="O">Others</option>
           
            </select>
          </div>
            <div className="form-group">
            <select
              onChange={handleChange("sem")}
              className="form-control"
              placeholder="Semester"
            >
              <option > Semester</option>
           
                <option key="1" value="1">First</option>
                
                <option key="2" value="3">Third</option>
                
           
            </select>
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("p1")}
              className="form-control"
              placeholder="Branch1"
            >
              <option >Branch Preference 1</option>
           
                <option key="1" value="cse">CSE</option>
                <option key="2" value="ete">ETE</option>
                <option key="3" value="civil">CIVIL</option>
                <option key="4" value="mechanical">MECHANICAL</option>
               
           
            </select>
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("p2")}
              className="form-control"
              placeholder="Branch2"
            >
              <option >Branch Preference 2</option>
           
                <option key="1" value="cse">CSE</option>
                <option key="2" value="ete">ETE</option>
                <option key="3" value="civil">CIVIL</option>
                <option key="4" value="mechanical">MECHANICAL</option>
               
           
            </select>
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("p3")}
              className="form-control"
              placeholder="Branch3"
            >
              <option >Branch Preference 3</option>
           
                <option key="1" value="cse">CSE</option>
                <option key="2" value="ete">ETE</option>
                <option key="3" value="civil">CIVIL</option>
                <option key="4" value="mechanical">MECHANICAL</option>
               
           
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
        <div className="breadcrumb">Admission form for first year </div>
        
        <div className="row">
          
            {applictionForm()}
          
            {loading &&(<ThreeHorseLoading/>)}
        </div>
    </div>
    </DBBase>
  );
}
