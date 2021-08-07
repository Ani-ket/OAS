import axios from "axios";
import { GoogleLogout } from "react-google-login";

export const authenticate=(data)=>{
    if(typeof window !=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
    
    }
}

export const isAuthenticated=()=>{
    if(typeof window =="undefined")
    return false;
    if(localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"))
    else
    return false

}

export const signout=next=>{
    if(typeof window !=="undefined"){
        localStorage.removeItem("jwt");
        next();
        return axios.get('/api/signout')
        .then(response=>console.log("Signout sucessfully"))
        .catch(err=>console.log(err))
    }
    try {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
        
    } catch (error) {
        
    }
}