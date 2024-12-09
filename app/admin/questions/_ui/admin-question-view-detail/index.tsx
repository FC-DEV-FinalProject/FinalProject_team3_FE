'use client'

import useDeleteQuestion from '@/app/(dashboard)/my/questions/_hooks/query/use-delete-question'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  questionId: number
  strategyId: number
}

const AdminQuestionViewDetailButton = ({ questionId, strategyId }: Props) => {
  // const { mutate, isPending } = useDeleteQuestion({ strategyId, questionId })

  return (
    <Button
      variant="filled"
      // onClick={() => mutate()}
      // disabled={isPending}
      size="small"
      style={{ padding: '7px 16px' }}
      className={cx('button')}
    >
      삭제
    </Button>
  )
}

export default AdminQuestionViewDetailButton
