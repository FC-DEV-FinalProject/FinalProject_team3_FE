import { APIResponseBaseModel } from '@/shared/types/response'

export interface PostNoticeResopnseModel extends APIResponseBaseModel<boolean> {
  result: string[]
}
