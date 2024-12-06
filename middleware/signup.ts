import { NextRequest, NextResponse } from 'next/server'

import { SIGN_UP_COOKIE } from '@/app/(landing)/signup/_constants/cookies'

import { PATH } from '@/shared/constants/path'

const USER_TYPE_CHECK_PAGES = [
  PATH.SIGN_UP_TERMS_OF_USE,
  PATH.SIGN_UP_INFORMATION,
  PATH.SIGN_UP_COMPLETE,
] as const

const TERMS_CHECK_PAGES = [PATH.SIGN_UP_INFORMATION, PATH.SIGN_UP_COMPLETE] as const

const isUserTypeCheckPages = (path: string) => {
  return USER_TYPE_CHECK_PAGES.includes(path as (typeof USER_TYPE_CHECK_PAGES)[number])
}

const isTermsCheckPages = (path: string) => {
  return TERMS_CHECK_PAGES.includes(path as (typeof TERMS_CHECK_PAGES)[number])
}

const isNicknameCheckPage = (path: string) => {
  return path === PATH.SIGN_UP_COMPLETE
}

export const handleSignupMiddleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname

  if (path === PATH.SIGN_UP_USER_TYPE) {
    return NextResponse.next()
  }

  const userType = request.cookies.get(SIGN_UP_COOKIE.USER_TYPE)?.value
  if (isUserTypeCheckPages(path) && !userType) {
    return NextResponse.redirect(new URL(PATH.SIGN_UP_USER_TYPE, request.url))
  }

  const isAgreedTerm = request.cookies.get(SIGN_UP_COOKIE.IS_AGREED_TERMS)?.value
  if (isTermsCheckPages(path) && !isAgreedTerm) {
    return NextResponse.redirect(new URL(PATH.SIGN_UP_TERMS_OF_USE, request.url))
  }

  const nickname = request.cookies.get(SIGN_UP_COOKIE.NICKNAME)?.value
  if (isNicknameCheckPage(path) && !nickname) {
    return NextResponse.redirect(new URL(PATH.SIGN_UP_INFORMATION, request.url))
  }

  return NextResponse.next()
}
