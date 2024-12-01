import { useMutation, useQueryClient } from '@tanstack/react-query'

import ToggleTradeActiveState from '../_api/toggle-trade-active-state'

const useToggoleTradeActiveState = (tradeTypeId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => ToggleTradeActiveState(tradeTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminTrades'],
      })
    },
    onError: (err) => {
      console.error('Error : ', err)
    },
  })
}

export default useToggoleTradeActiveState
