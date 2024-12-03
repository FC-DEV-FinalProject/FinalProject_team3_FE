export const STORAGE_PREFIX = 'investment_platform_'
export const STORAGE_KEYS = {
  ACCESS_TOKEN: `${STORAGE_PREFIX}access_token`,
  REFRESH_TOKEN: `${STORAGE_PREFIX}refresh_token`,
  USER: `${STORAGE_PREFIX}user`,
  SESSION: `${STORAGE_PREFIX}session`,
} as const

export const AUTH_TIME = {
  TOKEN_CHECK_INTERVAL: 60000, // 1분
  ADMIN_EXPIRY_WARNING: 300000, // 5분
} as const
