import { APIResponseBaseModel } from '@/shared/types/response'

export interface PatchNoticeResponseModel extends APIResponseBaseModel<boolean> {
  result: string[]
}
