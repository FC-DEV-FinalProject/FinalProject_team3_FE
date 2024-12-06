import { useQuery } from '@tanstack/react-query'

import getAccountImages from '../../_api/get-account-images'

const useGetAccountImages = (strategyId: number) => {
  return useQuery({
    queryKey: ['account-images', strategyId],
    queryFn: () => getAccountImages(strategyId),
  })
}

export default useGetAccountImages
