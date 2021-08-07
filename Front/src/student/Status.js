import React from 'react';
import DBBase from './DBBase';

export default function Status() {
  return (
    <>
    <DBBase>
        <div className="col-md-9 mx-auto  ">
          <div>
        <div className="row mx-auto">
           <div className="col-md-5 order-lg-1 bg-info order-1 m-1">
                  <div className="well dash-box">
                    <h2> Application Status</h2>
                    <h4>Verified</h4>
                  </div>
                </div>
                <div className="col-md-5 order-lg-1 bg-info order-1 m-1">
                  <div className="well dash-box">
                    <h2>Payment Status </h2>
                    <h4>paid</h4>
                  </div>
                </div>
        </div>
        <div className="breadcrumb">Remark</div>
         
          </div>
       </div>
    </DBBase>
    </>
  );
}
