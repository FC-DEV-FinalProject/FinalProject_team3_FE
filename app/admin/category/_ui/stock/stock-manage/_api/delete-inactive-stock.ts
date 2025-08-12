import axiosInstance from '@/shared/api/axios'

import { DeleteInactiveStockResponseModel } from '../types'

const deleteInactiveStock = async (stockTypeId: number) => {
  const res = await axiosInstance.delete<DeleteInactiveStockResponseModel>(
    `/api/admin/strategies/stock-type/${stockTypeId}`
  )

  if (!res.data.isSuccess) throw new Error(res.data.message)

  return res.data
}

export default deleteInactiveStock
