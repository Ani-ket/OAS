import { indexOf } from 'lodash';
import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import DBBase from './DBBase';
import { getUserStatus } from './helper';
import axios from "axios"
export default function Application() {
  const {_id}=isAuthenticated().data.user;
  const [status, setstatus] = useState(0);
  const getstatus=()=>{
    axios.get(`/api/status/${_id}`)
        .then(res=>{setstatus(res.data.status);})
        .catch(err=>{})
  }

  const appstat=()=>{
    switch(status) {
     
      case 0:
        return "Your application is submited & is under review. Please visit after 1-2 days"
        
        case 1:
        return " We are sorry ,Your application rejected. Please visit Dashboard section for more Information"
     
        case 2:
        return "You application have to be resubmitted . Please visit Dashboard for more Information "
       
     
       case 3:
        return "Your application is verified. Now you have to go to Pay the fees"
       
      case 4:
        return "Congratulations! your application accepted.You can download receipt"
       
        
      
       
    } 
  }


  useEffect(() => {
    getstatus();
  }, [])
  return (
    <>
    <DBBase>
      <div className="col md-9 ">
      <div className="breadcrumb">Application</div>
      {
        status!=-1 && (<div>
          <div className="alert alert-info">{appstat()}</div>
          </div>)
      }
  { status==-1 && (<frameElement>
      <div className="row d-flex justify-content-center">
         <div className="col-md-5 order-lg-1 bg-info order-1 m-1">
           <div className="well dash-box  p-3">
             <h2><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> </h2>
                 <Link to="/db/application/new" className="text-white">New admission/1 st sem</Link>
          </div>
       </div>
       <div className="col-md-5 order-lg-1 bg-info order-1 m-1 ">
           <div className="well dash-box  p-3">
             <h2><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> </h2>
                 <Link to="/db/application/other" className="text-white">3/5/7 Semester</Link>
          </div>
       </div>
       </div>
      </frameElement>)
      }
  
    
        </div>
    </DBBase>
    </>
  );
}
