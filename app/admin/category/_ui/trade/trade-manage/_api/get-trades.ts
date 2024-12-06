import axiosInstance from '@/shared/api/axios'

import { TradeResponseModel } from '../types'

const getTrades = async (activateState: boolean) => {
  try {
    const res = await axiosInstance<TradeResponseModel>('/api/admin/strategies/trade-type', {
      params: {
        activateState,
      },
    })

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data
  } catch (err) {
    console.log('Error : ' + err)
    throw err
  }
}

export default getTrades
