import type { Meta, StoryFn } from '@storybook/react'

import TotalStar, { SizeType, TextColorType } from './index'

const meta: Meta<typeof TotalStar> = {
  title: 'components/TotalStar',
  component: TotalStar,
  tags: ['autodocs'],
}

const star: StoryFn<{ size: SizeType; textColor: TextColorType }> = (args) => (
  <TotalStar averageRating={4.9} totalElements={62} {...args} />
)

export const Primary = star.bind({})
Primary.args = {
  size: 'small',
  textColor: 'gray',
}

export const ForStrategiesPage = star.bind({})
Primary.args = {
  size: 'small',
  textColor: 'black',
}

export const ForReviewPage = star.bind({})
ForReviewPage.args = {
  size: 'medium',
  textColor: 'gray',
}

export default meta
