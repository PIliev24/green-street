import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase";
import { ROUTES } from "./utils/constants";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = await createClient(req);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  const publicRoutes: string[] = [ROUTES.LOGIN];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!session && !isPublicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(redirectUrl);
  }

  if (session && pathname === ROUTES.LOGIN) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = ROUTES.HOME;
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
