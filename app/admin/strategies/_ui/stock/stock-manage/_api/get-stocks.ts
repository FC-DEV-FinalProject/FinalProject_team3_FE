import axios from 'axios'

import { StockResponseModel } from '../types'

const getStocks = async (activateState: boolean, page: number, size: number) => {
  try {
    const res = await axios<StockResponseModel>('/api/admin/strategies/stock-type', {
      params: {
        activateState,
        page,
        size,
      },
    })

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data
  } catch (err) {
    console.log('Error : ' + err)
  }
}

export default getStocks
