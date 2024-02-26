import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

//https://www.iban.com/country-codes

//todo remove spain after testing on preview
const IBAN_BLOCKED_REGIONS = ['CU', 'IR', 'KP', 'SY', 'ES'];

// Limit middleware pathname config
export const config = {
  matcher: [
    '/:path/widget/:slug',
    '/:path/component/:slug',
    '/files/:path*',
    '/papers/:path*',
    '/blog/:path*',
    '/signup:path*',
    '/signin/:path*',
  ],
};

export function middleware(req: NextRequest) {
  // Extract country
  const country = (req.geo && req.geo.country) || 'UNKNOWN';

  //TODO remove after testing on preview
  console.log('users country is ', country);

  let nextUrl = NextResponse.rewrite(req.nextUrl);
  // Specify the correct pathname
  if (IBAN_BLOCKED_REGIONS.includes(country)) {
    nextUrl = NextResponse.rewrite('/geo-blocked');
  }

  return nextUrl;
}
