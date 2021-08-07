import React,{useEffect,useState} from 'react';
import DBBase from './DBBase';
import axios from 'axios'
import { isAuthenticated } from '../auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {WaveTopBottomLoading} from "react-loadingg"

let appplication;
let isnew
export default function Payment() {
    const [Application, setApplication] = useState({});
    const [res, setres] = useState({});
   const {data}=isAuthenticated();
   const [status, setstatus] = useState(0);
  // const [isnew, setisnew] = useState();
   const [appno, setappno] = useState();
   const [loading, setloading] = useState();
  const getstatus=()=>{
    axios.get(`/api/status/${data.user._id}`)
        .then(res=>{setstatus(res.data.status);})
        .catch(err=>{})
  }
   
  function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
}
   const  getdata= ()=>{
    axios.get(`/api/application/${isAuthenticated().data.user._id}`)
    .then(res=>{setappno(res.data);appplication=res.data;console.log("data received:"+res.data)
    })
    .catch(err=>{console.log("data not received")})

    axios.get(`/api/isnew/${isAuthenticated().data.user._id}`)
    .then(res=>{//setisnew(res.data)
      isnew=res.data
    console.log("isnew:"+isnew)})
    .catch(err=>{})
    

   
   }

const getapplication=()=>{
 
  console.log("inside getapplication: "+appplication)
    const u=isAuthenticated().data.user;
   
    if
    (isnew)
    { console.log("value of isnew if:"+isnew)
      axios.get(`/api/new/application/${appplication}`,{
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    }).then(res=>{setApplication(res.data) ;setloading(false)})
    .catch(err=>{toast.error(err.response.data.err) ;setloading(false)})
  }
  else{
    console.log("value of isnew else:"+isnew)
    axios.get(`/api/application/${appplication}/${u._id}`,{
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    }).then(res=>{setApplication(res.data) ;setloading(false)})
    .catch(err=>{toast.error(err.response.data.err) ;setloading(false) })
  }
  
   
}
useEffect(() => {
  getdata();
  getstatus();
  console.log("1")
  setTimeout(getapplication,5000)
  console.log("2")
  //getapplication();
  
  
}, [])

   async function displayRazorpay() {
    setloading(true)
     axios.get('api/payment')
    .then(res=>{setres(res.data) ;})
    .catch(err=>{toast.error(err.response.data.err) })
    

        loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        ).then(res=>{  setloading(false)}).catch(err=>{
          setloading(false)
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        });
         
        
        
      
        const { amount, id: order_id, currency } =res;
        console.log(res)
        const options = {
            key: "rzp_test_myGJ76b2p1Byum", 
            amount: amount.toString(),
            currency: currency,
            name: "BVEC",
            description: " Admission fees",
           // image: { logo },
            order_id: order_id,
            
            handler: async function (response) {
              setloading(true)
                const data2 = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                
               if(data.user.isnew)
               {await axios.post(`/api/payment/success/${Application._id}/${data.user._id}`, data2)
                .then(res=>{toast.success(res.data.msg);
               
                 getstatus() ;setloading(false)}
                )
                .catch(err=>{toast.error(err); console.log(err);getstatus() ;setloading(false)});
              }
              else{
                await axios.post(`/api/payment/success/${Application._id}/${data.user._id}`, data2)
                .then(res=>{toast.success(res.data.msg);
               
                 getstatus() ;setloading(false)}
                )
                .catch(err=>{toast.error(err); console.log(err);getstatus() ;setloading(false)});
              }
                
            },
           
            prefill: {
                name: Application.name,
                email: data.user.email,
                contact: "9999999999",
            },
            theme: {
                color: "#61dafb",
            },
        };
      try{
        const paymentObject = new window.Razorpay(options)
    
        paymentObject.open();
      }catch(err){
          console.log(err)
      }

        

        
        }

  return (
    <>
    <DBBase>
       <div className="col-md-9 mx-auto ">
         
           <ToastContainer/>
       {status<3  &&(<div className="alert alert-warning">Payment will be available after Verification </div>)}
       {status>3  &&(<div className="alert alert-success">Payment done </div>)}
         {status==3  &&(<button className="btn btn-success py-2 px-4 mx-auto mt-2 d-flex justify-content-center" onClick={displayRazorpay}>
                    Pay 
                </button>)}

             {loading &&(<WaveTopBottomLoading/>)} 
            
            

       </div>
    </DBBase>
    </>
  );
  }

