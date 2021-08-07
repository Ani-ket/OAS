import React, {useEffect,useState}from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base'
import APBase from './APBase';
import axios from "axios"
import {TouchBallLoading} from "react-loadingg"



export default function Adminpanel() {

  const [application, setapplication] = useState(0)
  const [oapplication, setoapplication] = useState(0)
  const [ student,setstudent] = useState(0)
  const [admin, setadmin]= useState(0)
   const [loading, setloading] = useState(false)

   const getinfo=()=>{
  setloading(true);
  axios.get('/api/count/application').then(res=>{setapplication(res.data)}).catch(err=>{});
  axios.get('/api/count/oapplication').then(res=>{setoapplication(res.data)}).catch(err=>{});
  axios.get('/api/count/student').then(res=>{setstudent(res.data)}).catch(err=>{});
  axios.get('/api/count/admin').then(res=>{setadmin(res.data)}).catch(err=>{ })
   setloading(false);
}

useEffect(() => {
  getinfo();
}, [])
  return (
    <>
    
           <APBase>
         
          <div className="panel-group col-md-9">
           
            <div className="panel panel-primary">
              <div className="bg-primary p-1 rounded text-white panel-heading">
                <h5 className="panel-title"> Overview</h5>
              </div>
              <div className="px-2 row panel-body mt-1 mx-auto">
                <div className="col-md-3 px-4 order-lg-1 bg-success order-1 m-1">
                  <div className="well dash-box">
                 <h2> <i className="material-icons md-48">people</i></h2>
                    <h4> {student}</h4>
                    <h4>Students</h4>
                  </div>
                </div>
                <div className="col-md-3 px-4 order-lg-1 bg-success order-1 m-1">
                  <div className="well dash-box">
                <i className="material-icons md-48">admin_panel_settings</i>
                    <h4>{admin}</h4>
                    <h4>Admins</h4>
                  </div>
                </div>
                
                <div className="col-md-3 px-4 order-lg-1 bg-success order-1 m-1">
                  <div className="well dash-box">
                  <h2> <i className="material-icons md-48">list_alt</i></h2>
                <h4> {application +oapplication}</h4>
                    <h4>Application</h4>
                  </div>
                </div>
              </div>
              </div>

     {loading &&( <TouchBallLoading color="#4c1fbf" size="large"/>)}
        
          </div>
       </APBase>
    </>
  );
}
