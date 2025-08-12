import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'
import { QuestionSearchConditionType, QuestionStateTapType } from '@/shared/types/questions'

import getAdminQuestions from '../../_api/get-admin-questions'

interface ArgModel {
  keyword?: string | null
  searchCondition: QuestionSearchConditionType
  stateCondition: QuestionStateTapType
  page?: number
  size?: number
}

const useAdminQuestions = ({
  keyword = null,
  searchCondition,
  stateCondition,
  page = 0,
  size = 10,
}: ArgModel) => {
  return useQuery({
    queryKey: [QUERY_KEY.ADMIN_QUESTIONS, [keyword, searchCondition, stateCondition, page, size]],
    queryFn: () =>
      getAdminQuestions({
        keyword,
        searchCondition,
        stateCondition,
        page,
        size,
      }),
  })
}

export default useAdminQuestions
