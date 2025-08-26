import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createClient(request?: NextRequest) {
  if (request) {
    const authHeader = request.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
        cookies: {
          getAll() {
            return [];
          },
          setAll() {
            // not needed
          },
        },
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      });
    }

    // fallback to cookies for web routes
    return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // not needed
        },
      },
    });
  }

  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // not needed
        },
      },
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });
  }

  const cookieStore = await cookies();
  return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // not needed
        }
      },
    },
  });
}
