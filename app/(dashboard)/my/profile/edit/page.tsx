'use client'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { LinkButton } from '@/shared/ui/link-button'

import useGetProfile from '../../_hooks/query/use-get-profile'
import UserInfo from '../_ui/user-info'
import UserProfile from '../_ui/user-profile'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const MyProfileEditPage = () => {
  const { data: profile } = useGetProfile()

  if (!profile) {
    return null
  }

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>나의 정보</p>
      <div className={cx('wrapper')}>
        <UserInfo profile={profile} isEditable={true} />
        <div className={cx('user-profile')}>
          <UserProfile role={profile.role} nickname={profile.nickname} email={profile.email} />
          <div className={cx('link-button')}>
            <LinkButton href={PATH.PROFILE_WITHDRAW}>탈퇴하기</LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfileEditPage
