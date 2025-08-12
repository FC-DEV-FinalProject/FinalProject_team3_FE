import axiosInstance from '@/shared/api/axios'

import { ToggleStockActiveStateResponseModel } from '../types'

const ToggleStockActiveState = async (stockTypeId: number) => {
  const res = await axiosInstance.patch<ToggleStockActiveStateResponseModel>(
    `/api/admin/strategies/stock-type/${stockTypeId}`
  )

  if (!res.data.isSuccess) throw new Error(res.data.message)

  return res.data
}

export default ToggleStockActiveState
