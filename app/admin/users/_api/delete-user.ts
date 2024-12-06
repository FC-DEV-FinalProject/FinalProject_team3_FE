import axiosInstance from '@/shared/api/axios'

import { DeleteUserResponeseModel } from '../types'

const deleteUser = async (userId: number) => {
  try {
    const res = await axiosInstance.delete<DeleteUserResponeseModel>(`/api/admin/users/${userId}`)

    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)

    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default deleteUser
