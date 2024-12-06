import { PATH } from './path'

const STORAGE_PREFIX = 'investment_platform_'

export const STORAGE_KEYS = {
  ACCESS_TOKEN: `${STORAGE_PREFIX}access_token`,
  USER: `${STORAGE_PREFIX}user`,
} as const

export const AUTH_TIME = {
  TOKEN_CHECK_INTERVAL: 120 * 1000,
  ADMIN_EXPIRY_WARNING: 600 * 1000,
  SAFETY_MARGIN: 5 * 1000,
} as const

export const AUTH_REQUIRED_PATTERNS = ['/my/', '/admin', '/traders', '/strategies/'] as const

export const NON_AUTH_PAGES = [
  PATH.SIGN_IN,
  PATH.SIGN_UP,
  PATH.SIGN_UP_USER_TYPE,
  PATH.SIGN_UP_TERMS_OF_USE,
  PATH.SIGN_UP_INFORMATION,
  PATH.SIGN_UP_COMPLETE,
] as const
