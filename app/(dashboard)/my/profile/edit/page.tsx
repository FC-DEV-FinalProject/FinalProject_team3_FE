'use client'

import useGetProfile from '../../_hooks/query/use-get-profile'
import UserInfo from '../_ui/user-info'

const MyProfileEditPage = () => {
  const { data: profile, isLoading } = useGetProfile()

  if (!profile) {
    return null
  }

  return (
    <>
      <UserInfo profile={profile} isEditable={true} />
    </>
  )
}

export default MyProfileEditPage
