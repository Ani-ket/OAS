import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import APBase from './APBase';
import axios from "axios"

export default function Admin() {
  const [Admin, setAdmin] = useState([])
  const {data}=isAuthenticated();

  const getalladmin=()=>{
    axios.get(`/api/users/${data.user._id}?role=1`,{
      headers:{
        Authorization:`Bearer ${data.token}`
      }
    }).then(res=>setAdmin(res.data))
    .catch(err=>{})

  }
  
  useEffect(() => {
    
      getalladmin();
   
  },[] )

  return (
   <APBase>
            <div className="col-md-9">
            <div className="panel panel-default">
              <div className="panel-heading bg-primary">
                <h3 className="panel-title p-2">Admin</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                      <div className="col-md-12">
                          <input className="form-control" type="text" placeholder="Search"/>
                      </div>
                </div>
                <br/>
                <table className="table table-striped table-hover">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                      </tr>
                      {Admin.map((admin,index)=>{
                        return(
                          <tr key={index}>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role}</td>
                        
                      </tr>
                        )
                      })}
                       
                      
                    </table>
              </div>
              </div>
              </div>
          
 </APBase>
   
  );
}
