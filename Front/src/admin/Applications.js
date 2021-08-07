import React from 'react';
import { Link } from 'react-router-dom';
import APBase from './APBase';


export default function Applications() {
  return (
    <>
    <APBase>
      <div className="col-md-9">
      <div className="row d-flex justify-content-center">
         <div className="col-md-5 order-lg-1 bg-info order-1 m-1">
           <div className="well dash-box  p-3">
             <h2><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> </h2>
                 <Link to="/admin/applications/new" className="text-white">New admission/1 st sem Applications</Link>
          </div>
       </div>
       <div className="col-md-5 order-lg-1 bg-info order-1 m-1 ">
           <div className="well dash-box  p-3">
             <h2><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> </h2>
                 <Link to="/admin/applications/other" className="text-white">3/5/7 Semester Applications</Link>
          </div>
       </div>
       </div>
              
      </div>   
    </APBase>
    
    </>
  );
}
