import React from 'react'
import Menu from './Menu';

const Base=({
    title="",
    classname="col-10 mx-auto",
    children
})=>{
    return(
   <div >
        <Menu></Menu>
       <div className="container-fluid fh">
         <div className="PageHead  text-center">
             <h1>{title}</h1>
             
         </div>
   
    <div className="row">
        <div className={classname}>
            {children}
        </div>
    </div>

       </div>
    <footer className=" footer">
        <div className="text-center">www.eadmission.com</div>
    </footer>
   </div>
    );
}
export default Base;