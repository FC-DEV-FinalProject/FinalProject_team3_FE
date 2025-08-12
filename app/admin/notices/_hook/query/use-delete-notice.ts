import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteNotice from '../../_api/delete-notice'

const useDeleteNotice = (noticeId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteNotice(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.NOTICES] })
    },
  })
}

export default useDeleteNotice
