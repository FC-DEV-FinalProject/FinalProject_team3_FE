import axiosInstance from '@/shared/api/axios'

import { AdminUsersResponeseModel } from '../types'

interface ArgModel {
  role: string
  condition: string | null
  keyword: string | null
  page?: number
  size?: number
}

const getAdminUsers = async ({ role, condition, keyword, page = 1, size }: ArgModel) => {
  try {
    const res = await axiosInstance<AdminUsersResponeseModel>('/api/admin/users', {
      params: {
        role,
        condition,
        keyword,
        page,
        size,
      },
    })

    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)

    return res.data.result
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default getAdminUsers
