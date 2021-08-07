import React, { useState ,useEffect} from 'react';
import Base from './Base';
import Axios from 'axios'
import { Link } from 'react-router-dom';
import {TouchBallLoading} from 'react-loadingg'

export default function Notices() {
const [notices,setNotices]=useState([])


const getnotices=()=>{

  Axios.get('/api/notice/all').then(res=>{
    setNotices(res.data);
    
  }).catch(err=>{
   
  })
 
}

useEffect(() => {
 getnotices()
}, [])

  return (
    <Base title="Notices" classname='col-10 panel mx-auto' >
  
     <div className="row mx-auto">
    
       {notices.map((notice,i)=>(
        <div className="card col-md-5 order-lg-1 bg-info order-1 m-1 bg-notice   " >
        <div className="card-body ">
          <h5 className="card-title">{notice.title}</h5>
          
       <p className="card-text">{notice.body}</p>
      
      { 
      notice.attachment &&
      (<Link to={{pathname:`https://eadmission.herokuapp.com/api/notice/attachment/${notice._id}`}} target='_blank' ><button className='btn btn-primary'>Attachment</button></Link>)}
       </div>
     </div>
       ))}
       
      <div>
     
      </div>
     



     </div>
     {!notices.length && <TouchBallLoading />}
    </Base>
  );
}
