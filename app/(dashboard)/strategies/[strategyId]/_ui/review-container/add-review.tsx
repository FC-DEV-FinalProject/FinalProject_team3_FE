'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import { ErrorMessage } from '@/shared/ui/error-message'
import ReviewGuideModal from '@/shared/ui/modal/review-guide-modal'
import Textarea from '@/shared/ui/textarea'

import usePatchReview from '../../_hooks/query/use-patch-review'
import usePostReview from '../../_hooks/query/use-post-review'
import StarRating from '../star-rating/index'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  reviewId?: number
  isMyStrategy?: boolean
  isEditable?: boolean
  content?: string
  starRating?: number
  onCancel?: () => void
}

const AddReview = ({
  strategyId,
  reviewId,
  isMyStrategy,
  isEditable = false,
  content,
  starRating,
  onCancel,
}: Props) => {
  const [starRatingValue, setStarRatingValue] = useState(starRating ?? 0)
  const [isEmpty, setIsEmpty] = useState(false)
  const { isModalOpen, openModal, closeModal } = useModal()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { mutate: postMutate, isError } = usePostReview(strategyId)
  const { mutate: patchMutate } = usePatchReview(strategyId)

  const handleFetchReview = (type: 'add' | 'edit') => {
    if (textareaRef.current) {
      const review = textareaRef.current.value.trim()
      if (review && starRatingValue > 0) {
        const content = {
          content: review,
          starRating: starRatingValue,
        }
        if (type === 'add') {
          postMutate(
            { strategyId, content },
            {
              onSuccess: () => {
                if (textareaRef.current) {
                  textareaRef.current.value = ''
                  setStarRatingValue(0)
                }
              },
              onError: (err) => {
                if (err && !err.isSuccess) {
                  openModal()
                }
              },
            }
          )
        } else if (type === 'edit' && reviewId && onCancel) {
          patchMutate(
            { strategyId, reviewId, content },
            {
              onSuccess: () => {
                onCancel()
              },
            }
          )
        }
      } else {
        setIsEmpty(true)
      }
    }
  }

  const handleStarRating = (idx: number) => setStarRatingValue(idx + 1)

  return (
    <div className={cx('add-review-wrapper', { edit: isEditable })}>
      <div className={cx('textarea-wrapper')}>
        <Textarea
          defaultValue={content && content}
          rows={5}
          placeholder="리뷰를 작성해주세요."
          ref={textareaRef}
        />
        {isEmpty && <ErrorMessage errorMessage="리뷰 작성 또는 별점을 선택해주세요." />}
      </div>
      <div className={cx('add-button-wrapper', { edit: isEditable })}>
        {!isEditable && <p className={cx('strategy')}>전략이 어땠나요?</p>}
        <StarRating starRatingValue={starRatingValue} onRatingChange={handleStarRating} />
        {isEditable ? (
          <div className={cx('button-wrapper', { edit: isEditable })}>
            <button onClick={() => handleFetchReview('edit')}>저장</button>
            <button onClick={onCancel}>취소</button>
          </div>
        ) : (
          <Button
            variant="filled"
            size="small"
            className={cx('review-button')}
            onClick={() => handleFetchReview('add')}
          >
            리뷰 등록하기
          </Button>
        )}
      </div>
      <ReviewGuideModal
        isModalOpen={isModalOpen}
        isErr={isError}
        isMyStrategy={isMyStrategy}
        onCloseModal={closeModal}
      />
    </div>
  )
}

export default AddReview
