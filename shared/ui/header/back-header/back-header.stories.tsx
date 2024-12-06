import type { Meta, StoryObj } from '@storybook/react'

import StorybookMockContents from '@/shared/utils/storybook-mock-contents'

import BackHeader from '.'

const meta = {
  title: 'Components/Header/BackHeader',
  component: BackHeader,
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
} satisfies Meta<typeof BackHeader>
export default meta
type StoryType = StoryObj<typeof BackHeader>

export const Default: StoryType = {
  render: () => <BackHeader label="목록으로 돌아가기" />,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
