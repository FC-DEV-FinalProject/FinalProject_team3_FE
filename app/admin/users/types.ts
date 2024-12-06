interface UsersResponseBaseModel<T extends boolean> {
  isSuccess: T
  message: string
  code: T extends false ? number : null
}

export type AdminUserRoleType = 'TRADER' | 'TRADER_ADMIN' | 'INVESTOR' | 'INVESTOR_ADMIN'

export type AdminPatchUserRoleType = 'ADMIN' | 'TRADER' | 'INVESTOR'

export interface AdminUserInfoModel {
  userId: number
  userName: string
  email: string
  imageUrl: string | null
  nickname: string
  phone: string
  infoAgreement: boolean
  role: AdminUserRoleType
}

export interface AdminUsersResponeseModel extends UsersResponseBaseModel<boolean> {
  result: {
    content: Array<AdminUserInfoModel>
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}
// eslint-disable-next-line
export interface PatchUserRoleResponeseModel extends UsersResponseBaseModel<boolean> {}

// eslint-disable-next-line
export interface DeleteUserResponeseModel extends UsersResponseBaseModel<boolean> {}

export type UserRoleType = '모든 회원' | '일반' | '트레이더' | '관리자'
