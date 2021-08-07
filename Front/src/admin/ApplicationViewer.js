
import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth';
import axios from 'axios'
import APBase from './APBase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function ApplicationViewer({match}) {
    const {data}=isAuthenticated();
   const [Application, setApplication] = useState({});
   const [Feedback,setFeedback]=useState({
     status:"",
     remark:"",
     branch:"",
   })
const {status,remark,branch}=Feedback
   const handlechange=name=>event=>{
    setFeedback({...Feedback,error:false,[name]:event.target.value})
}
 onsubmit=(event)=>{
  event.preventDefault();
  if(branch==""){
    setFeedback({...Feedback,branch:Application.branch})
    
  }
  if(remark==""){
    setFeedback({...Feedback,remark:Application.remark})
    
  }
  if(status==""){
    setFeedback({...Feedback,status:Application.status})
    
  }
  axios.put(`/api/update/${Application._id}/${data.user._id}`,{status,remark,branch},{
    headers:{
      Authorization:`Bearer ${data.token}`
  }
  }).then(res=>{toast.success("Submitted successfully");
   setFeedback({...setFeedback,status:"",remark:"",branch:"",})
   
  })
   .catch(err=>{toast.error(err.response.dara.err)
    setFeedback({...setFeedback,status:"",remark:"",branch:"",});
    
  })

}

   const photoUrl=`/api/new/application/photo/${match.params.appID}/${data.user._id}?token=${data.token}`
   const marksheetUrl=`/api/new/application/marksheet/${match.params.appID}/${data.user._id}?token=${data.token}`
   const scorecardUrl=`/api/new/application/scorecard/${match.params.appID}/${data.user._id}?token=${data.token}` 
  
    const getApplication=()=>{

        axios.get(`/api/new/application/${match.params.appID}/${data.user._id}`,
        { headers:{
             Authorization:`Bearer ${data.token}`
         }})
        .then(res=>{setApplication(res.data);  
       
     })
        .catch(err=>{console.log(err)})
         //
        
        


    }
    const FeedbackForm=()=>{
      return(
         
           
          <div className="col-lg-8 offset-md-2 pb-5">
           <form>
                     <div className="form-group">
                      <label className="text-info">Remark, if Any</label>
                      <input defaultValue={Application.remark} className="form-control" type="text" onChange={handlechange("remark")} value={remark} />
                     </div>

                     <div className="form-group">
                       <select
                          onChange={handlechange("status")}
                          className="form-control"
                          defaultValue={Application.status} >
                           <option >Update Status</option>
                           <option key="0" value="0">Reviewing</option>
                           <option key="1" value="1">Rejected</option>
                           <option key="2" value="2">Resubmit</option>
                          <option key="3" value="3">Verified</option>
           
                        </select>

                     </div>
                        <div className="form-group">
                          <select
                              onChange={handlechange("branch")}
                               className="form-control" 
                               defaultValue={Application.branch}>
                             <option >Allot branch</option>
                             <option key="0" value="No Branch">No branch</option>
                             <option key="1" value={Application.p1}>{Application.p1}</option>
                             <option key="2" value={Application.p2}>{Application.p2}</option>
                             <option key="3" value={Application.p3}>{Application.p3}</option>
                                 
           
                           </select>
                         </div>
                  <button type="submit" onSubmit={onsubmit} className="btn btn-primary btn-block">Submit</button>
           </form>
       </div>
         
      )
  }

    
   useEffect(() => {
      getApplication();
     
     }, [])
  return (
    <APBase>
    <div className="col-md-9">
    <ToastContainer/>
      
  <img src={photoUrl} className="img-thumbnail float-right border border-primary" alt="Photo" style={{maxWidth:"100px"  }}></img>  
  <h5> <strong>Name:</strong>{Application.name}</h5>
  <h5> <strong>Fathers Name:</strong>{Application.fname}</h5>
  <h5> <strong>Mothers Name:</strong>{Application.mname}</h5>
  <h5> <strong>Gender:</strong>{Application.gender}</h5>
  <h5> <strong>CEE Mark:</strong>{Application.mark}</h5>
  <h5><strong>Percentage:</strong>{Application.percentage}</h5>
  <h5> <strong>Preference 1:</strong>{Application.p1}</h5>
  <h5> <strong>Preference 2:</strong>{Application.p2}</h5>
  <h5><strong> Preference 3:</strong>{Application.p3}</h5>
  <h5> <strong>Branch Alloted:</strong>{Application.branch}</h5>
  <h5> <strong>Remark:</strong>{Application.remark}</h5>
 
  <h5> Date:{Application.createdAt}</h5>

  
  <img src={scorecardUrl} className="img-fluid mx-auto d-block " alt="Scorecard" style={{ }}></img>
  <br/>
  <img src={marksheetUrl} className="img-fluid mx-auto d-block" alt="Marksheet" style={{  }}></img>

  

  
 
  {FeedbackForm()}
  
  


  
  
  
    </div>
    
    </APBase>
  );
}
