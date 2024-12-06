import { Meta, StoryFn } from '@storybook/react'

import StrategyIntroduction from '.'

const meta: Meta = {
  title: 'components/StrategyIntroduction',
  component: StrategyIntroduction,
  tags: ['autodocs'],
}

export default meta

const introduction: StoryFn<{ content: string }> = ({ content }) => (
  <div style={{ width: '900px', padding: '20px', backgroundColor: '#fafafa' }}>
    <StrategyIntroduction content={content} />
  </div>
)

export const Default = introduction.bind({})
Default.args = {
  content: '안녕하세요. 전랙에 대한 설명입니다.',
}

export const MaxContent = introduction.bind({})
MaxContent.args = {
  content:
    '전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 안녕하세요. 안녕하세요. 안녕하세요..전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 전략에 대한 상세한 설명을 입력해주세요. 안녕하세요. 안녕하세요.',
}
