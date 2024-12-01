import classNames from 'classnames/bind'

import { useAuthStore } from '@/shared/stores/use-auth-store'
import Pagination from '@/shared/ui/pagination'

import ReviewItem from './review-item'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export const COUNT_PER_PAGE = 4

interface ReviewContentModel {
  reviewId: number
  nickname: string
  content: string
  imageUrl?: string
  createdAt: string
  starRating: number
}

interface Props {
  reviews: ReviewContentModel[]
  totalReview: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const ReviewList = ({ reviews, totalReview, currentPage, setCurrentPage }: Props) => {
  const handlePageChange = (page: number) => setCurrentPage(page)
  const user = useAuthStore((state) => state.user)

  return (
    <>
      <ul className={cx('review-list')}>
        {reviews.map((review) => (
          <ReviewItem
            key={review.reviewId}
            nickname={review.nickname}
            profileImage={review.imageUrl}
            createdAt={review.createdAt}
            starRating={review.starRating}
            content={review.content}
            isReviewer={user?.nickname === review.nickname}
            isAdmin={user?.role.includes('admin') ?? false}
          />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        maxPage={Math.ceil(totalReview / COUNT_PER_PAGE)}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default ReviewList
