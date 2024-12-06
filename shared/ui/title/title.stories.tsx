import type { Meta, StoryObj } from '@storybook/react'

import StorybookMockContents from '@/shared/utils/storybook-mock-contents'

import Title from '.'
import BackHeader from '../header/back-header'

const meta = {
  title: 'Components/Title',
  component: Title,
  argTypes: {
    marginLeft: {
      control: 'select',
      options: ['0px', '40px', '80px'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Title>
export default meta
type StoryType = StoryObj<typeof Title>

export const Default: StoryType = {
  args: {
    label: '전략 상세보기',
  },
}

export const WithSubtitle: StoryType = {
  args: {
    ...Default.args,
    subtitle: '트레이더 40명의 200가지 전략을 볼 수 있습니다.',
  },
}

export const WithHeader: StoryType = {
  decorators: [
    (Story) => (
      <>
        <div
          style={{
            height: '400px',
            overflow: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <BackHeader label="목록으로 돌아가기" />
          <Story />
          <div style={{ marginTop: '20px', marginLeft: '40px' }}>
            <StorybookMockContents />
          </div>
        </div>
      </>
    ),
  ],
  args: {
    ...Default.args,
    marginLeft: '40px',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
