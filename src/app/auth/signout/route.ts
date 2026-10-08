import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  console.log("Before sign out");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session before sign out:", session);

  await supabase.auth.signOut();

  const {
    data: { session: sessionAfter },
  } = await supabase.auth.getSession();

  console.log("Session after sign out:", sessionAfter);

  return NextResponse.redirect(new URL("/", request.url));
}