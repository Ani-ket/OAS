import Base from './Base'
import web from "../assets/classroom.jpg"
import React from 'react';
import { Link } from 'react-router-dom';
import form2 from '../assets/Forms.svg'
export default function Homepage() {
  return (
    <Base title="" >
        <div className="row d-flex align-items-center">
      <div className="col-md-6 pt-5 pt-lg-0 order-1 order-lg-1 text-center">
      
        <h1> Welcome to the <strong className="brand-name"> E-Admission</strong> portal </h1>
        <Link to="/Signin" className="btn rd-btn"> Signin</Link>
         <Link to="/notices"  className="btn rd-btn"> Notice</Link>
        
      </div>
      <div className="col-lg-6 order-2 order-lg-2 header-img py-5">
      <img src={form2} className="img-fluid" alt="classroom img" />
      </div>
     
      </div>
      <div className='d-flex justify-content-center' >
        <img src={web} className="img-fluid "/>
      </div>
    </Base>
  );
}
