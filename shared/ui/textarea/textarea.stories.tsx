import { Meta, StoryObj } from '@storybook/react'

import Textarea from './index'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    rows: 5,
    placeholder: 'Enter text...',
  },
  argTypes: {
    rows: {
      control: { type: 'number' },
      defaultValue: 5,
    },
  },
  tags: ['autodocs'],
}

type StoryType = StoryObj<typeof Textarea>

export const Default: StoryType = {}

export const Disabled: StoryType = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
}

export const Scroll: StoryType = {
  args: {
    value: 'Hello \n\n Banana \n\n Banana \n\n Banana \n\n Banana \n\n Banana',
    placeholder: 'Textarea with scroll',
  },
}

export default meta
