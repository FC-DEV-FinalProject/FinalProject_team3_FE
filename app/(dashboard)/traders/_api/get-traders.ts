import axiosInstance from '@/shared/api/axios'

export interface TraderModel {
  userId: number
  nickname: string
  userName: string
  imageUrl: string
  strategyCount: number
  totalSubCount: number
}

interface TradersResponseModel {
  isSuccess: boolean
  message: string
  result: {
    content: TraderModel[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
  code: number
}

export interface TradersParamsModel {
  page: number
  size: number
  keyword?: string
  orderBy: 'STRATEGY_TOTAL' | 'SUBSCRIBE_TOTAL'
}

export const getTraders = async (
  params: TradersParamsModel
): Promise<TradersResponseModel['result']> => {
  try {
    const { page, size, keyword = '', orderBy } = params
    const response = await axiosInstance.get<TradersResponseModel>(
      `/api/users/traders?sort=${orderBy}&page=${page}&size=${size}&keyword=${keyword}`
    )

    if (response.data.isSuccess) {
      return response.data.result
    } else {
      throw new Error(response.data.message || '요청 실패')
    }
  } catch (err) {
    console.error(err)
    throw new Error('트레이더 목록 조회에 실패하였습니다.')
  }
}
