import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Base from '../core/Base';



export default function APBase({children}) {
  return (
    <>
    <Base classname="col-12 mx-auto">
        <div  className="breadcrumb bg-primary text-white" >
       
      <h3>Hello, {isAuthenticated().data.user.name}</h3>
        
    </div>

    <section id="main ">
      <div className="">
        <div className="row">
          <div className="col-md-3 ">
            <div className="list-group mb-5 ">
              <Link to="/adminpanel" class="list-group-item active bg-primary">
              <i className="material-icons md-48">settings</i> Admin Panel
              </Link>
              <Link to="/students" className="list-group-item"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Students </Link>
              <Link to="/admin" className="list-group-item"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Admin </Link>
               <Link to="/applications" className="list-group-item"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Applications </Link>
               <Link to="/notice" className="list-group-item"><span class="glyphicon glyphicon-blackboard" aria-hidden="true"></span> Notices </Link>
               
           
            </div>

          </div>
          {children}
          </div>
          </div>
          </section>
          </Base>
    
    </>
  );
}
