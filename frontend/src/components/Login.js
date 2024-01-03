import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Login =()=>{
     //const AxiosUrl="http://192.168.0.5:8081";
    const [cookies, setCookie] = useCookies(['Token']);
    const [AdminCookies,setAdminCookies]= useCookies(['Admin'])
   // const [cookies, setCookie,removeToken] = useCookies(["Token"]||false);
   //const [shareAuth,setshareAuth]=useState(false);

    const navigate= useNavigate();
    const [formData,setFormData]=useState([{
        name:'',
        phonenumber:''
    }])
    
    axios.default.withCredentials = true;

    const handleSubmit=(e)=>{
          e.preventDefault()
         console.log(formData);
       
         axios.post("http://192.168.0.5:8081/Login",formData).then
         (res => {
            //console.log(res)
            if(res.data.Status==="success"){
               
               setCookie('Token', res.data.Token, { path: '/' });
               localStorage.setItem('UserId',res.data.id)

                navigate("/")
            }else if(res.data.Status==="Access"){
              setCookie('Admin', "admin", { path: '/' });
                localStorage.setItem('Admin',"admin")
                navigate("/adminHome")
            }else{
                alert("thappu")
                console.log(res.data.Message)
            }
        }).catch(err=>console.log(err));
    
    }

    return(
        <>
        {/* <h1>Login Form</h1> */}
        {cookies.Token?"you are logged in"
        :
       
       <div className="flex justify-center align-items-center mt-[70px]">

       
        <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2 border-b-2  py-2" >
              Login Form
            </label>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"  name="name" onChange={(e)=> setFormData({...formData,name:e.target.value})}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Phonenumber
            </label>
            <input class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=> setFormData({...formData,phonenumber:e.target.value})}/>
        
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login Now
            </button>
            {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a> */}
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2023 Pk Corp. All rights reserved.
        </p>
      </div>
      </div>
       }
        </>
    )
}

export default Login;