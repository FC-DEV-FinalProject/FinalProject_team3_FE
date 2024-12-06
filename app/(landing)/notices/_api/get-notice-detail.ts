import axiosInstance from '@/shared/api/axios'

interface NoticeResponseModel {
  isSuccess: true
  message: '공지사항 상세 조회'
  result: {
    title: '제목'
    content: '내용'
    createdAt: '2024-12-06 11:24:59'
    files: [
      {
        fileName: '2.jpg'
        noticeFileId: 3
      },
    ]
  }
}

export const getNoticeDetail = async (noticeId: number): Promise<NoticeResponseModel['result']> => {
  try {
    const response = await axiosInstance.get<NoticeResponseModel>(`/api/notice/${noticeId}`)

    if (response.data.isSuccess) {
      return response.data.result
    } else {
      throw new Error(response.data.message || '요청 실패')
    }
  } catch (err) {
    console.error(err)
    throw new Error('공지사항 조회 실패.')
  }
}
