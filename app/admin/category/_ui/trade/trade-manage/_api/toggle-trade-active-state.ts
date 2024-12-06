import axiosInstance from '@/shared/api/axios'

import { ToggleTradeActiveStateResponseModel } from '../types'

const ToggleTradeActiveState = async (tradeTypeId: number) => {
  try {
    const res = await axiosInstance.patch<ToggleTradeActiveStateResponseModel>(
      `/api/admin/strategies/trade-type/${tradeTypeId}`
    )

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data
  } catch (err) {
    console.log('Error : ' + err)
  }
}

export default ToggleTradeActiveState
