export const PATH = {
  // Auth
  SIGN_IN: '/signin',
  SIGN_UP: '/signup/',
  SIGN_UP_USER_TYPE: '/signup/user-type',
  SIGN_UP_TERMS_OF_USE: '/signup/terms-of-use',
  SIGN_UP_INFORMATION: '/signup/information',
  SIGN_UP_COMPLETE: '/signup/complete',

  // Main
  HOME: '/',
  STRATEGIES: '/strategies',
  TRADERS: '/traders',
  NOTICES: '/notices',
  TERMS_OF_USE: '/terms-of-use',
  PRIVACY_TERMS: '/privacy-terms',

  // My
  PROFILE: '/my/profile',
  EDIT_PROFILE: '/my/profile/edit',
  FAVORITES: '/my/favorites',
  MY_STRATEGIES: '/my/strategies',
  STRATEGIES_MANAGE: '/my/strategies/manage',
  ADD_STRATEGY: '/my/strategies/add',
  MY_QUESTIONS: '/my/questions',

  // Admin
  ADMIN: '/admin',
  ADMIN_CATEGORY: '/admin/category',
  ADMIN_USERS: '/admin/users',
  ADMIN_NOTICES: '/admin/notices',
  ADMIN_STRATEGIES: '/admin/strategies',
  ADMIN_QUESTIONS: '/admin/questions',
} as const
