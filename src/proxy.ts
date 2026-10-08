import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("Proxy is running", request.nextUrl.pathname);

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,

    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet: { name: any; value: any; options: any }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("USER:", user)
  const pathname = request.nextUrl.pathname;
  console.log("PATHNAME:", pathname);
  const isProtectedRoute = pathname.startsWith("/photos");
  console.log("🚨 REDIRECTING /photos → /");

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
