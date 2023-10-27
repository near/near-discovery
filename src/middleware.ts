import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import useAccount from '@/hooks/useAccount';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(`/invite-code?a=${request.url}`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/bsc',
};
