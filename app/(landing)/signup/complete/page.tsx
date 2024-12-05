'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { UserType } from '@/shared/types/auth'
import { LinkButton } from '@/shared/ui/link-button'

import { getNicknameCookie, getUserTypeCookie } from '../_lib/cookies'
import SignupCompleteMessage from '../_ui/signup-complete-message'
import Step from '../_ui/step'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const CompletePage = () => {
  const [userData, setUserData] = useState<{
    userType: UserType | undefined
    nickname: string | undefined
  }>({ userType: undefined, nickname: undefined })

  useEffect(() => {
    const userType = getUserTypeCookie()
    const nickname = getNicknameCookie()
    setUserData({ userType, nickname })
  }, [])

  if (!userData.userType || !userData.nickname) {
    return null
  }

  return (
    <>
      <Step />
      <SignupCompleteMessage nickname={userData.nickname} userType={userData.userType} />
      <div className={cx('button-wrapper')}>
        <LinkButton href={PATH.SIGN_IN} variant="filled">
          로그인하기
        </LinkButton>
        <LinkButton href={PATH.HOME}>홈으로</LinkButton>
      </div>
    </>
  )
}

export default CompletePage
