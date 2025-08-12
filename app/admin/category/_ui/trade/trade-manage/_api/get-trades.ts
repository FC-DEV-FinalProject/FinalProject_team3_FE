import axiosInstance from '@/shared/api/axios'

import { TradeResponseModel } from '../types'

const getTrades = async (activateState: boolean) => {
  const res = await axiosInstance.get<TradeResponseModel>('/api/admin/strategies/trade-type', {
    params: {
      activateState,
    },
  })

  if (!res.data.isSuccess) throw new Error(res.data.message)

  return res.data.result
}

export default getTrades
