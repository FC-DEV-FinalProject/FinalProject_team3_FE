import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteAdminQuestion from '../../_api/delete-admin-question'

interface ArgModel {
  strategyId: number
  questionId: number
}
const useDeleteQuestion = ({ strategyId, questionId }: ArgModel) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteAdminQuestion({ strategyId, questionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_QUESTIONS] })
    },
  })
}
export default useDeleteQuestion
