export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
    SESSION_EXPIRED: '로그인이 만료되었습니다. 다시 로그인해주세요.',
    LOGIN_FAILED: '서버 오류로 로그인에 실패했습니다.',
    INVALID_TOKEN: '유효하지 않은 인증입니다.',
    ALREADY_LOGGED_IN: '이미 로그인되어 있습니다.',
    REFRESH_FAILED: '토큰 갱신에 실패했습니다.',
  },
  FORM: {
    REQUIRED_FIELDS: '이메일과 비밀번호를 입력해주세요.',
    EMAIL: '이메일 형식이 올바르지 않습니다.',
    PASSWORD: '비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.',
    PHONE: '휴대폰 번호 형식이 올바르지 않습니다.',
  },
  NETWORK: {
    ERROR: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
} as const
