import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import ToggleTradeActiveState from '../../_api/toggle-trade-active-state'

const useToggoleTradeActiveState = (tradeTypeId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => ToggleTradeActiveState(tradeTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_TRADES],
      })
    },
    onError: (err) => {
      console.error('Error : ', err)
    },
  })
}

export default useToggoleTradeActiveState
