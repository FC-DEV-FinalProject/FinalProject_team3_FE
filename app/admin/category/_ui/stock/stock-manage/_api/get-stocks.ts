import axiosInstance from '@/shared/api/axios'

import { StockResponseModel } from '../types'

const getStocks = async (activateState: boolean, page: number = 1, size: number = 10) => {
  try {
    const res = await axiosInstance<StockResponseModel>('/api/admin/strategies/stock-type', {
      params: {
        activateState,
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

export default getStocks
