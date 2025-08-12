import { AUTH_REQUIRED_PATTERNS, NON_AUTH_PAGES } from '../constants/auth'

export const isAuthRequiredPath = (path: string): boolean => {
  return AUTH_REQUIRED_PATTERNS.some((pattern) => {
    if (pattern.includes('[0-9]+')) {
      const regex = new RegExp(pattern.replace('[0-9]+', '\\d+'))
      return regex.test(path)
    }
    return path.startsWith(pattern)
  })
}

export const isNonAuthPage = (path: string): boolean => {
  return NON_AUTH_PAGES.some((nonAuthPath) => path === nonAuthPath)
}
