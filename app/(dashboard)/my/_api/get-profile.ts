import axiosInstance from '@/shared/api/axios'

export interface ProfileModel {
  userId: number
  userName: string
  email: string
  imageUrl: string | null
  nickname: string
  phone: string
  infoAgreement: boolean
  role: string
  birthDate: string
}

interface ProfileResponseModel {
  isSuccess: boolean
  message: string
  result: ProfileModel
}

export const getProfile = async (): Promise<ProfileResponseModel['result']> => {
  try {
    const response = await axiosInstance.get<ProfileResponseModel>('/api/users/mypage/profile')

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
