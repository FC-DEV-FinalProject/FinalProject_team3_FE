import { useQuery } from '@tanstack/react-query'

import getQuestionDetails from '../../_api/get-question-details'

interface Props {
  questionId: number
}

const useGetQuestionDetails = ({ questionId }: Props) => {
  return useQuery({
    queryKey: ['questionDetails', questionId],
    queryFn: () => getQuestionDetails({ questionId }),
  })
}

export default useGetQuestionDetails
