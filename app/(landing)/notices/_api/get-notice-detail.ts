import axiosInstance from '@/shared/api/axios'
import { APIResponseBaseModel } from '@/shared/types/response'

export interface NoticeDetailResponseModel extends APIResponseBaseModel<boolean> {
  result: {
    title: string
    content: string
    createdAt: string
    files: [
      {
        fileName: string
        noticeFileId: number
      },
    ]
  }
}

export const getNoticeDetail = async (noticeId: number) => {
  try {
    const response = await axiosInstance.get<NoticeDetailResponseModel>(`/api/notices/${noticeId}`)

    if (!response.data.isSuccess) throw new Error(response.data.message || '요청 실패')

    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('공지사항 조회 실패.')
  }
}
