import { APIResponseBaseModel } from '@/shared/types/response'

export type StrategiesPublicStateType = 'PUBLIC' | 'PRIVATE'
export type AdminStrategiesTapType = 'ALL' | 'PENDING'
export type StrategiesApprovalStateType = 'APPROVED' | 'DENY' | 'PENDING'

export interface StrategiesResponseModel extends APIResponseBaseModel<boolean> {
  result: {
    content: Array<{
      strategyId: number
      strategyName: string
      nickname: string
      isPublic: StrategiesPublicStateType
      isApproved: StrategiesApprovalStateType
      createAt: string
    }>
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}

// eslint-disable-next-line
export interface StrategiesPatchResponseModel extends APIResponseBaseModel<boolean> {}
