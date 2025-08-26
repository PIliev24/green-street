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

export async function createClient(request?: NextRequest): Promise<ReturnType<typeof createServerClient<Database>>> {
  if (request) {
    const authHeader = request.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
        cookies: {
          getAll() {
            return [];
          },
        },
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      });
    }

    const cookieHeader = request.headers.get("cookie");
    const requestCookies = cookieHeader
      ? cookieHeader.split(";").map(cookie => {
          const [name, value] = cookie.trim().split("=");
          return { name, value };
        })
      : [];

    return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return requestCookies;
        },
      },
    });
  }

  // Handle Server Component context (no request provided)
  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return [];
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
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      },
    },
  });
}
