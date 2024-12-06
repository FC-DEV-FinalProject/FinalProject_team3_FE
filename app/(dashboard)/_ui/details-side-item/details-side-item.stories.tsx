import type { Meta, StoryFn } from '@storybook/react'

import DetailsSideItem, { InformationModel } from './index'

const meta: Meta<typeof DetailsSideItem> = {
  title: 'components/DetailsSideItem',
  component: DetailsSideItem,
  tags: ['autodocs'],
}

const sideItems: StoryFn<{
  information: InformationModel | InformationModel[]
  strategyId: number
}> = (args) => (
  <div style={{ width: '100%', height: '100%', background: '#fafafa', padding: '20px' }}>
    <DetailsSideItem {...args} />
  </div>
)

export const Default = sideItems.bind({})
Default.args = {
  information: { title: '투자 원금', data: '10,000,000' },
  strategyId: 1,
}

export const Trader = sideItems.bind({})
Trader.args = {
  information: { title: '트레이더', data: '수밍' },
  strategyId: 1,
}

export const Multiple = sideItems.bind({})
Multiple.args = {
  information: [
    { title: 'KP Ratio', data: 0.3993 },
    { title: 'SM SCORE', data: 67.38 },
  ],
  strategyId: 1,
}

export default meta
