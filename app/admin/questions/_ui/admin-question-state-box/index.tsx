'use client'

import classNames from 'classnames/bind'

import { QuestionStateConditionType } from '@/shared/types/questions'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  questionState: QuestionStateConditionType
}

const AdminQuestionStateBox = ({ questionState }: Props) => {
  return (
    <div
      className={cx(
        'container',
        { waiting: questionState === 'WAITING' },
        { completed: questionState === 'COMPLETED' }
      )}
    >
      {questionState === 'COMPLETED' ? '답변완료' : '답변대기'}
    </div>
  )
}

export default AdminQuestionStateBox
