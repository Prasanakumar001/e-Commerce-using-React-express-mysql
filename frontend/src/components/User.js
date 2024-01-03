import React, { useEffect, useState } from "react";
import axios from "axios";

const User =()=>{
 // const AxiosUrl="http://192.168.0.5:8081";
    const userid=useState(localStorage.getItem("UserId")||0)
    const [orders,setOrders]=useState([])
    const [sortOrders,setSortOrders]=useState([])
    const [tempOrders,setTempOrders]=useState([])
    const[showModel,SetShowModal]=useState("");
   // const [products,setProduct]=useState([])
   axios.default.withCredentials=true;

    const fetchData= async()=>{
         const res= await axios.get(`http://192.168.0.5:8081/orders/${userid}`) 
         setOrders(res.data.data)
         setSortOrders(res.data.data)

        
        
    }
    useEffect(()=>{
        fetchData()
       
       console.log(orders.length)
    },[])


    useEffect(()=>{
      // setSortOrders(tempOrders)
    },[tempOrders])
    useEffect(()=>{
       // parse(sortOrders.length)
        //console.log("efrct called")
        //console.log(orders.length)
    },[orders])
  

    
    
    
    return(
        <>
        
        <div className="mx-2 md:mx-20 ">
        <div className="mt-[100px] mb-5">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Purchased History</h2>
        </div>

  


{orders.map((item, index) => {
    return (
      <>
<div class=" border-2 bg-slate-400 rounded-lg h-14 flex justify-between "  key={index}>
    <div class=" w-full flex justify-between">
      <div class=" ">
        <p class="font-semibold text-slate-950 ">Order Number</p>
        <p class="font-bold text-slate-50 text-center">{item.id}</p>
      </div>
       <div class="  hidden sm:block ">
         <p class="font-semibold text-slate-950 ">Date Placed</p>
         <p class="font-bold text-slate-50 text-center">{item.timestamp}</p>
       </div>
        <div class=" ">
          <p class="font-semibold text-slate-950 ">Total Amount</p>
        <p class="font-bold text-slate-50 text-center">Rs.{item.total}</p>
        </div>
       
        <div>
          {
            showModel===item.id?
            <button type="button"  onClick={()=>SetShowModal('')} class="py-2.5 mt-1 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Hide</button>
             :
             <button type="button"  onClick={()=>SetShowModal(item.id)} class="py-2.5 mt-1 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View</button>
    
          }
       
        </div>
    </div>
    {/* <div class="w-48 flex justify-center items-center">
       <button type="button" class="py-2.5 mt-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View Invoice</button>
    </div> */}
</div>
 { 
  item.products.map((c, i) => (
           
<div  class= {showModel===item.id?"border-1 border-b-gray-400 rounded-lg h-[200px] flex justify-start ":"hidden"} >
<div class=" w-56 flex justify-center items-center">
  <div class=" w-48 h-44">
  <img  src={`http://192.168.0.5:8081/public/images/${c.image}`} alt={c.image}
             class=" object-cover object-center w-48 h-44 overflow-hidden"   />
  </div>
</div>
<div class=" w-96">
  <h1 class="font-bold text-3xl mt-2 capitalize ">{c.name}</h1>
   <h1 class="font-normal text-sm mt-2 capitalize">Qty:{c.qty}&nbsp;Rs.{c.price}/-</h1>
   <h1 class="font-normal text-sm mt-2 capitalize">Total Rs.{item.total}/-</h1>
   <button type="button" class="mt-3 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Buy Again</button>
  
</div>

</div>
))}{" "}
</>
    );
  })}
        

        </div>
        </>
    )
}

export default User;