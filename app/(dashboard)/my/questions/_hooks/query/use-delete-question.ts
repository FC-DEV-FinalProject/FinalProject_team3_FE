import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteQuestion, { DeleteQuestionProps } from '../../_api/delete-question'

const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ questionId, strategyId }: DeleteQuestionProps) =>
      deleteQuestion({ questionId, strategyId }),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['questionDetails', questionId],
      })

      queryClient.invalidateQueries({
        queryKey: ['questionList'],
      })
    },
  })
}

export default useDeleteQuestion
