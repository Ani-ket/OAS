import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import APBase from './APBase';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Students() {
  const [Users, setUsers] = useState([])
  const {data}=isAuthenticated();

  const getalluser=()=>{
    axios.get(`/api/users/${data.user._id}`,{
      headers:{
        Authorization:`Bearer ${data.token}`
      }
    }).then(res=>setUsers(res.data))
    .catch(err=>{toast.error(err.response.data.err)})

  }
  const deleteuser=(userid)=>{
    axios.delete(`/api/delete/${data.user._id}?uid=${userid}`,
          { 
            headers:{
                  Authorization:`Bearer ${data.token}`
            }})
    .then(res=>{ toast.success(" user Deleted");getalluser(); })
     .catch(err=>{toast.error(err);})
  }
  useEffect(() => {
    
      getalluser();
   
  },[] )
  return (
    <>
    <APBase>
        <div className="col-md-9">
          <ToastContainer/>
            <div className="panel panel-default">
              <div className="panel-heading bg-primary">
                <h3 className="panel-title p-2">Student</h3>
              </div>
              <div className="panel-body">
                <div className="row">
         
                </div>
                <br/>

                <table className="table table-striped table-hover">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                      {Users.map((user,index)=>{
                        return(
                          <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td> <Link class="btn btn-danger" onClick={()=>{deleteuser(user._id)}}>Delete</Link></td>
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
