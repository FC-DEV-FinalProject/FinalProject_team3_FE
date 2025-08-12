import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteInactiveTrade from '../../_api/delete-inactive-trade'

interface Props {
  tradeTypeId: number
  options: {
    onSuccess?: () => void
    onError?: (error: Error) => void
  }
}

const useDeleteInactiveTrade = ({ tradeTypeId, options }: Props) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteInactiveTrade(tradeTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_TRADES],
      })
      options?.onSuccess?.()
    },
    onError: (err) => {
      console.error('Error : ', err)
      options?.onError?.(err as Error)
    },
  })
}

export default useDeleteInactiveTrade
