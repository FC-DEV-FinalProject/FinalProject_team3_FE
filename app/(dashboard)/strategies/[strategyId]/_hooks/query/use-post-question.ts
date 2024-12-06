import { useMutation } from '@tanstack/react-query'

import postQuestions from '../../_api/post-question'

interface Props {
  strategyId: number
  title: string
  content: string
}

const usePostQuestion = () => {
  return useMutation({
    mutationFn: ({ strategyId, title, content }: Props) =>
      postQuestions(strategyId, title, content),
  })
}

export default usePostQuestion
