'use client'

import { Fragment } from 'react'

import classNames from 'classnames/bind'

import { QuestionStatusType } from '@/shared/types/questions'
import Avatar from '@/shared/ui/avatar'
import Label from '@/shared/ui/label'
import { formatDateTime } from '@/shared/utils/format'

import { QuestionCardProps } from '../../../_ui/question-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type QuestionDetailCardType = 'question' | 'answer'

interface Props extends QuestionCardProps {
  type?: QuestionDetailCardType
  strategyName?: string
  title?: string
  status?: QuestionStatusType
  isAuthor: boolean
  onDelete?: () => void
}

const QuestionDetailCard = ({
  profileImage,
  nickname,
  contents,
  type = 'question',
  status,
  strategyName,
  title = '답변',
  createdAt,
  isAuthor,
  onDelete,
}: Props) => {
  return (
    <div className={cx('card-container')}>
      <div className={cx('card-header')}>
        {type === 'question' && (
          <div className={cx('top-wrapper')}>
            <strong className={cx('strategy-name')}>{strategyName}</strong>
            <Label color={status === '답변 완료' ? 'indigo' : 'orange'}>{status}</Label>
          </div>
        )}
        <h2 className={cx('title', type)}>{title}</h2>
        <div className={cx('bottom-wrapper')}>
          <div className={cx('avatar-wrapper')}>
            <Avatar src={profileImage} size="medium" />
            <span>{nickname}</span>
            <span className={cx('created-at')}>ㅣ {formatDateTime(createdAt)}</span>
          </div>
          {isAuthor && (
            <button type="button" className={cx('delete-button')} onClick={onDelete}>
              삭제
            </button>
          )}
        </div>
      </div>
      <div className={cx('card-contents')}>
        {contents.split('\n').map((line, idx) => (
          <Fragment key={line + idx}>
            {line}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default QuestionDetailCard
