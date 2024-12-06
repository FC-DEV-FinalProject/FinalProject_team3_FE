'use client'

import classNames from 'classnames/bind'

import Star from '@/shared/ui/total-star/star-icon'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  starRating?: number
  starRatingValue?: number
  onRatingChange?: (value: number) => void
}

const StarRating = ({ starRating, starRatingValue, onRatingChange }: Props) => {
  return (
    <div className={cx('container')}>
      {starRating
        ? [...Array(Math.floor(starRating))].map((_, idx) => <Star key={idx} size="small" />)
        : [...Array(5)].map((_, idx) => (
            <button
              key={idx}
              className={cx('click-star', idx < (starRatingValue || 0) && 'onColor')}
              onClick={() => onRatingChange && onRatingChange(idx)}
            >
              <Star size="large" />
            </button>
          ))}
    </div>
  )
}

export default StarRating
