import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const PhotoGrid= async()=>{

  const supabase = createClient();

  const{data: photos,error} = await (await supabase).from("photos").select("*").order("created_at",{ascending:false})

  if(error){

    console.error("Error fetching problem", error)
    return <p>Could not upload photos</p>
  }

  return(

    <section className="max-w-7xl px-4 py-10 mx-auto">
      {photos.length === 0 ? "No photos uploaded yet" : (

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {photos.map(async (photo)=>{

            const{data} = (await supabase).storage.from("photos").getPublicUrl(photo.storage_path)

            return (

              <Link href={`/photos/${photo.id}`} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">

                <img src={data.publicUrl} alt={photo.file_name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>

                <p className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white">{photo.file_name}</p>
              </Link>
            )
          })}
        </div>
      )}

    </section>
  )



}

export default PhotoGrid