'use client'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isMyStrategy?: boolean
  isSubscribed?: boolean
  subscribers: number
  onClick?: () => void
}

const SubscriberItem = ({ isSubscribed, isMyStrategy = false, subscribers, onClick }: Props) => {
  return (
    <div className={cx('container')}>
      <div>
        <span>구독 </span>
        <span>| </span>
        <span>{subscribers}</span>
      </div>
      {!isMyStrategy && (
        <Button size="small" variant="filled" onClick={onClick}>
          {isSubscribed ? '구독취소' : '구독하기'}
        </Button>
      )}
    </div>
  )
}

export default SubscriberItem
