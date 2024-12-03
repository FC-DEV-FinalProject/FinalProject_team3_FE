import { useMutation, useQueryClient } from '@tanstack/react-query'

import ToggleStockActiveState from '../../_api/toggle-stock-active-state'

const useToggoleStockActiveState = (stockTypeId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => ToggleStockActiveState(stockTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminStocks'],
      })
    },
    onError: (err) => {
      console.error('Error : ', err)
    },
  })
}

export default useToggoleStockActiveState
