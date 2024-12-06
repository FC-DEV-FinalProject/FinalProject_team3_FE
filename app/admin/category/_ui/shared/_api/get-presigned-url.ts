import axiosInstance from '@/shared/api/axios'

import { PresignedUrlResponseModel } from '../../trade/trade-manage/types'
import { DomainType } from '../_hooks/use-category-icon-post'

const getPresignedUrl = async (
  typeName: string,
  imageName: string,
  imageSize: number,
  domain: DomainType
) => {
  const body =
    domain === 'trade'
      ? {
          tradeTypeName: typeName,
          tradeTypeIconUrl: imageName,
          size: imageSize,
        }
      : {
          stockTypeName: typeName,
          stockTypeIconUrl: imageName,
          size: imageSize,
        }

  const res = await axiosInstance.post<PresignedUrlResponseModel>(
    `/api/admin/strategies/${domain}-type`,
    body
  )

  if (!res.data.isSuccess) throw new Error('presigned url Error : ' + res.data.message)

  return res.data.result.presignedUrl
}

export default getPresignedUrl
