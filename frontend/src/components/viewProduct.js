import React, { useState,useEffect } from 'react'
import axios from 'axios'

const ViewProduct = (props) => {
    const [search,setSearch]=useState("")
    const [view,setView]=useState([])
    const [addToCart,setAddToCart]=useState([])
    const [localCart,setLocalCart]=useState(JSON.parse(localStorage.getItem("cart"))||[])

    axios.default.withcredentials=true
    const fetchData=async()=>{
      const res = await axios.get("http://192.168.0.5:8081/productdata")
      setView(res.data)
      console.log("local cart --->",localCart)
      
      setAddToCart(localCart)
   }
   useEffect(()=>{
    fetchData()
    console.log("1")
   },[])
   useEffect(()=>{
    console.log("2")
    //console.log("got from Ls--->",addToCart)
    if(addToCart.length>0){
      localStorage.setItem("cart", JSON.stringify(addToCart));
    }
    

   },[addToCart])

    const handleAddToCart=(id,name,price,image)=>{
        if(addToCart.length<=0 ){
            setAddToCart([{id:id,name:name,price:price,qty:1,image:image}])
            
          
        }else{
           
           setAddToCart([...addToCart,{id,name,price,qty:1,image}])
           //console.log(addToCart)
    
        }
    }




    const handleSearch=(e)=>{
      setSearch(e.target.value)
      // return (<ViewProduct name={search}/>)
    }

  return (
    <>
    <div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900  flex justify-between">Customer's Market Place
     <div>
     <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={(e)=>{handleSearch(e)}} id="default-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
   </div>
     </div>
     </h2>
     
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">


    {/* {view.length>0 ? view.map((data,ind)=>{
      return(
    <div class="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
      <div class="prod-title">
        <p class="text-2xl uppercase text-gray-900 font-bold">{data.name}</p>
        <p class="uppercase text-sm text-gray-400">
           Quality Assured
        </p>
      </div>
      <div class="prod-img">
        <img  src={`http://192.168.0.23:8081/public/images/${data.image}`} alt={data.image}
             class="w-full object-cover object-center" />
      </div>
      <div class="prod-info grid gap-2">
        <div className='text-center'>
        <p class="font-bold text-xl pt-5">Rs.{data.price}</p>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center text-gray-900">
         
          <button  onClick={()=>handleAddToCart(data.id,data.name,data.price,data.image)} 
                  class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>
        </div>
      </div>
    </div>

   
)}):
"no data"
} */}

{ !search ? view.map((data,ind)=>{
      return(

<div class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow h-[150px] dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div class="flex items-center justify-between">
        <div>
            <div class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5">
             <p  class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5 font-bold text-center capitalize"> {data.name}</p>
              
            </div>
            <div class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5">
            <p  class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5 font-bold text-center capitalize">price: {data.price}</p>
              
            </div>
            <button  onClick={()=>handleAddToCart(data.id,data.name,data.price,data.image)} 
                  class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12">
        <img  src={`http://192.168.0.5:8081/public/images/${data.image}`} alt={data.image}
             class="w-full object-cover object-center"  height="100px" width="100px"/>

        </div>
    </div>
</div>


        )}):
         view.filter(data => {return (data.name.includes(search.toLocaleLowerCase()))}).map(value =>{return (
          <div class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow h-[150px] dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div class="flex items-center justify-between">
        <div>
            <div class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5">
             <p  class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5 font-bold text-center capitalize"> {value.name}</p>
              
            </div>
            <div class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5">
            <p  class="h-4.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5 font-bold text-center capitalize">price: {value.price}</p>
              
            </div>
            <button  onClick={()=>handleAddToCart(value.id,value.name,value.price,value.image)} 
                  class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12">
        <img  src={`http://192.168.0.5:8081/public/images/${value.image}`} alt={value.image}
             class="w-full object-cover object-center"  height="100px" width="100px"/>

        </div>
    </div>
</div>

        )})
      
}

    
    
    </div>
  </div>
</div>
    
</>
  )
}

export default ViewProduct