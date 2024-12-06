'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import TotalStar from '@/shared/ui/total-star'

import useGetReviewsData from '../../_hooks/query/use-get-reviews-data'
import AddReview from './add-review'
import ReviewList from './review-list'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
}

const ReviewContainer = ({ strategyId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: reviewData } = useGetReviewsData({ strategyId, page: currentPage })

  return (
    <div className={cx('container')}>
      <div className={cx('title-wrapper')}>
        <p className={cx('review-title')}>리뷰</p>
        <TotalStar
          size="medium"
          averageRating={reviewData?.averageRating}
          totalElements={reviewData?.reviews.totalElements}
        />
      </div>
      <AddReview strategyId={strategyId} />
      {reviewData && reviewData.reviews.content.length !== 0 ? (
        <ReviewList
          strategyId={strategyId}
          reviews={reviewData.reviews.content}
          totalReview={reviewData.reviews.totalElements}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div className={cx('no-review')}>등록된 리뷰가 없습니다.</div>
      )}
    </div>
  )
}

export default ReviewContainer
