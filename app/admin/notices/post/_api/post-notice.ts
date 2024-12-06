import axiosInstance from '@/shared/api/axios'

import { NoticeFormModel, PostNoticeResopnseModel } from '../types'

const postNotice = async (formData: NoticeFormModel) => {
  const data = new FormData()
  data.append('title', formData.title)
  data.append('content', formData.content)
  formData.files.forEach((file) => data.append('files', file))

  try {
    const res = await axiosInstance.post<PostNoticeResopnseModel>('/api/admin/notices', {
      method: 'POST',
      body: data,
    })

    if (!res.data.isSuccess) throw new Error('Error : ' + res.data.message)

    alert('공지 등록이 완료되었습니다.')
  } catch (error) {
    console.error(error)
    alert('공지 등록 중 오류가 발생했습니다.')
  }
}

export default postNotice
