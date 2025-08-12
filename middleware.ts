import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { handleSignupMiddleware } from '@/middleware/signup'

import { PATH } from '@/shared/constants/path'

const PROTECTED_API_PATHS = [
  '/api/my-strategies/',
  '/api/strategies/search/trader/',
  '/api/admin/',
  '/api/notices/',
  '/api/trader/',
  '/reviews',
] as const

const isProtectedApiPath = (path: string): boolean => {
  return PROTECTED_API_PATHS.some((protectedPath) => {
    if (protectedPath.endsWith('/')) {
      return path.startsWith(protectedPath)
    }
    return path.includes(protectedPath)
  })
}

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname

  if (path.startsWith('/api/')) {
    if (isProtectedApiPath(path)) {
      const authHeader = request.headers.get('access-token')
      if (!authHeader) {
        return NextResponse.json(
          {
            error: 'Unauthorized',
            message: '로그인이 필요한 요청입니다.',
          },
          { status: 401 }
        )
      }
    }
  }

  if (path.startsWith(PATH.SIGN_UP)) {
    const response = handleSignupMiddleware(request)
    if (response) return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/signup/:path*',
    '/my/:path*',
    '/admin/:path*',
    '/traders/:id*',
    '/strategies/:path*',
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
