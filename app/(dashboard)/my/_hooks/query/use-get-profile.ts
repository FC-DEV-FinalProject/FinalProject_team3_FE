import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { getProfile } from './../../_api/get-profile'

const useGetProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: getProfile,
  })
}

export default useGetProfile
