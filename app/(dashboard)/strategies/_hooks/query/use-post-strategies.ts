import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import postStrategies from '../../_api/post-strategies'
import { SearchTermsModel } from '../../_ui/search-bar/_type/search'

const usePostStrategies = ({
  page,
  size,
  searchTerms,
}: {
  page: number
  size: number
  searchTerms: SearchTermsModel
}) => {
  return useQuery({
    queryKey: [QUERY_KEY.STRATEGIES, page, size],
    queryFn: () => postStrategies(page, size, searchTerms),
    staleTime: 0,
  })
}

export default usePostStrategies
