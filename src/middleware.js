import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Example: check auth using cookie (adjust based on your setup)
 const token = request.cookies.get('isloggedin')?.value;
 const isLoggedIn = token === 'true';

  // Routes
  const authPages = ['/login', '/signup'];
  const protectedPages = ['/createpost'];

  // 1. If logged in → block auth pages
  if (isLoggedIn && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. If NOT logged in → block protected pages
  if (!isLoggedIn && protectedPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/login', '/signup', '/createpost'],
};