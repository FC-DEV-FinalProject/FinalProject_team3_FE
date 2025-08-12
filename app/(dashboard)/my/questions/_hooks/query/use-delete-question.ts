import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteQuestion, { DeleteQuestionProps } from '../../_api/delete-question'

const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ questionId, strategyId }: DeleteQuestionProps) =>
      deleteQuestion({ questionId, strategyId }),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.QUESTION_DETAILS, questionId],
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.QUESTION_LIST],
      })
    },
  })
}

export default useDeleteQuestion
