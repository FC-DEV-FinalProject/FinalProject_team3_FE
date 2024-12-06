import axiosInstance from '@/shared/api/axios'

import { ToggleStockActiveStateResponseModel } from '../types'

const ToggleStockActiveState = async (stockTypeId: number) => {
  try {
    const res = await axiosInstance.patch<ToggleStockActiveStateResponseModel>(
      `/api/admin/strategies/stock-type/${stockTypeId}`
    )

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data
  } catch (err) {
    console.log('Error : ' + err)
  }
}

export default ToggleStockActiveState
