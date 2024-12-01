import classNames from 'classnames/bind'

import Avatar from '@/shared/ui/avatar'

import StarRating from '../star-rating/index'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  nickname: string
  content: string
  profileImage?: string
  createdAt: string
  starRating: number
  isReviewer: boolean
  isAdmin: boolean
}

const ReviewItem = ({
  nickname,
  profileImage,
  createdAt,
  starRating,
  content,
  isReviewer,
  isAdmin,
}: Props) => {
  const editedCreatedAt = createdAt.slice(0, -3)

  return (
    <li className={cx('review-item')}>
      <div className={cx('information-wrapper')}>
        <div className={cx('reviewer')}>
          <Avatar src={profileImage} />
          <p className={cx('nickname')}>{nickname}</p>
          <span>|</span>
          <span>{editedCreatedAt}</span>
          <StarRating starRating={starRating} />
        </div>
        <div className={cx('button-wrapper')}>
          {isReviewer && (
            <>
              <button>수정</button>
              <button>삭제</button>
            </>
          )}
          {!isReviewer && isAdmin && <button>삭제</button>}
        </div>
      </div>
      <div className={cx('content')}>{content}</div>
    </li>
  )
}

export default ReviewItem
