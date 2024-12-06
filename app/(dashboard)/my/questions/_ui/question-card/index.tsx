import Link from 'next/link'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { QuestionStateConditionType } from '@/shared/types/questions'
import Avatar from '@/shared/ui/avatar'
import Label from '@/shared/ui/label'
import { formatDateTime } from '@/shared/utils/format'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export interface QuestionCardProps {
  contents: string
  nickname: string
  profileImage?: string
  createdAt: string
}

interface Props extends QuestionCardProps {
  questionId: number
  strategyName: string
  title: string
  questionState: QuestionStateConditionType
}

const QuestionCard = ({
  questionId,
  strategyName,
  title,
  contents,
  nickname,
  profileImage,
  createdAt,
  questionState,
}: Props) => {
  const status = questionState === 'COMPLETED' ? '답변 완료' : '답변 대기'

  return (
    <div className={cx('card-container')}>
      <Link href={`${PATH.MY_QUESTIONS}/${questionId}`}>
        <div className={cx('top-wrapper')}>
          <strong className={cx('strategy-name')}>{strategyName}</strong>
          <span className={cx('created-at')}>{formatDateTime(createdAt)}</span>
        </div>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('contents')}>{contents}</p>
        <div className={cx('bottom-wrapper')}>
          <div className={cx('avatar-wrapper')}>
            <Avatar src={profileImage} size="medium" />
            <span>{nickname}</span>
          </div>
          <Label color={questionState === 'COMPLETED' ? 'indigo' : 'orange'}>{status}</Label>
        </div>
      </Link>
    </div>
  )
}

export default QuestionCard
