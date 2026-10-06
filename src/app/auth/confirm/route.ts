import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { verify } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request : Request){

  const { searchParams } = new URL(request.url)

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") || "/";

  const cookieStore= await cookies();

const supabase= createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    cookies:{
      

      getAll(){

        return cookieStore.getAll()
      },

      setAll(cookiesToSet){
       
        cookiesToSet.forEach(({name,value,options})=>{

          cookieStore.set(
            name,
            value,
            options
          )
        })

      }
    }
  }
)

if(!tokenHash || !type){

  return NextResponse.redirect(new URL("/error", request.url))
}

const{ error} = await supabase.auth.verifyOtp({

  type,
  token_hash:tokenHash,
})

if(error){

  console.error(error.message)
  return NextResponse.redirect((new URL("/error", request.url)))
}


return NextResponse.redirect(new URL(next, request.url))




}

