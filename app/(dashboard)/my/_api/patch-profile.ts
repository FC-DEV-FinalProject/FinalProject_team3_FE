import axiosInstance from '@/shared/api/axios'

import { UserProfileModel } from '../_hooks/query/use-patch-profile'

interface PatchUserProfileModel {
  isSuccess: boolean
  message: string
  result: string
  code: number
}

const patchUserProfile = async (data: UserProfileModel) => {
  try {
    const response = await axiosInstance.patch<PatchUserProfileModel>(
      `/api/users/mypage/profile`,
      data
    )
    return response.data
  } catch (err) {
    console.error('Error updating user profile:', err)
    throw err
  }
}

export default patchUserProfile
