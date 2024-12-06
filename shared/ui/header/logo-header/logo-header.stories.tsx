import type { Meta, StoryObj } from '@storybook/react'

import StorybookMockContents from '@/shared/utils/storybook-mock-contents'

import LogoHeader from '.'

const meta = {
  title: 'Components/Header/LogoHeader',
  component: LogoHeader,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #ddd',
        }}
      >
        <Story />
        <StorybookMockContents />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof LogoHeader>
export default meta
type StoryType = StoryObj<typeof LogoHeader>

export const Default: StoryType = {
  args: {
    hasLinks: true,
    hasText: true,
  },
}

export const WithoutLogoText: StoryType = {
  args: {
    ...Default.args,
    hasText: false,
  },
}

export const WithoutLinks: StoryType = {
  args: {
    ...Default.args,
    hasLinks: false,
  },
}
