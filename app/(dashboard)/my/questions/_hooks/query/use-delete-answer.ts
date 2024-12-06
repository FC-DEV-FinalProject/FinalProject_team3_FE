import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteAnswer, { DeleteAnswerProps } from '../../_api/delete-answer'

const useDeleteAnswer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ questionId, answerId }: DeleteAnswerProps) =>
      deleteAnswer({ questionId, answerId }),
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

export default useDeleteAnswer
