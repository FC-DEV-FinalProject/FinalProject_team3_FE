import type { Meta, StoryFn } from '@storybook/react'

import VerticalTable from './index'

const meta: Meta = {
  title: 'components/Table',
  component: VerticalTable,
  tags: ['autodocs'],
}

const tableHead = ['날짜', '원금', '입출금', '일손익', '일손익률', '누적손익', '누적수익률']
const tableBody = [
  {
    date: '2015-03-12', // 날짜
    principal: 100000000, // 원금
    transaction: 0, // 입출금
    dailyProfitLoss: 332410, // 일 손익
    dailyProfitLossRate: 0.33, // 일 수익률
    cumulativeProfitLoss: 302280, // 누적 손익
    cumulativeProfitLossRate: 0.3, // 누적 수익률
  },
  {
    date: '2015-03-13',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-14',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-15',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-16',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-17',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-18',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-19',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
]

const Table: StoryFn<{ countPerPage: number }> = (args) => (
  <VerticalTable tableHead={tableHead} tableBody={tableBody} currentPage={1} {...args} />
)

export const Primary = Table.bind({})
Primary.args = {
  countPerPage: 7,
}

export const NoData = Table.bind({})
NoData.args = {
  // @ts-expect-error rornlcksg
  tableBody: [],
}

export default meta
