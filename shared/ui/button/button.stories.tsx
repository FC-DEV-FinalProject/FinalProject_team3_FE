import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'contents',
    size: 'medium',
    variant: 'outline',
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type StoryType = StoryObj<typeof Button>

export const Default: StoryType = {
  args: {},
}

export const Small: StoryType = {
  args: {
    children: 'small',
    size: 'small',
  },
}

export const Medium: StoryType = {
  args: {
    children: 'medium',
    size: 'medium',
  },
}

export const Large: StoryType = {
  args: {
    children: 'large',
    size: 'large',
  },
}

export const Outline: StoryType = {
  args: {
    children: 'outline',
    size: 'medium',
    variant: 'outline',
  },
}

export const Filled: StoryType = {
  args: {
    children: 'filled',
    size: 'medium',
    variant: 'filled',
  },
}

export const Disabled: StoryType = {
  args: {
    children: 'disabled',
    size: 'medium',
    variant: 'filled',
    disabled: true,
  },
}

export const GroupExample: StoryType = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button size="medium" variant="outline" onClick={() => {}}>
        취소
      </Button>
      <Button size="medium" variant="filled" onClick={() => {}}>
        확인
      </Button>
    </div>
  ),
}
