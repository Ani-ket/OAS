import React from 'react'
import {Route,Switch,BrowserRouter} from "react-router-dom"
 
 import Signup from './user/Signup'
import Homepage from './core/Homepage';
import About from './core/About';
 import Signin from './user/Signin';
import Contact from './core/Contact';
import Dashboard from './student/Dashboard';
import Adminpanel from './admin/Adminpanel';
import APBase from './admin/APBase';
import Students from './admin/Students';
import Admin from './admin/Admin';
import Applications from './admin/Applications';

import Application from './student/Application';
import Payment from './student/Payment';
import Status from './student/Status';
import Receipt from './student/Receipt';
import NewAdmission from './student/NewAdmission';
import NewApplications from './admin/NewApplications'
import OtherApplication from "./admin/OtherApplication"
import OtherAdmission from './student/OtherAdmission';
import ApplicationViewer from './admin/ApplicationViewer';
import OtherAppviewer from './admin/OtherAppviewer';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute'
import Notices from './core/Notices';
import Notice from './admin/Notice';



export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/about" exact component={About}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/contact" exact component={Contact}/>
        <Route path="/notices" exact component={Notices}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
         
        

          <PrivateRoute path="/application" exact component={Application}/>
          <PrivateRoute path="/payment" exact component={Payment}/>
          <PrivateRoute path="/status" exact component={Status}/>
          <PrivateRoute path="/receipt" exact component={Receipt}/>

           <PrivateRoute path="/db/application/new" exact component={NewAdmission}/>
           <PrivateRoute path="/db/application/other" exact component={OtherAdmission}/>

           <AdminRoute path="/adminpanel" exact component={Adminpanel}/>
         <AdminRoute path="/apb" exact component={APBase}/>
          <AdminRoute path="/students" exact component={Students}/>
          <AdminRoute path="/admin" exact component={Admin}/>
          <AdminRoute path="/applications" exact component={Applications}/>
          <AdminRoute path="/notice" exact component={Notice}/>
         
           <AdminRoute path="/admin/applications/new" exact component={NewApplications}/>
           <Route path="/admin/applications/other" exact component={OtherApplication}/>
   
           <AdminRoute path={`/application/:appID`}  component={ApplicationViewer}/>
           <AdminRoute path={`/other/application/:appID`}  component={OtherAppviewer}/>


        {/* 
        
        <Route path="/welcome" exact component={Welcome}/>
        <AdminRoute path="/post" exact component={Post}/> */}
    </Switch>
    </BrowserRouter>
  );
}
