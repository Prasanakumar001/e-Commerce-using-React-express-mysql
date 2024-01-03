import Product from './Product'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Login from '../Login'


const AdminHome = () => {
  
  const [auth,setAuth]=useState(false)
  const [cookies, setCookie,removeToken] = useCookies(["Admin"]||false);
 
  axios.default.withCredentials=true;

  const LoadData=async ()=>{
        axios.post('http://192.168.0.5:8081/verify',cookies).then(res=>{
          console.log(res);
          if(res.data.Status==="Success"){
              setAuth(true);
          }else if(cookies.Admin==="admin"){
           
               setAuth(true);
          }else{
              setAuth(false);
             
          }
      })
  }
  useEffect(()=>{
      console.log("cookie",cookies.Admin);
     setTimeout(()=>{
      LoadData()
     },100)
     
}
,[])

  return (
    <div className='mt-20'>
       <>
        {
            auth?
           <div className="mt-10">
          
          <Product/>
           </div> 
           
           :
           <div className="mt-[70px]">
           
            
            {setTimeout(()=>{return(
              <>
            <center className="font-semibold">Kindly Login To Proceed</center>
            <Login/>
            </>
            )},1000)}
           </div> 
         }
        </>
     
    </div>
  )
}

export default AdminHome
