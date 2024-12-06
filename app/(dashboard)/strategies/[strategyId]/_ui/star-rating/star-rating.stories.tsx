import { useState } from 'react'

import type { Meta, StoryFn } from '@storybook/react'

import StarRating from './index'

const meta: Meta = {
  title: 'components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
}

const starRating: StoryFn<{ starRating: number | undefined }> = ({ starRating }) => {
  const [starRatingValue, setStarRatingValue] = useState(0)
  const handleStarRating = (idx: number) => setStarRatingValue(idx + 1)
  return (
    <StarRating
      starRating={starRating}
      starRatingValue={starRatingValue}
      onRatingChange={handleStarRating}
    />
  )
}

export const Rated = starRating.bind({})
Rated.args = {
  starRating: 5,
}

export const Rating = starRating.bind({})
Rating.args = {
  starRating: undefined,
}

export default meta
