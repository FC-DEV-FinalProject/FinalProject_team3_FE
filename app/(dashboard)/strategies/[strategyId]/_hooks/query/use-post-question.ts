import { useMutation, useQueryClient } from '@tanstack/react-query'

import postQuestions from '../../_api/post-question'

interface Props {
  strategyId: number
  title: string
  content: string
}

const usePostQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ strategyId, title, content }: Props) =>
      postQuestions(strategyId, title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionList'] })
    },
  })
}

export default usePostQuestion
