import React,{useEffect,useState} from 'react';
import DBBase from './DBBase';
import axios from "axios"
import { isAuthenticated } from '../auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {WaveTopBottomLoading} from "react-loadingg"

import jsPDF from "jspdf"
let appplication;
let isnew;
export default function Receipt() {
  const {data}=isAuthenticated();
  
const [status, setstatus] = useState(0);
const [Application, setApplication] = useState({});
//const [isnew, setisnew] = useState(true);
const [appno, setappno] = useState();
const [loading, setloading] = useState(true);

const getstatus=()=>{
  axios.get(`/api/status/${data.user._id}`)
      .then(res=>{setstatus(res.data.status);})
      .catch(err=>{})
}


const  getdata= ()=>{
  axios.get(`/api/application/${isAuthenticated().data.user._id}`)
  .then(res=>{setappno(res.data);appplication=res.data
  })
  .catch(err=>{})

  axios.get(`/api/isnew/${isAuthenticated().data.user._id}`)
  .then(res=>{isnew=res.data})
  .catch(err=>{})
  

 
 }

const getapplication=()=>{


  const u=isAuthenticated().data.user;
 
  if
  (isnew){axios.get(`/api/new/application/${appplication}`,{
      headers:{
          Authorization:`Bearer ${data.token}`
      }
  }).then(res=>{setApplication(res.data) ;setloading(false)})
  .catch(err=>{toast.error(err.response.data.err);setloading(false) })
}
else{
  axios.get(`/api/application/${appplication}/${u._id}`,{
      headers:{
          Authorization:`Bearer ${data.token}`
      }
  }).then(res=>{setApplication(res.data);setloading(false)})
  .catch(err=>{toast.error(err.response.data.err);setloading(false)  })
}
}

useEffect(() => {
  getdata();
  getstatus();
  
 setTimeout(getapplication,5000);
  
}, [])


const genPDF=()=>{
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
   
  });
  
  doc.text("Admission Receipt", 160, 30)
  doc.text("BARAK VALLEY ENGINEERING COLLEGE,KARIMGANJ,ASSAM", 30, 50)
  doc.line(20, 60, 420, 60)
  doc.setFontSize(12);
  doc.text(`Application Id: ${Application._id}`, 30, 130)
  doc.text(`Name: ${Application.name}`, 30, 150)
 if(isnew){
    doc.text(`Father Name: ${Application.fname}`,30, 170)
   doc.text(`Mother Name: ${Application.mname}`, 30, 190)
   
}else{
  doc.text(`Rollno: ${Application.rollno}`,30, 170)
  doc.text(`Reg no: ${Application.regno}`, 30, 190)
  
}
doc.text(`Branch: ${Application.branch}`, 30, 210)
if(Application.sem)
doc.text(`sem: ${Application.sem}`, 30, 230)

  doc.text("Admission fee: 500", 30, 250)

  doc.setTextColor(255, 0, 0);
  doc.setFontSize(20);
  doc.addImage("logo_bvec.jpg", "JPEG", 15, 400,50,50);
  doc.setFont("helvetica", "bold");
  doc.text("Admission completed", 300, 520,null,null,"center")
  doc.save("receipt.pdf") 
}


  return (
    <>
    <DBBase>
        <div className="col-md-9 mx-auto  ">
          <ToastContainer/>
          <div>
           
            <div className="alert alert-info">Receipt will be available after successfull payment</div>
            {status==4 &&(<div><div className="alert alert-success">your receipt available for download</div>
             { !loading &&
            (<button className="btn btn-success" onClick={()=>{genPDF()}}>
                    Download Receipt 
                </button>)}
               
              </div> )}
               {loading &&(<WaveTopBottomLoading/>)}
          </div>
       </div>
    </DBBase>
    </>
  );
}
