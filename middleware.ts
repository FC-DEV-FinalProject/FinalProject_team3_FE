import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { handleSignupMiddleware } from '@/middleware/signup'

import { PATH } from '@/shared/constants/path'

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname

  //TODO: api 요청 보호
  // if (path.startsWith('/api/')) {
  //   const authHeader = request.headers.get('access-token')
  //   if (!authHeader) {
  //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  //   }
  // }

  if (path.startsWith(PATH.SIGN_UP)) {
    const response = handleSignupMiddleware(request)
    if (response) return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/signup/:path*'],
}
