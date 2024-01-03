import axios from 'axios';
import React, { useState,useRef } from 'react'

const Fileupload = () => {
  const AxiosUrl="http://192.168.0.5:8081";
    const [file,setFile]=useState();
    const [fileName,setFileName]=useState();
    const fileInput = useRef();
     const saveFile=()=>{
       setFile(fileInput.current.files[0]);
       setFileName(fileInput.current.files[0].name);
     }
     axios.default.withcredentials=true;
     const uploadFile= async()=>{
         const formData=new FormData();
         formData.append('file',file);
         formData.append('filename',fileName);
         try{
            const res= await axios.post(`${AxiosUrl}/upload`,formData);
            console.log(res.data.Message);
         }
         catch(ex){

         }
     }
  return (
    <>
    <input type="file" ref={fileInput} onChange={saveFile}></input>
    <button onClick={uploadFile}>upload</button>
    </>
  )
}

export default Fileupload