import React,{useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import DBBase from './DBBase';
import axios from "axios";
import { isAuthenticated } from '../auth';
let application;
export default function Dashboard() {

  const [Application, setApplication] = useState({});
  const [isnew, setisnew] = useState(true);
  
  const [loading, setloading] = useState(true);


   const {data,token}=isAuthenticated();
   const [status, setstatus] = useState(0);


  const getdetails=()=>{
    axios.get(`/api/isnew/${isAuthenticated().data.user._id}`)
  .then(res=>{setisnew(res.data)})
  .catch(err=>{})
    axios.get(`/api/application/${isAuthenticated().data.user._id}`)
  .then(res=>{application=res.data
  })
.catch(err=>{})

    axios.get(`/api/status/${data.user._id}`)
        .then(res=>{setstatus(res.data.status);})
        .catch(err=>{})
  }
  


const getapplication=()=>{

 if
  (isnew){axios.get(`/api/new/application/${application}`,{
      
  }).then(res=>{setApplication(res.data) ;setloading(false)})
  .catch(err=>{setloading(false) })
}
setloading(false)
}


const appstat=()=>{
  switch(status) {
    case -1:
       return "not submited"
      break;
    case 0:
      return "submited & reviwing"
      break;
      case 1:
      return "rejected"
      break;
      case 2:
      return "Resubmit"
      break;
   
     case 3:
      return "verified"
      break;
    case 4:
      return "payment completed"
      break;
      case 5:
      return "completed"
      break;
    default:
      return "unknown"
     
  } 
}
useEffect(() => {
 setloading(true)
  getdetails();
  setTimeout(getapplication,5000);
}, [])
  return (
    <DBBase>
    
          <div className="panel-group col-md-9">
           
            <div className="panel panel-primary">
              <div className="bg-dbt2 p-1 rounded text-white panel-heading">
                <h5 className="panel-title"> Overview</h5>
              </div>
              <div className="px-2 row panel-body mt-1">
                <div className="col-md-3 order-lg-1 bg-primary order-1 m-1">
                  <div className="well dash-box">
                  <i className="material-icons md-48">note</i>
                  <h4>Application:</h4>
                    <h4 className="text-white"> {appstat()}</h4>
                   
                  </div>
                </div>
                <div className="col-md-3 order-lg-1  bg-primary order-1 m-1">
                  <div className="well dash-box">
                  <i className="material-icons md-48">account_balance_wallet</i>
                  <h4>Payment:</h4>
              <h4 className="text-white"> {status>=4? "Done":"Pending"}</h4>
                  
                  </div>
                </div>
                
                <div className="col-md-3 order-lg-1  bg-primary order-1 m-1">
                  <div className="well dash-box">
                  <i className="material-icons md-48">receipt</i>
                  <h4>Receipt</h4>
                    <h4 className="text-white">  {status==4? "Generated":""}</h4>
                   
                  </div>
                </div>
              </div>
              { isnew &&(<div>
                <div className="alert alert-warning">Remark (if any) :</div>
              <div className="alert alert-light">{Application?.remark}</div>
              </div>)}
              </div>

          
        
          </div>
  
    </DBBase>
  );
}
