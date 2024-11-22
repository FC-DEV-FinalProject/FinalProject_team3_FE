import type { Meta, StoryObj } from '@storybook/react'

import TradersListCard from './index'

const meta = {
  title: 'Components/TradersListCard',
  component: TradersListCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#222222',
        },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TradersListCard>

export default meta
type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {
  args: {
    nickname: '고양이는야옹하고울지',
    profileImage: 'https://lh3.googleusercontent.com/a/your-image-id',
    strategyCount: 10,
    subscriberCount: 10,
    traderId: '1234',
  },
}

export const WithoutButton: StoryType = {
  args: {
    nickname: '고양이는야옹하고울지',
    profileImage: 'https://lh3.googleusercontent.com/a/your-image-id',
    strategyCount: 10,
    subscriberCount: 10,
    traderId: '1234',
    hasLinkButton: false,
  },
}
