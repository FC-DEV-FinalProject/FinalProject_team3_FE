'use client'

import { UserType } from '@/shared/types/auth'

import { SIGN_UP_COOKIE, SignUpCookieValueType } from '../_constants/cookies'

const COOKIE_EXPIRATION_MINUTES = 30

const isBrowser = typeof window !== 'undefined'

const setSignupCookie = (key: SignUpCookieValueType, value: string) => {
  if (!isBrowser) return

  const expirationDate = new Date()
  expirationDate.setMinutes(expirationDate.getMinutes() + COOKIE_EXPIRATION_MINUTES)

  document.cookie = `${key}=${value}; path=/signup; sameSite=strict; expires=${expirationDate.toUTCString()}`
}

const getSignupCookie = (key: SignUpCookieValueType) => {
  if (!isBrowser) return
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${key}=`)

  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export const removeAllSignupCookies = () => {
  if (!isBrowser) return false

  try {
    const signupCookies = Object.values(SIGN_UP_COOKIE)
    const expireDate = 'Thu, 01 Jan 1970 00:00:00 GMT'

    signupCookies.forEach((cookieName) => {
      if (typeof cookieName === 'string') {
        document.cookie = `${cookieName}=; path=/signup; expires=${expireDate}; secure`
      }
    })

    return true
  } catch (err) {
    console.error('회원가입 쿠키 삭제 실패:', err)
    return false
  }
}

export const getUserTypeCookie = () => {
  const userType = getSignupCookie(SIGN_UP_COOKIE.USER_TYPE)
  return userType ? (userType as UserType) : undefined
}

export const getIsAgreedTermsCookie = () => {
  const isAgreedTerms = getSignupCookie(SIGN_UP_COOKIE.IS_AGREED_TERMS)
  return isAgreedTerms === 'Y'
}

export const getNicknameCookie = () => {
  const nickname = getSignupCookie(SIGN_UP_COOKIE.NICKNAME)
  return nickname
}

export const setUserTypeCookie = (userType: UserType) => {
  setSignupCookie(SIGN_UP_COOKIE.USER_TYPE, userType)
}

export const setIsAgreedTermsCookie = (isAgreed: boolean) => {
  setSignupCookie(SIGN_UP_COOKIE.IS_AGREED_TERMS, isAgreed ? 'Y' : 'N')
}

export const setNicknameCookie = (nickname: string) => {
  setSignupCookie(SIGN_UP_COOKIE.NICKNAME, nickname)
}
