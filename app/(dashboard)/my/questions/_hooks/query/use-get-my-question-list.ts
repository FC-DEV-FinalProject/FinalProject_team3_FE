import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'
import { UserType } from '@/shared/types/auth'
import { QuestionSearchOptionsModel } from '@/shared/types/questions'

import getMyQuestionList from '../../_api/get-my-question-list'

interface Props {
  page: number
  size: number
  options: QuestionSearchOptionsModel
  userType: UserType
}

const useGetMyQuestionList = ({ page, size, userType, options }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUESTION_LIST, page, size, options],
    queryFn: () => {
      const { keyword, searchCondition, stateCondition } = options
      return getMyQuestionList({
        userType,
        page,
        size,
        keyword,
        searchCondition,
        stateCondition,
      })
    },
  })
}

export default useGetMyQuestionList
