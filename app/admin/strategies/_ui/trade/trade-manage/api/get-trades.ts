import axios from 'axios'

import { TradeResponseModel } from '../types'

const getTrades = async (activateState: boolean) => {
  try {
    const res = await axios<TradeResponseModel>('/api/admin/strategies/trade-type', {
      params: {
        activateState,
      },
    })

    if (!res.data.isSuccess) throw new Error(res.data.message)

    return res.data
  } catch (err) {
    console.log('Error : ' + err)
  }
}

export default getTrades
