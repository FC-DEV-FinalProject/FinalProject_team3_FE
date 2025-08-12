import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getAccountImages from '../../_api/get-account-images'

const useGetAccountImages = (strategyId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.STRATEGY_ACCOUNT_IMAGES, strategyId],
    queryFn: () => getAccountImages(strategyId),
  })
}

export default useGetAccountImages
