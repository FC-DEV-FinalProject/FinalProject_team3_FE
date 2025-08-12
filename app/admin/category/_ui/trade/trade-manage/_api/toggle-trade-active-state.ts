import axiosInstance from '@/shared/api/axios'

import { ToggleTradeActiveStateResponseModel } from '../types'

const ToggleTradeActiveState = async (tradeTypeId: number) => {
  const res = await axiosInstance.patch<ToggleTradeActiveStateResponseModel>(
    `/api/admin/strategies/trade-type/${tradeTypeId}`
  )

  if (!res.data.isSuccess) throw new Error(res.data.message)

  return res.data
}

export default ToggleTradeActiveState
