import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getMyAccountImages from '../../_api/get-my-account-iamges'

const useGetMyAccountImages = (strategyId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_ACCOUNT_IMAGES, strategyId],
    queryFn: () => getMyAccountImages(strategyId),
  })
}

export default useGetMyAccountImages
