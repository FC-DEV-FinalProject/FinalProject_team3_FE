import { useQuery } from '@tanstack/react-query'

import getFavoriteStrategyList from '../../_api/get-favorite-strategy-list'

interface Props {
  page: number
  size: number
}

const useGetFavoriteStrategyList = ({ page, size }: Props) => {
  return useQuery({
    queryKey: ['favoriteStrategies', page, size],
    queryFn: () => getFavoriteStrategyList({ page, size }),
  })
}

export default useGetFavoriteStrategyList
