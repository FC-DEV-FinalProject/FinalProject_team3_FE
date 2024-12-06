import { Meta, StoryFn } from '@storybook/react'

import QuestionCard from '.'

const meta: Meta = {
  title: 'Components/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
}

const Template: StoryFn<typeof QuestionCard> = (args) => (
  <div style={{ width: '900px', padding: '20px', backgroundColor: '#f8f9fa' }}>
    <QuestionCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  strategyName: '전략 이름',
  title: '미국발 경제악화가 한국 증시에 미치는 영향은 무엇인가요?',
  contents:
    '안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........',
  nickname: '투자할래요',
  profileImage: '',
  createdAt: '2024-11-03T15:00:00',
  questionState: 'WAITING',
}

export const Answered = Template.bind({})
Answered.args = {
  ...Default.args,
  questionState: 'COMPLETED',
}

export default meta
