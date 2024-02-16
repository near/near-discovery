import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { activityReg } from '@/utils/activity-reg';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const AUTHED_ACCOUNT = request.cookies.get('AUTHED_ACCOUNT');
  const LOGIN_ACCOUNT = request.cookies.get('LOGIN_ACCOUNT');
  if (request.url.match(activityReg) && request.nextUrl.pathname !== '/invite-code') {
    return NextResponse.next();
  }
  if (!LOGIN_ACCOUNT) {
    return NextResponse.redirect(new URL(`/login?source=/`, request.url));
  }
  if (AUTHED_ACCOUNT) {
    return request.nextUrl.pathname === '/invite-code'
      ? NextResponse.redirect(new URL(`/`, request.url))
      : NextResponse.next();
  }
  if (request.nextUrl.pathname === '/invite-code') return;
  return NextResponse.redirect(new URL(`/invite-code?source=/`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!uniswap|login|_next/static|_next/image|favicon.ico|api|images|fonts|dapdap|videos).*)'],
};
