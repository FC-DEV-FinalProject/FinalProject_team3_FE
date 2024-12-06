import { Meta, StoryObj } from '@storybook/react'

import { ErrorMessage } from './index'

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessages',
  component: ErrorMessage,
  args: {
    errorMessage: '에러메세지를 입력하세요.',
  },
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'The error message to display.',
      table: {
        type: { summary: 'string | null' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type StoryType = StoryObj<typeof ErrorMessage>

export const Default: StoryType = {}

export const EmptyMessage: StoryType = {
  args: {
    errorMessage: null,
  },
}
