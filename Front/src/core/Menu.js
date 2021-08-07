import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { isAuthenticated,signout} from '../auth'

const { Link, withRouter,NavLink } = require("react-router-dom")


const activetab=(history,path)=>{
 if(history.location.pathname===path)
 return {backgroundColor:"#fff" ,padding:"8px 8px 8px 8px",borderRadius:2}
 else
 return 
}



const Menu=({history})=>{

    return (
    <nav className="navbar  custom-nav navbar-light navbar-expand-lg  bg-nav ">
       <Link className="navbar-brand" to="/">E-Admission</Link>
       <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#mainNav"
      aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
     <span className="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav  mr-auto" >
            
            <li className="nav-item "> 
            <Link className="nav-link" to="/" style={activetab(history,"/")}>Home</Link>
            </li>
            <li className="nav-item "> 
            <Link className="nav-link" to="/notices" style={activetab(history,"/notices")}>Notices</Link>
            </li>
            
           
            
          

            <li className="nav-item">
            <Link  className="nav-link" to="/about" style={activetab(history,"/about")}>About us</Link>
             </li>

             <li className="nav-item">
            <Link  className="nav-link" to="/contact" style={activetab(history,"/contact")}>Contact us</Link>
             </li>
             {isAuthenticated() && isAuthenticated().data.user.role==0 &&
             (<li className="nav-item">
            <Link  className="nav-link" to="/dashboard" style={activetab(history,"/dashboard")}>Dashboard</Link>
             </li>)
}
             {isAuthenticated() && isAuthenticated().data.user.role==1 && (<li className="nav-item">
            <Link  className="nav-link" to="/adminpanel" style={activetab(history,"/adminpanel")}>AdminPanel</Link>
             </li>)}
         { !isAuthenticated() &&
             ( <Fragment>
                 <li className="nav-item">
                 <Link  className="nav-link" to="/signin" style={activetab(history,"/signin")} > signin</Link>
                </li>
              <li className="nav-item">
              <Link  className="nav-link" to="/signup" style={activetab(history,"/signup")}> signup</Link>
              </li>
             </Fragment>
            )}
       

             {  isAuthenticated() && (<li className="nav-item">
            <Link to="#" className="nav-link text-danger"  
             onClick={()=>{
                    signout(()=>{
                       history.push("/")
                      
                    })
                }} > signout</Link>
            </li>)   }

        </ul>
        </div>
  <ToastContainer/>
    </nav>)
};
export default withRouter(Menu)