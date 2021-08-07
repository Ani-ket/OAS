import axios from "axios"
export const getUserStatus=(userid)=>{
   axios.get(`/api/status/${userid}`)
        .then(res=>{console.log(res);return res.data.status;})
        .catch(err=>{return err})
}
export const getappid=(userid)=>{
        axios.get(`/api/application/${userid}`)
             .then(res=>{console.log(res);return res.data;})
             .catch(err=>{})
     }