'use client'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import usePatchStrategyApproval from '../../_hooks/query/use-patch-strategy-approval'
import { StrategiesResponseModel } from '../../types'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: StrategiesResponseModel['result']['content'][number]['strategyId']
  isApproved: StrategiesResponseModel['result']['content'][number]['isApproved']
}

const AdminStrategiesApproveTd = ({ strategyId, isApproved }: Props) => {
  const approveMutation = usePatchStrategyApproval(strategyId, 'APPROVED')
  const denyMutation = usePatchStrategyApproval(strategyId, 'DENY')

  if (isApproved !== 'PENDING') return isApproved === 'APPROVED' ? '승인완료' : '승인거부'

  const handleApprove = () => {
    approveMutation.mutate()
  }

  const handleDeny = () => {
    denyMutation.mutate()
  }

  return (
    <Button.ButtonGroup gap="12px">
      <Button size="small" className={cx('container', 'approve')} onClick={handleApprove}>
        승인
      </Button>
      <Button size="small" className={cx('container', 'deny')} onClick={handleDeny}>
        거부
      </Button>
    </Button.ButtonGroup>
  )
}

export default AdminStrategiesApproveTd
