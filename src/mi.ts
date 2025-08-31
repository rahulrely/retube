import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const protectedPaths = [
    '/register/verification',
    '/register/link/primary',
    '/register/link/google',
  ]

  const protectedPaths2 = [
    '/dashboard',
    '/dashboard/rawvideos',
    '/dashboard/settings',
    '/dashboard/videos',
  ]

  const currentPath = request.nextUrl.pathname
  const isProtected = protectedPaths.some((path) => currentPath.startsWith(path))

  const tempToken = request.cookies.get('tempToken')?.value

  if (isProtected && !tempToken) {
    // Redirect to register 
    const registerUrl = new URL('/register', request.url)
    registerUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(registerUrl)
  }

  const isProtected2 = protectedPaths2.some((path) => currentPath.startsWith(path))

  const accessToken = request.cookies.get('accessToken')?.value

  if (isProtected2 && !accessToken) {
    // Redirect to register 
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
    matcher: [
      '/register/verification',
      '/register/link/primary',
      '/register/link/google',
      '/dashboard',
      '/dashboard/rawvideos',
      '/dashboard/settings',
      '/dashboard/videos',
    ],
  }
  