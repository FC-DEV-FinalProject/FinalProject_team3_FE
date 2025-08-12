import axiosInstance from '@/shared/api/axios'

export interface TraderProfileModel {
  userId: number
  userName: string
  nickname: string
  imageUrl: string
  strategyCount: number
  totalSubCount: number
}

export interface TraderProfileResponseModel {
  isSuccess: boolean
  message: string
  result: TraderProfileModel
  code: number
}

export const getTraderProfile = async (traderId: number): Promise<TraderProfileModel> => {
  try {
    const response = await axiosInstance.get<TraderProfileResponseModel>(
      `/api/users/traders/${traderId}`
    )

    if (response.data.isSuccess) {
      return response.data.result
    } else {
      throw new Error(response.data.message || '요청 실패')
    }
  } catch (err) {
    console.error(err)
    throw new Error('트레이더 프로필 조회에 실패하였습니다.')
  }
}
