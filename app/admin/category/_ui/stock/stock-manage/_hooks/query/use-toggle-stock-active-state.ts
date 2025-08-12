import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import ToggleStockActiveState from '../../_api/toggle-stock-active-state'

const useToggleStockActiveState = (stockTypeId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => ToggleStockActiveState(stockTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_STOCKS],
      })
    },
    onError: (err) => {
      console.error('Error : ', err)
    },
  })
}

export default useToggleStockActiveState
