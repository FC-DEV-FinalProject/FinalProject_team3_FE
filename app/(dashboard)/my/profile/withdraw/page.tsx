'use client'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import WithdrawCheckModal from '@/shared/ui/modal/withdraw-check-modal'

import useGetProfile from '../../_hooks/query/use-get-profile'
import { useWithdraw } from '../../_hooks/query/use-user-withdrawal'
import UserProfile from '../_ui/user-profile'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const MyProfileWithdrawPage = () => {
  const router = useRouter()
  const { mutate: withdraw, isPending } = useWithdraw()
  const { isModalOpen, openModal, closeModal } = useModal()

  const handleWithdraw = () => {
    withdraw()
    closeModal()
  }

  const handleBack = () => {
    router.back()
  }

  const { data: profile } = useGetProfile()

  if (!profile) {
    return null
  }

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>나의 정보</p>
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <p className={cx('withdraw-title')}>회원 탈퇴</p>
          <div className={cx('message-wrapper')}>
            <p className={cx('withdraw-message')}>회원 탈퇴 메세지</p>
            <div className={cx('notice-list')}>
              <p>ㆍ탈퇴 즉시 모든 개인정보가 삭제됩니다.</p>
              <p>ㆍ구독한 전략에 대한 모든 내용이 삭제됩니다.</p>
            </div>
          </div>
          <div className={cx('button-wrapper')}>
            <Button className={cx('left-button')} onClick={handleBack} disabled={isPending}>
              뒤로가기
            </Button>
            <Button
              className={cx('right-button')}
              variant="filled"
              onClick={openModal}
              disabled={isPending}
            >
              {isPending ? '처리중...' : '탈퇴'}
            </Button>
          </div>
        </div>
        <div className={cx('user-profile')}>
          <UserProfile
            role={profile.role}
            nickname={profile.nickname}
            email={profile.email}
            imageURL={profile.imageUrl ? profile.imageUrl : undefined}
          />
        </div>
      </div>
      <WithdrawCheckModal
        isModalOpen={isModalOpen}
        onCloseModal={closeModal}
        onConfirm={handleWithdraw}
      />
    </div>
  )
}

export default MyProfileWithdrawPage
