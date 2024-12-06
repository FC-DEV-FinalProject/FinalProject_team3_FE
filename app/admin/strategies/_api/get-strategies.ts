import axiosInstance from '@/shared/api/axios'

import { StrategiesApprovalStateType, StrategiesResponseModel } from '../types'

interface ArgModel {
  searchWord?: string
  isApproved?: StrategiesApprovalStateType
  page?: number
  size?: number
}

const getStrategies = async ({ searchWord, isApproved, page = 0, size = 10 }: ArgModel) => {
  try {
    const res = await axiosInstance<StrategiesResponseModel>('/api/admin/strategies', {
      params: {
        searchWord,
        isApproved,
        page,
        size,
      },
    })

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data.result
  } catch (err) {
    console.log('Error : ' + err)
    throw err
  }
}

export default getStrategies
