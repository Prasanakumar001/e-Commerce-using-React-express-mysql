import React, { useState,useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import ViewProduct from "./viewProduct";
import Home from "./Home";

const Navbar =()=>{
  //const AxiosUrl="http://192.168.0.5:8081";
    const [nav,setNav]=useState(false);
    const [auth,setAuth]=useState(false);
    const [cookies, setCookie,removeToken] = useCookies(["Token"]||false);
    const [AdminCookies,setAdminCookies,removeAdminCookies]= useCookies(['Admin']||false);

    const [adminauthoised,setAdminAuthorised]=useState(localStorage.getItem("Admin"));
    const [adminBool,setAdminbool]=useState(false)

    const Navigate= useNavigate();
    axios.default.withCredentials=true;
  
    const LoadData= async ()=>{
      await axios.post('http://192.168.0.5:8081/verify',cookies).then(res=>{
            console.log(res);
            if(res.data.Status==="Success"){
                setAuth(true); 
                setAdminbool(false)
            }else if(AdminCookies.Admin==="admin"){
                setAdminbool(true)
                setAuth(true);
            }else{
                setAuth(false); 
                setAdminbool(false)
            }
        })
    }
    // const getCookiesNav = async ()=>{
    //     if(cookies.Token){
    //         setAuth(true);
           
    //     }else{
    //         setAuth(false);
            
    //     }
    // }
    useEffect(()=>{
        //console.log(cookies);
       
         setTimeout(()=>{
         //console.log("navbar called ");
         LoadData()
        },100)
    }
    ,[cookies,AdminCookies])

    
  
    const handleLogout=()=>{
       
        removeToken(['Token']);
        removeAdminCookies(['Admin'])
        localStorage.removeItem("Admin")
        setAuth(false);
        setNav(false);
        setAdminbool(false);
        localStorage.clear();
        Navigate("/")

        // window.location.reload(true);
        
        
    }
    const handleNav=()=>{
        setNav(!nav);
    }

    return(
        <>
        {/* <nav>
            <Link  to="/">home</Link>
            <Link to="/Cart">cart</Link>
            <Link to="/User">user</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
        </nav> */}
{adminBool?
<>

<nav class=" backdrop-blur-sm bg-white/30  py-2 fixed top-0 w-full">
<div class="flex justify-between w-3/7 md:max-w-7xl mx-auto">
<div  class="text-black rounded-md px-3 py-2 text-2xl font-medium flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>
Ecommerce
</div>
<div class="flex px-3 ">
{auth?""
: <>  
<Link to="/Login" class=" text-black rounded-md px-3 py-2 mx-1.5 text-sm font-medium  sm:hidden border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Login</Link>
   <Link to="/Register" class=" text-black rounded-md px-3 py-2 mx-1.5 text-sm font-medium  sm:hidden border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Register</Link>
    </>}
   {
    auth?
<button class=" sm:hidden" onClick={handleNav}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
  </svg>
  <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
</button>
:""
}

</div>


<div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
           {
            auth?
            <>
            <Link to="/adminHome" class=" text-black rounded-md px-3 py-2 text-sm font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
Home</Link>
           <Link to="/adminOrder" class=" text-black rounded-md px-3 py-2 text-sm font-medium  flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
Manage Orders

</Link>
        
          
        
</>
           :""
} 
            {
            auth?  
            <button onClick={handleLogout}   class="flex items-center text-black px-3 py-2 text-sm font-medium border-l-slate-900 border-s"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout</button>
            :""
        }
            {auth?"":<>
            
           <Link to="/Login" class=" text-black rounded-md px-3 py-2 text-sm font-medium  border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Login</Link>
           <Link to="/Register" class=" text-black rounded-md px-3 py-2 text-sm font-medium  border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Register</Link>
           </>
        }
          </div>
        </div>
</div>
 {
    // nav?"open":"close"
 }
  <div class={nav?"sm:hidden":"hidden"} id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
     
      <Link to="/adminHome"  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Home</Link>
      <Link to="/adminOrder"  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Cart</Link>
      <button onClick={handleLogout}  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Logout</button>
    
    </div>
  </div>

</nav>





</>
  
  :<>
{/* //   <!--------user--------------------> */}
        <nav class=" backdrop-blur-sm bg-white/30  py-2 fixed top-0 w-full">
<div class="flex justify-between w-3/7 md:max-w-7xl mx-auto">
<div  class="text-black rounded-md px-3 py-2 text-2xl font-medium flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>
Ecommerce
</div>
<div class="flex px-3 ">
{auth?""
: <>  
<Link to="/Login" class=" text-black rounded-md px-3 py-2 mx-1.5 text-sm font-medium  sm:hidden border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Login</Link>
   <Link to="/Register" class=" text-black rounded-md px-3 py-2 mx-1.5 text-sm font-medium  sm:hidden border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Register</Link>
    </>}
   {
    auth?
<button class=" sm:hidden" onClick={handleNav}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
  </svg>
  <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
</button>
:""
}

</div>


<div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
           {
            auth?
            <>
            <Link to="/" class=" text-black rounded-md px-3 py-2 text-sm font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
Home</Link>
           <Link to="/Cart" class=" text-black rounded-md px-3 py-2 text-sm font-medium  flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
Cart

</Link>
        
           {/* <Link to="" class=" text-black rounded-md px-3 py-2 text-sm font-medium">About</Link> */}
           <Link to="/User" class=" text-black rounded-md px-3 py-2 text-sm font-medium  flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
Orders</Link>
        
</>
           :""
} 
            {
            auth?  
            <button onClick={handleLogout}   class="flex items-center text-black px-3 py-2 text-sm font-medium border-l-slate-900 border-s"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout</button>
            :""
        }
            {auth?"":<>
            
           <Link to="/Login" class=" text-black rounded-md px-3 py-2 text-sm font-medium  border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Login</Link>
           <Link to="/Register" class=" text-black rounded-md px-3 py-2 text-sm font-medium  border-emerald-500 border hover:text-slate-50 hover:bg-emerald-500 duration-700">Register</Link>
           </>
        }
          </div>
        </div>
</div>
 {
    // nav?"open":"close"
 }
  <div class={nav?"sm:hidden":"hidden"} id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
     
      <Link to="/"  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Home</Link>
      <Link to="/Cart"  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Cart</Link>
      {/* <a href="#" class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >About</a> */}
      <Link to="/User"  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Orders</Link>
      <button onClick={handleLogout}  class= "text-black block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white" >Logout</button>
    
    </div>
  </div>

</nav>

      
      
      </>
      }
    </>
    )
}

export default Navbar;