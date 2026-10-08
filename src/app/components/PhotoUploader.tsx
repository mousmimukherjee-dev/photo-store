"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/browser";


export default function PhotoUploader(){

  const[uploading , setUploading] = useState(false);


  const handleFileUpload= async (e:React.ChangeEvent<HTMLInputElement>)=>{
   
   const file = e.target.files?.[0]

   if(!file) return;

   try{

     setUploading(true)

     const{data:{user}} = await supabase.auth.getUser();

     if(!user){

      throw new Error("Please log in frist")
     }

     const filePath= `user_uploads/${user.id}/${crypto.randomUUID()}-${file.name}`

     const{error: uploadError} = await supabase.storage.from("photos").upload(filePath,file)

     if(uploadError) throw uploadError

     const{error:databaseError} = await supabase.from("photos").insert({

      user_id: user.id,
      file_name: file.name,
      storage_path: filePath

     })

     if(databaseError) throw databaseError

   }
   catch(error){

    console.error("upload error:",error)
   }finally{

    setUploading(false);
    e.target.value=""

   }


  }



  return(

    <label >
      {uploading ? "Uploading....." : "Upload Photo"}
      <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} accept="imgae/"/>
    </label>
    
  )
} 
