import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { TradersParamsModel, getTraders } from '../_api/get-traders'

const useGetTraders = ({ page, size, keyword, orderBy }: TradersParamsModel) => {
  return useQuery({
    queryKey: [QUERY_KEY.TRADERS, page, size, keyword, orderBy],
    queryFn: () => getTraders({ page, size, keyword, orderBy }),
  })
}
export default useGetTraders
