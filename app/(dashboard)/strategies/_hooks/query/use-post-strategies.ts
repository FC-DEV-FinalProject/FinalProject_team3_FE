import { useQuery } from '@tanstack/react-query'

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
    queryKey: ['strategies'],
    queryFn: () => postStrategies(page, size, searchTerms),
  })
}

export default usePostStrategies
