import axios from 'axios'

import { PresignedUrlResponseModel } from '../types'

const getPresignedUrl = async (typeName: string, imageName: string, imageSize: number) => {
  const res = await axios.post<PresignedUrlResponseModel>('/api/admin/strategies/trade-type', {
    tradeTypeName: typeName,
    tradeTypeIconUrl: imageName,
    size: imageSize,
  })

  if (!res.data.isSuccess) throw new Error('presigned url Error : ' + res.data.message)

  return res.data.result.presignedUrl
}

export default getPresignedUrl
