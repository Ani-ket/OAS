
import React,{useEffect,useState} from 'react';
import { isAuthenticated } from '../auth';
import APBase from './APBase';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Link } from 'react-router-dom';

 function Notice() {
    const {data} =isAuthenticated();
     const[notices,setNotices]=useState([])
     const [cng,setcng]=useState(0)
    const [values, setValues] = useState({
     title:"",
     body:"",
     attachment:"",
     formData:"",
     loading:false,
     success:false
     });
     const{title,body,attachment,formData}=values;
    
    const preload=()=>{
     
  setValues({...values,formData:new FormData()})
             
 }
const getallnotice=()=>{
    axios.get(`/api/notice/all`)
    .then(res=>setNotices(res.data))
      .catch(err=>{toast.error(err.response.data.err)})
  
}
 
  useEffect(() => {
    preload();
    getallnotice();
  }, [cng])

  const handleChange=name=>event=>{
    const value= name==="attachment" ? event.target.files[0] :event.target.value;
  
    formData.set(name,value)
     setValues({...values,[name]:value})
}

const onSubmit=(event)=>{
  event.preventDefault();
 
  setValues({...values,error:"",loading:true});
   
    axios.post(`/api/notice/create/${data.user._id}`,formData,{
            headers:{
                Authorization:`Bearer ${data.token}`
            }
        }).then((data)=>{ setValues({...values, 
            title:"",
            body:"",
            attachment:"",
            loading:false,
            success:true,
      
       })
       if(data.data)
       toast.success("Notice Created")
       setcng(cng+1)
        
      })
        .catch(err=>{ 
          setValues({...values, 
            title:"",
            body:"",
            attachment:"",
            loading:false,
            success:false
         
         });
         toast.error(err.response.data.error)
         setcng(cng+1)
        }
        )

      }
 const deleteNotice=(nid)=>{
   axios.delete(`/api/notice/${nid}/${data.user._id}`,{
     headers:{
       Authorization:`Bearer ${data.token}`
     }
   }).then(res=>{
     toast.success("Notice Deleted")
     getallnotice()
   }).catch(err=>{
     console.log("error notice:",err)
     toast.error("Unable to delete")
   })
 }

    const noticeForm = () => (
        <form className="col-md-9 mx-auto" >
            
              <div className="form-group">
            <input
              onChange={handleChange("title")}
              name="title"
              className="form-control"
              placeholder="Title"
              value={title}
            />
          </div>
              <div className="form-group">
            <input
              onChange={handleChange("body")}
              name="body"
              className="form-control"
              placeholder="body"
              value={body}
            />
          </div>
       
          
   
          <span>Attachment</span>
          <div className="form-group">
            <label className="btn btn-block btn-primary">
              <input
                onChange={handleChange("attachment")}
                type="file"
                name="attachment"
               
                placeholder="choose a file"
              />
            </label>
          </div>
      
          <button type="submit" onClick={onSubmit} className="btn btn-outline-primary mb-3">
            Create Notice
          </button>
        </form>
      );

  return (
    <>
    <APBase>
    <ToastContainer/>
    <div className="col-md-9">
      
        <div className="panel panel-default">
              <div className="panel-heading bg-primary">
                <h3 className="panel-title p-2">Manage Notices</h3>
              </div>
              <div className="panel-body">
                <div className="row">
         
                </div>
                <br/>

                <table className="table table-striped table-hover">
                      <tr>
                        <th>Title</th>
                        <th>body</th>
                        <th>time</th>
                        <th></th>
                      </tr>
                      {notices.map((notice,index)=>{
                        return(
                          <tr key={index}>
                        <td>{notice.title}</td>
                        <td>{notice.body}</td>
                        <td>{notice.createdAt}</td>
                        <td> <Link class="btn btn-danger" onClick={()=>{deleteNotice(notice._id)}} >Delete</Link></td>
                      </tr>
                        )
                      })}
                     
                
                      
                    </table>
              </div>
              </div>


        <div className="row">
          
            {noticeForm()}
            
        </div>
    </div>
    </APBase>
    
    </>
  );
}
export default Notice;