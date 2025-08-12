'use client'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const AdminStrategyPostButton = () => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/my/strategies/add`)
  }

  return (
    <Button onClick={onClick} variant="filled" size="small" className={cx('post-button')}>
      전략 등록하기
    </Button>
  )
}

export default AdminStrategyPostButton
