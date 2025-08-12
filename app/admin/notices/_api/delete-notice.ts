import axiosInstance from '@/shared/api/axios'

import { DeleteNoticeResponeseModel } from '../types'

const deleteNotice = async (noticeId: number) => {
  try {
    const res = await axiosInstance.delete<DeleteNoticeResponeseModel>(
      `/api/admin/notices/${noticeId}`
    )

    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)

    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default deleteNotice
