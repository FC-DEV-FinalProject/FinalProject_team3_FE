'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { BookmarkIcon, BookmarkOutlineIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import useModal from '@/shared/hooks/custom/use-modal'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import SigninCheckModal from '@/shared/ui/modal/signin-check-modal'

import useGetSubscribe from '../../strategies/_hooks/query/use-get-subscribe'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  subscriptionStatus: boolean
}

const Subscribe = ({ strategyId, subscriptionStatus }: Props) => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { mutate } = useGetSubscribe()

  useEffect(() => {
    if (subscriptionStatus) {
      setIsSubscribed(true)
    }
  }, [subscriptionStatus])

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      openModal()
    }
    mutate(strategyId, {
      onSuccess: () => setIsSubscribed(!isSubscribed),
    })
  }

  const handleRoute = () => router.push(PATH.SIGN_IN)

  return (
    <>
      <div className={cx('subscribe-icon')}>
        <button onClick={handleSubscribe}>
          {isSubscribed ? <BookmarkIcon /> : <BookmarkOutlineIcon />}
        </button>
      </div>
      {isModalOpen && (
        <SigninCheckModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          onChange={handleRoute}
        />
      )}
    </>
  )
}

export default Subscribe
