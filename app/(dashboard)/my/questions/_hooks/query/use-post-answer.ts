import { useMutation, useQueryClient } from '@tanstack/react-query'

import postAnswer from '../../_api/post-answer'

const usePostAnswer = (questionId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => postAnswer(questionId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questionDetails', questionId],
      })

      queryClient.invalidateQueries({
        queryKey: ['questionList'],
      })
    },
  })
}

export default usePostAnswer
