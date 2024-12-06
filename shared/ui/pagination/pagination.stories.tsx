import type { Meta, StoryObj } from '@storybook/react'

import Pagination from './index'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    maxPage: { control: 'number' },
    onPageChange: { action: 'page changed' },
  },
  args: {
    currentPage: 1,
    maxPage: 10,
    onPageChange: (page: number) => console.log(`Page changed to ${page}`),
  },
} satisfies Meta<typeof Pagination>

export default meta
type StoryType = StoryObj<typeof Pagination>

export const Default: StoryType = {
  args: {},
}

export const StartPage: StoryType = {
  args: {
    currentPage: 1,
    maxPage: 20,
  },
}

export const MiddlePage: StoryType = {
  args: {
    currentPage: 10,
    maxPage: 20,
  },
}

export const LastPage: StoryType = {
  args: {
    currentPage: 20,
    maxPage: 20,
  },
}

export const FewPages: StoryType = {
  args: {
    currentPage: 3,
    maxPage: 5,
  },
}
