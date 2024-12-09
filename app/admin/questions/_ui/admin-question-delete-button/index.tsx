'use client'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import useDeleteQuestion from '../../_hooks/query/use-delete-question'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  questionId: number
  strategyId: number
}

const AdminQuestionDeleteButton = ({ questionId, strategyId }: Props) => {
  const { mutate, isPending } = useDeleteQuestion({ strategyId, questionId })
  const onClick = () => mutate()

  return (
    <Button
      variant="filled"
      onClick={onClick}
      disabled={isPending}
      size="small"
      style={{ padding: '7px 16px' }}
      className={cx('button')}
    >
      삭제
    </Button>
  )
}

export default AdminQuestionDeleteButton
