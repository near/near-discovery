import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOGINED_ACCOUNT } from '@/config/constants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const account = request.cookies.get(LOGINED_ACCOUNT)?.value;
  if (account) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL(`/invite-code?source=${request.nextUrl.pathname}`, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!invite-code|uniswap|_next/static|_next/image|favicon.ico|api|images|fonts).*)',
};
