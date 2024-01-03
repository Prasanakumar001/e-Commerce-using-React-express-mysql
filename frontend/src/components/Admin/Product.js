import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Product = () => {
  
    const [file,setFile]=useState();
    const [fileName,setFileName]=useState();
    const fileInput=useRef();
    const [view,setView]=useState([])
    const [editable,setEditable]=useState('')
    const[bool,setBool]=useState(false);
    const [editName,setEditname]=useState('')
    const [editQty,setEditQty]=useState('')    
    const [editprice,setEditprice]=useState('')    
    const fetchData=async()=>{
      const res = await axios.get("http://192.168.0.5:8081/productdata")
      setView(res.data)
   }
   useEffect(()=>{
    fetchData()
   },[])


    axios.default.withcredentials=true
    const [product,setProduct]=useState({ 
      productname:'',
        productprice:'',
        productqty:''
        
    });
    
  
    
  
   const handleSubmit= (e)=>{
        e.preventDefault()
        //console.log(file)
        const formData=new FormData();
      
        for (let key in product) {
            formData.append(key, product[key]);
        }

        formData.append('file',file);
        formData.append('filename',fileName);
        axios.post('http://192.168.0.5:8081/uploadDetails',formData).then(
          res=>{
          alert(res.data.Message)
          setProduct({  productname:'',
          productprice:'',
          productqty:''
          })
          setFile(fileInput.current.value='')
          setFileName(fileInput.current.value='')
          setTimeout(()=>{
            fetchData()
          },100)

    })
         
  }

  const editData=(id,name,qty,price)=>{
    console.log(name,price,qty,id)
    setEditable(id);
    setEditQty(qty)
    setEditname(name)
    setEditprice(price)
  }

  const deleteData= async(id)=>{ 
    const res= await axios.delete(`http://192.168.0.5:8081/deleteadminproduct/${id}`)
    console.log(res.data)
      console.log(id)
    if(res.data.message==="success"){
        console.log("deleted")
        setTimeout(()=>fetchData(),100)
    }
  }
   const handleEditsubmit= async(id)=>{
    setBool(true)
    console.log("editdata--->",editName,editQty,editprice)
    try{
    const res = await axios.post(`http://192.168.0.5:8081/editadmindata/${id}`,{name:editName,price:editprice,qty:editQty})
   // const res = await axios.patch(`${AxiosUrl}${id}`,{name:editName,phonenumber:editPhonenumber})
    console.log(res.data.data)
    setEditable('') 
    setTimeout(()=>fetchData(),100)  
    setBool(false)
    }catch(err){
        console.log("not edited")
    }
   }


  return (
    <>
      



      <div className="flex justify-center align-items-center">

       
<div class="w-full max-w-xs">
<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2 border-b-2  py-2" >
      Add Product
    </label>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
      product Image:
    </label>
    {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file"  onChange={saveFile} ref={fileInput}   required/>
    */}
    <input type="file"  onChange={(e)=>setFile(e.target.files[0])}  ref={fileInput} required/> 
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
      name:
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="product name"  name="productname" onChange={(e)=>setProduct({...product,productname:e.target.value})}  value={product.productname} required/>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
      price
    </label>
    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="price" onChange={(e)=>setProduct({...product,productprice:e.target.value})}  value={product.productprice} required/>

  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty">
      qty
    </label>
    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="qty" type="text" placeholder="qty" onChange={(e)=>setProduct({...product,productqty:e.target.value})} value={product.productqty} required/>

  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
     Add
    </button>
    {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      Forgot Password?
    </a> */}
  </div>
</form>
<p className="text-center text-gray-500 text-xs">
  &copy;2023 Pk Corp. All rights reserved.
</p>
</div>
</div>



    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-6 py-3">
                    S.no
                </th>  
                <th scope="col" class="px-6 py-3">
                    Image 
                </th>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    price
                </th>
                <th scope="col" class="px-6 py-3">
                    qty
                </th>
                <th scope="col" class="px-6 py-3">
                <span class="sr-only">delete</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
        
    {view.length>0 ? view.map((data,ind)=>{
      return(
      <tr key={ind}  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-6 py-4" scope="row">{ind+1}</td>
        <td class="px-6 py-4" scope="row">
        <img src={`http://192.168.0.5:8081/public/images/${data.image}`} alt={data.image} height={100} width={100}/>
        
        </td>
        <td  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          
          {editable!==data.id?data.name:<input type="text" name="editname" onChange={(e)=>setEditname(e.target.value)} value={editName}  />}
          </td>
        <td class="px-6 py-4" scope="row">
          
        {editable!==data.id?data.price:<input type="text" name="editprice" onChange={(e)=>setEditprice(e.target.value)} value={editprice}  />}
        </td>
        <td class="px-6 py-4" scope="row">
         
          {editable!==data.id?data.qty:<input type="text" name="editQty" onChange={(e)=>setEditQty(e.target.value)} value={editQty}  />}
        </td>
        <td class="px-6 py-4" scope="row">
        
        {
           editable!==data.id?<button onClick={()=>editData(data.id,data.name,data.qty,data.price)}>edit</button>
                        :
                        <button onClick={()=>{setEditname('');setEditprice('');setEditQty('');handleEditsubmit(data.id)}} disabled={bool}>submit</button>
                    }
        </td>
        <td class="px-6 py-4" scope="row">
        {/* <button onClick={()=>deleteData(data.id)}>delete</button> */}
        {
                        editable!==data.id?<button onClick={()=>deleteData(data.id)} disabled={bool}>delete</button>
                        :
                        <button onClick={()=>{setEditable('');setEditname('');setEditprice('');setEditQty('');}} disabled={bool}>cancel</button>
                    }
        </td>
      </tr>
      )}
      
    ):
    <tr><td>no data available</td></tr>
    }
    </tbody>
    </table>
</div>

    </>
  

  )
}

export default Product