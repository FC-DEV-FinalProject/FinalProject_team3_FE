import { useQuery } from '@tanstack/react-query'

import { getProfile } from './../../_api/get-profile'

const useGetProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getProfile,
  })
}

export default useGetProfile
