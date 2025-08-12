'use client'

import { usePathname } from 'next/navigation'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { Button } from '@/shared/ui/button'
import { LinkButton } from '@/shared/ui/link-button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isMyStrategy?: boolean
  isEditable?: boolean
  isSubscribed?: boolean
  strategyId?: number
  subscribers: number
  onClick?: () => void
}

const SubscriberItem = ({
  isSubscribed,
  isEditable = false,
  isMyStrategy = false,
  strategyId,
  subscribers,
  onClick,
}: Props) => {
  const currentPath = usePathname()

  return (
    <div className={cx('container', { edit: isEditable })}>
      <div>
        <span>구독 </span>
        <span>| </span>
        <span>{subscribers}</span>
      </div>
      {!isMyStrategy ? (
        <Button size="small" variant="filled" onClick={onClick}>
          {isSubscribed ? '구독취소' : '구독하기'}
        </Button>
      ) : (
        !currentPath.includes(PATH.STRATEGIES_MANAGE) && (
          <LinkButton
            href={`${PATH.MY_STRATEGIES}/manage/${strategyId}`}
            size="small"
            variant="filled"
            className={cx('trader-button')}
          >
            관리하기
          </LinkButton>
        )
      )}
    </div>
  )
}

export default SubscriberItem
