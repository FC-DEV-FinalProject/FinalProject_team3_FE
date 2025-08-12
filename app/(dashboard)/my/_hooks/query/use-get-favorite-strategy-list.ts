import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getFavoriteStrategyList from '../../_api/get-favorite-strategy-list'

interface Props {
  page: number
  size: number
}

const useGetFavoriteStrategyList = ({ page, size }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_FAVORITE_STRATEGIES, page, size],
    queryFn: () => getFavoriteStrategyList({ page, size }),
  })
}

export default useGetFavoriteStrategyList
