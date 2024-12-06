import { useMutation, useQueryClient } from '@tanstack/react-query'

import patchProfile from '../../_api/patch-profile'

export interface UserProfileModel {
  nickname?: string
  password?: string
  imageDto?: {
    imageName: string
    size: number
  }
  phone?: string
  email?: string
  imageChange: boolean
}

const usePatchUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserProfileModel) => patchProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
    onError: (error) => {
      console.error('Error updating user profile:', error)
    },
  })
}

export default usePatchUserProfile
