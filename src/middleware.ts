import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('lol!!!')
  const { pathname } = request.nextUrl
  if (['/bns/guide', '/login', '/landing'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/((?!uniswap|_next/static|_next/image|favicon.ico|api|images|fonts|dapdap|videos).*)'
  ],
};
