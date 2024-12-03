import { useMutation } from '@tanstack/react-query'

import getSubscribe from '../../_api/get-subscribe'

const useGetSubscribe = () => {
  return useMutation({
    mutationFn: (strategyId: number) => getSubscribe(strategyId),
  })
}

export default useGetSubscribe
