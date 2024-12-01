import type { Meta, StoryObj } from '@storybook/react'

import Avatar from './index'

const meta = {
  title: 'components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'xlarge', 'xxlarge'],
      defaultValue: 'small',
    },
    src: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Avatar>

type StoryType = StoryObj<typeof Avatar>

const AVATAR = 'https://avatars.githubusercontent.com/u/108856689?v=4'

export const Default: StoryType = {
  args: { src: AVATAR },
}

export const NoImage: StoryType = {
  args: {},
}

export const Sizes: StoryType = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <Avatar size="small" />
      <Avatar size="medium" />
      <Avatar size="large" />
      <Avatar size="xlarge" />
      <Avatar size="xxlarge" />
    </div>
  ),
}

export default meta
