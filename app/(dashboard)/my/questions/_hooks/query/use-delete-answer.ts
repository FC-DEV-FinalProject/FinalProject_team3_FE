import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteAnswer, { DeleteAnswerProps } from '../../_api/delete-answer'

const useDeleteAnswer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ questionId, answerId }: DeleteAnswerProps) =>
      deleteAnswer({ questionId, answerId }),
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

export default useDeleteAnswer
