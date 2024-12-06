export const SIGN_UP_COOKIE = {
  USER_TYPE: 'userType',
  IS_AGREED_TERMS: 'isAgreedTerms',
  NICKNAME: 'nickname',
} as const

export type SignUpCookieKeyType = keyof typeof SIGN_UP_COOKIE
export type SignUpCookieValueType = (typeof SIGN_UP_COOKIE)[SignUpCookieKeyType]
