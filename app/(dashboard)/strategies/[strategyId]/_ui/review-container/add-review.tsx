'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import { ErrorMessage } from '@/shared/ui/error-message'
import { Textarea } from '@/shared/ui/textarea'

import usePostReview from '../../_hooks/query/use-post-review'
import StarRating from '../star-rating/index'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
}

const AddReview = ({ strategyId }: Props) => {
  const [starRatingValue, setStarRatingValue] = useState(0)
  const [isEmpty, setIsEmpty] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { mutate } = usePostReview(strategyId)
  const handleStarRating = (idx: number) => setStarRatingValue(idx + 1)

  const handleAddReview = () => {
    if (textareaRef.current) {
      const review = textareaRef.current.value.trim()
      if (review && starRatingValue > 0) {
        const content = {
          content: review,
          starRating: starRatingValue,
        }
        mutate(
          { strategyId, content },
          {
            onSuccess: () => {
              if (textareaRef.current) {
                textareaRef.current.value = ''
                setStarRatingValue(0)
              }
            },
          }
        )
      } else {
        setIsEmpty(true)
      }
    }
  }

  return (
    <div className={cx('add-review-wrapper')}>
      <div className={cx('textarea-wrapper')}>
        <Textarea rows={5} placeholder="리뷰를 작성해주세요." ref={textareaRef} />
        {isEmpty && <ErrorMessage errorMessage="리뷰 작성 또는 별점을 선택해주세요." />}
      </div>
      <div className={cx('add-button-wrapper')}>
        <p className={cx('strategy')}>전략이 어땠나요?</p>
        <StarRating starRatingValue={starRatingValue} onRatingChange={handleStarRating} />
        <Button
          variant="filled"
          size="small"
          className={cx('review-button')}
          onClick={handleAddReview}
        >
          리뷰 등록하기
        </Button>
      </div>
    </div>
  )
}

export default AddReview
