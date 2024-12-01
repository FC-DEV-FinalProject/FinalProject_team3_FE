import { Meta, StoryObj } from '@storybook/react'

import { SearchInput } from './index'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  args: {
    placeholder: 'Search...',
  },
  argTypes: {
    onSearchIconClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
}

type StoryType = StoryObj<typeof SearchInput>

export const Default: StoryType = {}

export const WithPlaceholder: StoryType = {
  args: {
    placeholder: 'Type to search...',
  },
}

export const SearchExample: StoryType = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <SearchInput placeholder="Search products" />
      <SearchInput placeholder="Search users" />
    </div>
  ),
}

export default meta
