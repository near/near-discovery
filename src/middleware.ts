import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const AUTHED_ACCOUNT = request.cookies.get('AUTHED_ACCOUNT');
  const LOGIN_ACCOUNT = request.cookies.get('LOGIN_ACCOUNT');
  if (!LOGIN_ACCOUNT) {
    return NextResponse.redirect(new URL(`/login?source=/`, request.url));
  }
  if (AUTHED_ACCOUNT) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/invite-code?source=/`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!uniswap|invite-code|login|_next/static|_next/image|favicon.ico|api|images|fonts).*)',
    '/^((?!.near/widget).*)+$/',
  ],
};
