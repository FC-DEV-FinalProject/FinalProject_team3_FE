import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getQuestionDetails from '../../_api/get-question-details'

interface Props {
  questionId: number
}

const useGetQuestionDetails = ({ questionId }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUESTION_DETAILS, questionId],
    queryFn: () => getQuestionDetails({ questionId }),
  })
}

export default useGetQuestionDetails
