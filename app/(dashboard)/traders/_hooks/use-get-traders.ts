import { useQuery } from '@tanstack/react-query'

import { TradersParamsModel, getTraders } from '../_api/get-traders'

const useGetTraders = ({ page, size, keyword, orderBy }: TradersParamsModel) => {
  return useQuery({
    queryKey: ['traders', page, size, keyword, orderBy],
    queryFn: () => getTraders({ page, size, keyword, orderBy }),
  })
}
export default useGetTraders
