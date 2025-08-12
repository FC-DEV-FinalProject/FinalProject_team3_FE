import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import postAnswer from '../../_api/post-answer'

const usePostAnswer = (questionId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => postAnswer(questionId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.QUESTION_DETAILS, questionId],
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.QUESTION_LIST],
      })
    },
  })
}

export default usePostAnswer
