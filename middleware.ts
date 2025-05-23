import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || 
                      path === '/signin' || 
                      path === '/create-account' || 
                      path === '/about' || 
                      path === '/contact-us' || 
                      path === '/faq'

  const token = request.cookies.get('accessToken')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}
export const config = {
  matcher: [
    '/',
    '/signin',
    '/create-account',
    '/about',
    '/contact-us',
    '/faq',
    '/dashboard/:path*',
    '/admin/:path*'
  ]
} 