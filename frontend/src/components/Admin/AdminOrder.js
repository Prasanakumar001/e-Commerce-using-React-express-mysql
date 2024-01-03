import React,{useState,useEffect} from 'react'
import axios from 'axios';

const AdminOrder = () => {
  //const AxiosUrl="http://192.168.0.5:8081";
  const [orders,setOrders]=useState([])
  const [search,setSearch]=useState("")
  const[showModel,SetShowModal]=useState("");

  useEffect(()=>{
    fetchData()
  },[])

 axios.default.withCredentials=true;

  const fetchData= async()=>{
       const res= await axios.get(`http://192.168.0.5:8081/manageorders/`) 
       setOrders(res.data.data)
     
  }
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }
 
  return (
    <>
      <div class="mx-auto border-3 border-gray-950 mt-[100px] max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900  flex justify-between">Customer's Market History
     <div>
     <div class="relative ">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={(e)=>setSearch((e.target.value))}  id="default-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Customer name" />
      
   </div>
     </div>
     </h2>
     </div>
     <div class="mx-auto border-3 border-gray-950  max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                    S.no
                </th>
                <th scope="col" class="px-6 py-3">
                    Customer Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Order Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Total
                </th>
                <th scope="col" class="px-6 py-3">
                    Timestamp
                </th>
                <th scope="col" class="px-6 py-3">
                    Show 
                </th>
            </tr>
        </thead>
        <tbody>
        { !search ? orders.map((item, index) => {
    return (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td class="px-6 py-4">
                    {index+1}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {item.name}
                </th>
                <td class="px-6 py-4">
                    {item.id}
                </td>
                <td class="px-6 py-4">
                    {item.total}
                </td>
                <td class="px-6 py-4">
                    {item.timestamp}
                </td>
                <td class="px-6 py-4">
                <button onClick={()=>SetShowModal(item.id)} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                 Show Products
                 </button>
                 <div  class={showModel===item.id?"fixed  backdrop-blur-sm bg-white/30 flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full":"hidden"}>
    <div class="relative w-full max-w-2xl max-h-ful ">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Number : {item.id}
                </h3>
                <button type="button" onClick={()=>SetShowModal("")} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-6 space-y-2">
               <p className='font-medium text-gray-900 '> Customer Number:{item.name}</p>
                <p className='font-medium text-gray-900 '>Total:{item.total}</p>
            </div>
            <div class="p-6 space-y-6">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                    S.no
                </th>
                <th scope="col" class="px-6 py-3">
                    Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Qty
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
           { item.products.map((c, i) => (
            <tr key={i}>
                  <td class="px-6 py-4">
                    {i+1}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {c.name}
                </th>
                <td class="px-6 py-4">
                    {c.qty}
                </td>
                <td class="px-6 py-4">
                    {c.price}
                </td>
            </tr>
           ))}
           </tbody>
           </table>




             
            </div>
            
           
        </div>
    </div>
</div>
                </td>
            </tr>
    )}
    
     
        )  
    
        
 :
 orders.filter(data => {return (data.name.includes(search.toLocaleLowerCase()))}).map((item1, index1) => {
    return (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index1}>
                <td class="px-6 py-4">
                    {index1+1}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {item1.name}
                </th>
                <td class="px-6 py-4">
                    {item1.id}
                </td>
                <td class="px-6 py-4">
                    {item1.total}
                </td>
                <td class="px-6 py-4">
                    {item1.timestamp}
                </td>
                <td class="px-6 py-4">
                <button onClick={()=>SetShowModal(item1.id)} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                 Show Products
                 </button>
                 <div  class={showModel===item1.id?"fixed  backdrop-blur-sm bg-white/30 flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full":"hidden"}>
    <div class="relative w-full max-w-2xl max-h-ful ">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Number : {item1.id}
                </h3>
                <button type="button" onClick={()=>SetShowModal("")} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-6 space-y-2">
               <p className='font-medium text-gray-900 '> Customer Number:{item1.name}</p>
                <p className='font-medium text-gray-900 '>Total:{item1.total}</p>
            </div>
            <div class="p-6 space-y-6">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                    S.no
                </th>
                <th scope="col" class="px-6 py-3">
                    Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Qty
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
           { item1.products.map((c, i) => (
            <tr key={i}>
                  <td class="px-6 py-4">
                    {i+1}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {c.name}
                </th>
                <td class="px-6 py-4">
                    {c.qty}
                </td>
                <td class="px-6 py-4">
                    {c.price}
                </td>
            </tr>
           ))}
           </tbody>
           </table>




             
            </div>
            
           
        </div>
    </div>
</div>
                </td>
            </tr>
    )}
    
     
        )  
 
 
 }
 </tbody>
 </table>
</div>
     
       





      

    

    </>
    
  )
}

export default AdminOrder