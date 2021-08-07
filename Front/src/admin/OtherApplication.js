import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import APBase from './APBase';
import axios from 'axios'
import { isAuthenticated } from '../auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function OtherApplication() {
  const [Applications, setApplications] = useState([])
    const [User, setuser] = useState([])
  const {data}=isAuthenticated();

    const getallapplication=()=>{
    axios.get(`/api/applications/${data.user._id}`,
   { headers:{
        Authorization:`Bearer ${data.token}`
    }})
   .then(res=>{setApplications(res.data); 
   
})
   .catch(err=>{console.log(err)})
    }

    useEffect(() => {
        getallapplication();
      }, [])

      const deleteApplication=(appId)=>{
        axios.delete(`/api/delete/${appId}/${data.user._id}`,
              { headers:{
                      Authorization:`Bearer ${data.token}`
                }})
        .then(res=>{ toast.success("Deleted");getallapplication(); })
         .catch(err=>{toast.error(err.response.data.err);})
      }

  return (
    <>
    <APBase>
      <ToastContainer/>
      <div className="col-md-9">
            <div className="panel panel-default">
              <div className="panel-heading bg-primary">
                <h3 className="panel-title p-2">Applications</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                      
                </div>
                <br/>
                <table className="table table-striped table-hover">
                      <tr>
                        <th>Name</th>
                        <th>Roll no</th>
                      
                        <th></th>
                      </tr>
                  {Applications.map((application,index)=>{
                      return (
                          <tr key={index}>
                              <td>{application.name}</td>
                              <td>{application.rollno}</td>
                             
                             <td> <Link className="btn btn-info" to={`/other/application/${application._id}`}>View</Link></td>
                             <td> <button className="btn btn-danger" onClick={()=>{deleteApplication(application._id)}} >Delete</button></td>
                          </tr>
                      )
                  })}
                    
                   
                      
                    </table>
              </div>
              </div>
          </div>   
    </APBase>
    
    </>
  );
}
