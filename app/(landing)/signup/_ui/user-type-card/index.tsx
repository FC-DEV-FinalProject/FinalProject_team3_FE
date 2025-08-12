'use client'

import { useRouter } from 'next/navigation'

import {
  getUserTypeCookie,
  setIsAgreedTermsCookie,
  setUserTypeCookie,
} from '@/app/(landing)/signup/_lib/cookies'
import { InvestorImg, TraderImg } from '@/public/images'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { UserType } from '@/shared/types/auth'

import useSignupStore from '../../_store/use-signup-store'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  userType: UserType
  title: string
  highlight: string
}

const UserTypeCard = ({ userType, title, highlight }: Props) => {
  const router = useRouter()
  const { setUserType } = useSignupStore((state) => state.actions)
  const userTypeCookie = getUserTypeCookie()

  const handleTypeSelect = () => {
    if (userTypeCookie && userTypeCookie !== userType) {
      setIsAgreedTermsCookie(false)
    }

    setUserTypeCookie(userType)
    setUserType(userType)
    router.push(PATH.SIGN_UP_TERMS_OF_USE)
  }

  return (
    <button className={cx('card')} onClick={handleTypeSelect}>
      <h2 className={cx('title')}>{title}</h2>
      <hr className={cx('line')} />
      <p className={cx('contents')}>
        인베스트메틱을 통해 <br />
        <span className={cx('highlight')}>{highlight}</span>해보세요!
      </p>
      {userType === 'TRADER' ? (
        <TraderImg className={cx('image')} />
      ) : (
        <InvestorImg className={cx('image')} />
      )}
    </button>
  )
}

export default UserTypeCard
