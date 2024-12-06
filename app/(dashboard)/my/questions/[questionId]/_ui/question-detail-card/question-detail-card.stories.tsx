import { Meta, StoryFn } from '@storybook/react'

import QuestionDetailCard from '.'

const meta: Meta = {
  title: 'Components/QuestionDetailCard',
  component: QuestionDetailCard,
  tags: ['autodocs'],
}

const Template: StoryFn<typeof QuestionDetailCard> = (args) => (
  <div style={{ width: '900px', padding: '20px', backgroundColor: '#f8f9fa' }}>
    <QuestionDetailCard {...args} />
  </div>
)

export const Question = Template.bind({})
Question.args = {
  type: 'question',
  strategyName: '엄청난 전략',
  title: '미국발 경제악화가 한국 증시에 미치는 영향은 무엇인가요?',
  contents:
    '안녕하세요. 주식투자를 시작하려고 하는데 미국의 경제 상황이 좋지 않다고 들었습니다. 이런 상황에서 한국 증시는 어떤 영향을 받을까요? 구체적인 설명 부탁드립니다.',
  nickname: '투자초보',
  profileImage: '',
  createdAt: '2024-11-03T15:00:00',
  isAuthor: false,
  onDelete: () => alert('삭제 버튼 클릭'),
}

export const QuestionWithDeleteButton = Template.bind({})
QuestionWithDeleteButton.args = {
  ...Question.args,
  isAuthor: true,
}

export const Answer = Template.bind({})
Answer.args = {
  type: 'answer',
  title: '답변',
  contents:
    '안녕하세요. 문의하신 내용에 대해 답변드리겠습니다. 미국과 한국 증시는 높은 상관관계를 보이고 있어 미국의 경제 상황이 한국 증시에 큰 영향을 미칠 수 있습니다. 구체적으로는...',
  nickname: '전문가',
  profileImage: '',
  createdAt: '2024-11-03T16:30:00',
  isAuthor: false,
  onDelete: () => alert('삭제 버튼 클릭'),
}

export const AnswerWithDeleteButton = Template.bind({})
AnswerWithDeleteButton.args = {
  ...Answer.args,
  isAuthor: true,
}

export default meta
