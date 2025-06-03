import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || 
                      path === '/signin' || 
                      path === '/create-account' || 
                      path === '/about' || 
                      path === '/contact-us' || 
                      path === '/faq'

  const token = request.cookies.get('accessToken')?.value || ''
  const userDataStr = request.cookies.get('user')?.value || ''
  const userData = userDataStr ? JSON.parse(userDataStr) : null

  // Check if user is trying to access admin routes
  const isAdminRoute = path.startsWith('/admin')
  if (isAdminRoute) {
    if (!token || !userData) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
    
    // Check if user has admin role
    if (!userData.roles?.includes('admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

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