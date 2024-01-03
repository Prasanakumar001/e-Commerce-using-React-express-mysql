import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import ViewProduct from "./viewProduct";
import Login from "./Login";

const Home =(props)=>{
     //const AxiosUrl="http://192.168.0.5:8081";
    const [auth,setAuth]=useState(false)
    const [cookies, setCookie,removeToken] = useCookies(["Token"]||false);
   
    axios.default.withCredentials=true;
  
    const LoadData=async ()=>{
          axios.post('http://192.168.0.5:8081/verify',cookies).then(res=>{
            console.log(res);
            if(res.data.Status==="Success"){
                setAuth(true);
            }else{
                setAuth(false);
            }
        })
    }
    useEffect(()=>{
        console.log(cookies);
       setTimeout(()=>{
        LoadData()
       },10)
       
    
}
    ,[cookies])
    const handleLogout=()=>{
        //document.cookie = oken +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        removeToken(['Token']);
        setAuth(false);
        
        // axios.get('http://192.168.0.23:8081/logout').then(res=>{
        //     if(res.data.Message==="Success"){
        //         Location.reload(true);
        //     }
        // })
    }
    
    return(
        <>
        {
            auth?
           <div className="mt-10">
          
           <ViewProduct/>
           </div> 
           
           :
           <div className="mt-[70px]">
           
            <center className="font-semibold">Kindly Login To Proceed</center>
            <Login/>
           </div> 
         }
        </>
    )
}

export default Home;