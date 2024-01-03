import axios from "axios";
import React, { useEffect, useState } from "react";


const Cart =()=>{
  // const AxiosUrl="http://192.168.0.5:8081";
     const [cart,setCart]=useState([])
     const [localCart,setLocalCart]=useState(JSON.parse(localStorage.getItem("cart"))||[])
     const [sortedCart,setSort]=useState([])
     const [editableCart,setEditable]=useState([])
     const [total,setTotal]=useState(0)
     useEffect(()=>{
        setTimeout(()=>{
            setSort(JSON.parse(localStorage.getItem("cart"))||[])
          //  console.log("rerender")
        },100)
     },[editableCart])
    
     useEffect(()=>{
        //console.log("use effect called")
        setTimeout(()=>{

             setLocalCart(JSON.parse(localStorage.getItem("cart"))||[])
             //console.log("use effect called timer",localCart)
             SumOfTotal()
             //console.log("total------>total---->",total)
        },100)

        

     
     },[cart,total])


     useEffect(()=>{
        logic(localCart)
        setEditable(localCart)
        SumOfTotal()
      //console.log("sortedcrt-->",sortedCart)
     },[sortedCart,cart])

    

    const removeFromCart=(ind)=>{
     
      localCart.splice(ind,1)
      localStorage.setItem("cart",JSON.stringify(localCart))
      window.dispatchEvent(new Event("storage"));
      setCart(JSON.parse(localStorage.getItem("cart"))||[])
      if(localCart.length>0){
        console.log(1)
      }else{
        console.log(0)
        
      }


    }


    const logic=(localCart)=>{
        for(let i=0;i<localCart.length;i++){
         
            for(let j=i+1;j<localCart.length;j++){
            
                if(localCart[i].id===localCart[j].id){
                      localCart[i].qty+=1
                      localCart.splice(j,1)
                 
                }
              
            }
        }


      
      //  console.log("logic---->",localCart)
        setSort(localCart)

    }


    const changeValueqty=(ind,value)=>{
            // setEditable(...editableCart,editableCart[ind].price = +editableCart[ind].price * value)
            // if(value===undefined||value===NaN){
            //     value=0
            //     //console.log("changed value---> ",value)
            // }
            setEditable(...editableCart,editableCart[ind].qty = parseInt(value))
           // setEditable(...editableCart,editableCart[ind].price = parseInt(value)*parseInt(editableCart[ind].price))
            //console.log(value ,"-->value",ind,"-->index")
           // console.log("mapla---->",editableCart)
            //setSort(editableCart)
            localStorage.setItem("cart",  JSON.stringify(editableCart))
            window.dispatchEvent(new Event("storage"));
           
          
          // setLocalCart(JSON.parse(localStorage.getItem("cart"))||[])
          
          
    }
    // const handleDrecrement=(index,value)=>{
    //     // setSort(...sortedCart,sortedCart[index].qty-=1)
    //     if(value===1){
    //         value=1
    //     }else{
    //         value=value-1
    //     }
       
    //     changeValueqty(index,value)
    //     //setTotal(total-price)
    // }
    // const handleIncrement=(index,value)=>{

    //         value=value+1
       
    //     changeValueqty(index,value)
    // }
    const SumOfTotal=()=>{
        let value=0;
        if(sortedCart.length>0){
        sortedCart.map((data)=>{
            value= value+(data.qty*data.price)
            setTotal(value)
        })
    }else{
        setTotal(0)
    }
        
        
    }
    
    axios.default.withCredentials=true
    const handlePlaceOrder=async (userid)=>{
       
            console.log({user:userid,products:sortedCart,total:total})
            if(sortedCart.length>0){
            const res=await axios.post("http://192.168.0.5:8081/placeorder",{user:userid,products:sortedCart,total:total})
            if(res.data.message==="added"){
                localStorage.removeItem("cart")
                setEditable([])
            }else{
                alert("error")
            }
        }else{
            alert("no products listed")
        }
        
    }


    return(
        <>
       
<h1 class="mb-10 text-center text-2xl font-bold mt-[100px]">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
   
      <div class="rounded-lg md:w-2/3">
      {sortedCart.length>0?sortedCart.map((data,ind)=>{
       return(
        <div key={ind} class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={`http://192.168.0.5:8081/public/images/${data.image}`} alt={data.image} class="w-full rounded-lg sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">{data.name}</h2>
              <p class="mt-1 text-xs text-gray-700">Rs&nbsp;{data.price}</p>
            </div>
            <div class="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <select name="qty" onChange={(e)=>{changeValueqty(ind,e.target.value)}}  value={data.qty} className="h-8 w-16 text-center font-bold bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block" >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    
                </select>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm">{data.qty!==0?data.qty*parseInt(data.price):0} Rs</p>
                <button onClick={()=>removeFromCart(ind)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
              </div>
            </div>
          </div>
        
        </div>
    )}):

    <div  class="justify-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <h3 className="font-bold font-xl">Your Cart Is Empty</h3>
        
        </div>
        
    }
      </div>
      
      {/* <!-- Sub total --> */}
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">Rs.{total}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-green-700 ">Free</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">{total} Rupees</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button onClick={()=>window.confirm("confirm your order")?handlePlaceOrder(localStorage.getItem("UserId")):null} class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
      
    </div>
 


        </>
    )
}

export default Cart;