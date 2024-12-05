import axiosInstance from '@/shared/api/axios'

interface NoticeResponseModel {
  isSuccess: true
  message: string
  result: {
    noticeId: number
    user: {
      id: number
      nickname: string
    }
    title: string
    content: string
    createdAt: string
    attachments: { title: string }[]
  }
}

export const getNoticeDetail = async (noticeId: number): Promise<NoticeResponseModel['result']> => {
  try {
    const response = await axiosInstance.get<NoticeResponseModel>(`/api/notices/${noticeId}`)

    if (response.data.isSuccess) {
      return response.data.result
    } else {
      throw new Error(response.data.message || '요청 실패')
    }
  } catch (err) {
    console.error(err)
    throw new Error('해당 회원의 정보를 찾을 수 없습니다.')
  }
}
