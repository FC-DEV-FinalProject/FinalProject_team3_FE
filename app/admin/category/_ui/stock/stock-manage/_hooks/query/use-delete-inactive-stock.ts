import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteInactiveStock from '../../_api/delete-inactive-stock'

const useDeleteInactiveStock = (stockTypeId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteInactiveStock(stockTypeId),
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

export default useDeleteInactiveStock
