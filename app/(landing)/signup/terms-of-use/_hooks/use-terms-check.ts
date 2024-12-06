import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getIsAgreedTermsCookie, setIsAgreedTermsCookie } from '@/app/(landing)/signup/_lib/cookies'

import { PATH } from '@/shared/constants/path'

interface UseTermsCheckReturnModel {
  isAllChecked: boolean
  isUserTermChecked: boolean
  isPrivacyTermChecked: boolean
  handleAllCheck: () => void
  handleUserTermCheck: () => void
  handlePrivacyTermCheck: () => void
  handleNextClick: () => void
}
export const useTermsCheck = (): UseTermsCheckReturnModel => {
  const router = useRouter()
  const isAgreedTerm = getIsAgreedTermsCookie()

  const [isUserTermChecked, setIsUserTermChecked] = useState(isAgreedTerm)
  const [isPrivacyTermChecked, setIsPrivacyTermChecked] = useState(isAgreedTerm)
  const [isAllChecked, setIsAllChecked] = useState(isAgreedTerm)

  const handleAllCheck = () => {
    setIsAllChecked(!isAllChecked)
    setIsUserTermChecked(!isAllChecked)
    setIsPrivacyTermChecked(!isAllChecked)
  }

  const handleUserTermCheck = () => {
    setIsUserTermChecked(!isUserTermChecked)
    setIsAllChecked(!isUserTermChecked && isPrivacyTermChecked)
  }

  const handlePrivacyTermCheck = () => {
    setIsPrivacyTermChecked(!isPrivacyTermChecked)
    setIsAllChecked(!isPrivacyTermChecked && isUserTermChecked)
  }

  const handleNextClick = () => {
    setIsAgreedTermsCookie(isAllChecked)
    router.push(PATH.SIGN_UP_INFORMATION)
  }

  return {
    isAllChecked,
    isUserTermChecked,
    isPrivacyTermChecked,
    handleAllCheck,
    handleUserTermCheck,
    handlePrivacyTermCheck,
    handleNextClick,
  }
}
