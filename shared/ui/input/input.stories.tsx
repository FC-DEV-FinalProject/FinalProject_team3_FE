import { Meta, StoryObj } from '@storybook/react'

import { Input } from './index'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    inputSize: 'medium',
    placeholder: 'Enter text',
    type: 'text',
  },
  argTypes: {
    inputSize: {
      control: { type: 'radio' },
      options: ['small', 'compact', 'medium', 'large', 'full'],
    },
    type: {
      control: { type: 'select' },
      options: ['email', 'password', 'tel', 'text'],
    },
    isWhiteDisabled: {
      control: { type: 'boolean' },
      description: 'White disabled input',
    },
  },
  tags: ['autodocs'],
}

export default meta
type StoryType = StoryObj<typeof Input>

export const Default: StoryType = {}

export const Small: StoryType = {
  args: {
    inputSize: 'small',
    placeholder: 'Small input',
  },
}

export const Compact: StoryType = {
  args: {
    inputSize: 'compact',
    placeholder: 'Compact input',
  },
}

export const Medium: StoryType = {
  args: {
    inputSize: 'medium',
    placeholder: 'Medium input',
  },
}

export const Large: StoryType = {
  args: {
    inputSize: 'large',
    placeholder: 'Large input',
  },
}

export const Full: StoryType = {
  args: {
    inputSize: 'full',
    placeholder: 'Full input',
  },
}

export const Disabled: StoryType = {
  args: {
    inputSize: 'medium',
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WhiteDisabled: StoryType = {
  args: {
    inputSize: 'medium',
    placeholder: 'White disabled input',
    isWhiteDisabled: true,
  },
}
