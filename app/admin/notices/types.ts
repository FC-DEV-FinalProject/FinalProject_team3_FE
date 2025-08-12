import { APIResponseBaseModel } from '@/shared/types/response'

// eslint-disable-next-line
export interface DeleteNoticeResponeseModel extends APIResponseBaseModel<boolean> {}

export interface NoticeFormModel {
  title: string
  content: string
  existingFiles?: NoticeFileModel[]
  newFiles?: File[]
}

export interface NoticeFileModel {
  fileName: string
  noticeFileId: number
}
