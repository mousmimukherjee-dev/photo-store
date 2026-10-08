import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

const Photopage = async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params

  const supabase= await createClient();

  const{data: photo,error} = await  supabase.from("photos").select("*").eq("id",id).single();

  if(error || !photo){

    notFound();
    
  }

  const{data} = supabase.storage.from("photos").getPublicUrl(photo.storage_path,{download:true})

  
  
  
  
  return (
    <main className="mx-auto px-4 py-10 flex justify-between gap-20 items-start">
      <img src={data.publicUrl} alt={photo.file_name} className="max-w-[70%] max-h-[70vh] rounded-2xl object-contain"/>
       <div className="mt-6">
        <h1 className="text-xl font-semibold">{photo.file_name}</h1>
        <a href={data.publicUrl}  className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white">Download</a>
       </div>
    </main>
  )
}

export default Photopage