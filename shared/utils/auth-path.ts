import { AUTH_REQUIRED_PATTERNS, NON_AUTH_PAGES } from '../constants/auth'

export const isAuthRequiredPath = (pathname: string): boolean => {
  return AUTH_REQUIRED_PATTERNS.some((pattern) => pathname.startsWith(pattern))
}

export const isNonAuthPage = (pathname: string): boolean => {
  return NON_AUTH_PAGES.some((page) => pathname.startsWith(page))
}
