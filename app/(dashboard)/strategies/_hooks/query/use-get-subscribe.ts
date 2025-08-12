import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getSubscribe from '../../_api/get-subscribe'

const useGetSubscribe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (strategyId: number) => getSubscribe(strategyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_FAVORITE_STRATEGIES] })
    },
  })
}

export default useGetSubscribe
