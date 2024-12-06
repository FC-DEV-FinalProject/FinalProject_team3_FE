import type { Meta, StoryObj } from '@storybook/react'

import { PageNotFound } from './index'

const meta = {
  title: 'Components/PageNotFound',
  component: PageNotFound,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#222222',
        },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageNotFound>

export default meta
type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {}
