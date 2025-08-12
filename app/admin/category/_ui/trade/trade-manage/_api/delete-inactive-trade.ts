import axiosInstance from '@/shared/api/axios'

import { DeleteInactiveTradeResponseModel } from '../types'

const deleteInactiveTrade = async (tradeTypeId: number) => {
  try {
    const res = await axiosInstance.delete<DeleteInactiveTradeResponseModel>(
      `/api/admin/strategies/trade-type/${tradeTypeId}`
    )

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data
  } catch (err) {
    console.error('Error : ' + err)
    throw err
  }
}

export default deleteInactiveTrade
