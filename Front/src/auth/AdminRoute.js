import React from 'react';
import {Route,Redirect} from "react-router-dom"
import { isAuthenticated } from '.';

export default function AdminRoute({ component:Component, ...rest }) {
  return (
    <Route
       {...rest}
        render={ 
        props=> isAuthenticated() && isAuthenticated().data.user.role==1 ? (<Component {...props}/>):
                isAuthenticated()?(
             <Redirect to={{ pathname: "/",
            state: { from:props.location }}} />
             ):         ( <Redirect to={{
                               pathname:"/signin",
                               state:{from:props.location}
                           }} /> )  
           }
    />
    
    
  );
}
