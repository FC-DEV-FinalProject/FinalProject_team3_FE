import { APIResponseBaseModel } from '@/shared/types/response'

export interface NoticeFormModel {
  title: string
  content: string
  files: File[]
}

export interface PostNoticeResopnseModel extends APIResponseBaseModel<boolean> {
  data: {
    noticeId: number
    user: {
      id: number
      nickname: string
    }
    title: string
    content: string
    createdAt: string
    publishedAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
  }
}
