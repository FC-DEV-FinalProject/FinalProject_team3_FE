'use client'

import { useEffect, useState } from 'react'

import { BookmarkIcon, BookmarkOutlineIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import SubscribeWarningModal from '@/shared/ui/modal/subscribe-warning-modal'

import useGetSubscribe from '../../strategies/_hooks/query/use-get-subscribe'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  subscriptionStatus: boolean
  traderName: string
}

const Subscribe = ({ strategyId, subscriptionStatus, traderName }: Props) => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const user = useAuthStore((state) => state.user)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { mutate } = useGetSubscribe()

  useEffect(() => {
    if (subscriptionStatus) {
      setIsSubscribed(true)
    }
  }, [subscriptionStatus])

  const handleSubscribe = (e: React.MouseEvent) => {
    if (user) {
      e.stopPropagation()
      if (user?.nickname === traderName) {
        openModal()
      } else {
        e.preventDefault()
        mutate(strategyId, {
          onSuccess: () => setIsSubscribed(!isSubscribed),
        })
      }
    }
  }

  return (
    <>
      <div className={cx('subscribe-icon')}>
        <button onClick={(e) => handleSubscribe(e)}>
          {isSubscribed ? <BookmarkIcon /> : <BookmarkOutlineIcon />}
        </button>
      </div>
      <SubscribeWarningModal isModalOpen={isModalOpen} onCloseModal={closeModal} />
    </>
  )
}

export default Subscribe
