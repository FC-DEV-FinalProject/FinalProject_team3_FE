import axiosInstance from '@/shared/api/axios'

import { StrategiesResponseModel } from '../types'

const patchStrategyApproval = async (strategyId: number, isApproved: 'APPROVED' | 'DENY') => {
  try {
    const res = await axiosInstance.patch<StrategiesResponseModel>(
      `/api/admin/strategies/${strategyId}`,
      null,
      {
        params: {
          isApproved,
        },
      }
    )

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data.result
  } catch (err) {
    console.log('Error : ' + err)
    throw err
  }
}

export default patchStrategyApproval
