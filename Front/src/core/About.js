import Base from './Base'

import React from 'react';
import aboutimg from '../assets/about.svg'
export default function Homepage() {
  return (
    <Base title="About Us" >
    <img src={aboutimg} className="img-fluid" />      
      <div className="d-flex justify-content-center ">
      <div className="text-justify">
      <h1> Welcome to <strong className="brand-name"> E-Admission</strong>   </h1>
        <h2> Here you can take admission online</h2>
        <h2><strong>Why online admission</strong></h2>
        <ul>
          <li>Remote admission</li>
          <li>Hasslefree admission</li>
          <li>Easy fee payment</li>
          <li>Instant Receipt</li>
        </ul>
      </div>
        
      </div>
        
     
    </Base>
  );
}
