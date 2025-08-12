'use client'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
}

const StrategyEditButton = ({ strategyId }: Props) => {
  const router = useRouter()
  const onClick = () => {
    router.push(`/my/strategies/manage/${strategyId}`)
  }

  return (
    <>
      <Button onClick={onClick} size="small" className={cx('button')}>
        수정
      </Button>
    </>
  )
}

export default StrategyEditButton
