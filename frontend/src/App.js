import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import User from "./components/User";
import Register from "./components/Registerform";
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/Admin/AdminHome";
import axios from "axios";
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import AdminOrder from "./components/Admin/AdminOrder";
import Fileupload from "./components/Admin/Fileupload";
import Product from "./components/Admin/Product";
import ViewProduct from "./components/viewProduct";
import AdminNavbar from "./components/Admin/AdminNavbar";

function App() {
  const [auth,setAuth]=useState(false)
  const [adminAuth,setAdminAuth]=useState(false)
  const [adminData,setAdminData]=useState(localStorage.getItem("Admin")||"user")
  const [cookies, setCookie,removeToken] = useCookies(["Token"]||false);
  const [admincookies, setadminCookie,removeadminToken] = useCookies(["Admin"]||false);
  axios.default.withCredentials=true;



  const LoadData=async ()=>{
        axios.post('http://192.168.0.5:8081/verify',cookies).then(res=>{
          console.log(res);
          if(res.data.Status==="Success"){
              setAuth(true);
          }else if(admincookies.Admin==="admin"){
            setAdminAuth(true)
          }else{
              setAuth(false);
              setAdminAuth(false)
          }
      })
  }
  useEffect(()=>{
      console.log(cookies);
     setTimeout(()=>{
      LoadData()
     },200)
     
  
}
  ,[cookies,admincookies])

  return (
    // <Product/>
    // <ViewProduct/>
    // <Fileupload/>
    <Router>
      {/* {adminData!=="user"?<AdminNavbar/>:<Navbar/>} */}
       <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <>
      {auth?
      <>
       <Route path="/Cart" element={<Cart/>}/>
      <Route path="/User" element={<User/>}/>
      </>
      :
      <>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      </>
      }
      </>
      {
        adminAuth?
        <>
         <Route path="/adminHome" element={<AdminHome/>}/>
         <Route path="/adminOrder" element={<AdminOrder/>}/>
        </>
        :"null"
      }
     
    </Routes>
    </Router>
    
  );
}

export default App;
