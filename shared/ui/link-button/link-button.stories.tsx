import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { LinkButton } from './index'

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
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
    href: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'contents',
    size: 'medium',
    variant: 'outline',
    href: '/example',
  },
} satisfies Meta<typeof LinkButton>

export default meta
type StoryType = StoryObj<typeof LinkButton>

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

export const GroupExample: StoryType = {
  render: () => (
    <Button.ButtonGroup>
      <LinkButton size="medium" variant="outline" href="/cancel">
        로그인
      </LinkButton>
      <LinkButton size="medium" variant="filled" href="/confirm">
        회원가입
      </LinkButton>
    </Button.ButtonGroup>
  ),
}
