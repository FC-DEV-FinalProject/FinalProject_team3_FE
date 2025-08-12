'use client'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { LinkButton } from '@/shared/ui/link-button'

import useSignupStore from '../_store/use-signup-store'
import SignupCompleteMessage from '../_ui/signup-complete-message'
import Step from '../_ui/step'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const CompletePage = () => {
  const userType = useSignupStore((state) => state.userType)
  const nickname = useSignupStore((state) => state.nickname)

  return (
    <>
      <Step />
      <SignupCompleteMessage nickname={nickname} userType={userType} />
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
