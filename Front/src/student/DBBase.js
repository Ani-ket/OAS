import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";


export default function DBBase({children}) {
  

    return (
        <>
        <Base classname="col-12 mx-auto">
        <div  className="breadcrumb bg-dbt text-white" >
       
          <h3>Hi, {isAuthenticated().data.user.name }</h3>
        
    </div>

    <section id="main ">
      <div className="">
        <div className="row">
          <div className="col-md-3 ">
            <div className="list-group mb-5">
              <Link to="/dashboard" class="list-group-item active bg-dbt">
              <i className="material-icons md-48">dashboard</i> Dashboard
              </Link>
              <Link to="/application" className="list-group-item"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Application </Link>
              <Link to="/payment" className="list-group-item"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Payment </Link>
             
                 <Link to="/receipt" className="list-group-item"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Receipt </Link>
           
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