import { useMutation } from '@tanstack/react-query'

import { findCredentialsAPI } from '@/shared/api/find-credentials'

export const useFindCredentials = () => {
  const findEmailMutation = useMutation({
    mutationFn: (phone: string) => findCredentialsAPI.findEmail(phone),
  })

  const authenticateMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      findCredentialsAPI.authenticate(email, code),
  })

  const resetPasswordMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      findCredentialsAPI.resetPassword(email, password),
  })

  return {
    findEmailMutation,
    authenticateMutation,
    resetPasswordMutation,
  }
}
