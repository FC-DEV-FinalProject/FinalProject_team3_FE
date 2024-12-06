import type { Meta, StoryFn } from '@storybook/react'

import StatisticsTable from './index'

const meta: Meta = {
  title: 'components/Statistics-Table',
  component: StatisticsTable,
  tags: ['autodocs'],
}

const assetManagementData = {
  balance: 896217437, // 잔고
  cumulativeTransactionAmount: 896217437, // 누적 거래 금액
  principal: 238704360, // 원금
  operationPeriod: '2년 4월', // 운용 기간
  startDate: '2012-10-11', // 시작 일자
  endDate: '2015-03-11', // 종료 일자 (endDate)
  daysSincePeakUpdate: 513, // 고점 갱신 후 경과일
}

const profitLoss = {
  cumulativeProfitAmount: 247525031, // 누적 수익 금액
  cumulativeProfitRate: 49.24, // 누적 수익률
  maxCumulativeProfitAmount: 247525031, // 최대 누적 수익 금액
  maxCumulativeProfitRate: 49.24, // 최대 누적 수익률
  averageProfitLossAmount: 336311, // 평균 손익 금액
  averageProfitLossRate: 6, // 평균 손익률
  maxDailyProfitAmount: 25257250, // 최대 일 수익 금액
  maxDailyProfitRate: 3.985, // 최대 일 수익률
  maxDailyLossAmount: -17465050, // 최대 일 손실 금액
  maxDailyLossRate: -3.95, // 최대 일 손실률
  roa: 453, // 자산 수익률 (Return on Assets)
  profitFactor: 1.48, // Profit Factor
}

const ddMddInfo = {
  currentDrawdown: 0, // 현재 자본 인하 금액
  currentDrawdownRate: 0, // 현재 자본 인하율
  maxDrawdown: -54832778, // 최대 자본 인하 금액
  maxDrawdownRate: -13.98, // 최대 자본 인하율
}

const tradingInfo = {
  totalTradeDays: 736, // 총 거래 일수
  totalProfitableDays: 508, // 총 이익 일수
  totalLossDays: 228, // 총 손실 일수
  currentConsecutiveLossDays: 6, // 현재 연속 손실 일수
  maxConsecutiveProfitDays: 22, // 최대 연속 이익 일수
  maxConsecutiveLossDays: 8, // 최대 연속 손실 일수
  winRate: 69, // 승률
}
const Table: StoryFn<{ title: string; statisticsData: { [key: string]: string | number } }> = (
  args
) => <StatisticsTable {...args} />

export const Primary = Table.bind({})
Primary.args = {
  title: '자산 및 운영 정보',
  statisticsData: assetManagementData,
}

export const ProfitLoss = Table.bind({})
ProfitLoss.args = {
  title: '손익률 관련 정보',
  statisticsData: profitLoss,
}

export const DDMddInfo = Table.bind({})
DDMddInfo.args = {
  title: 'DD & MDD 정보',
  statisticsData: ddMddInfo,
}

export const TradingInfo = Table.bind({})
TradingInfo.args = {
  title: '거래 관련 정보',
  statisticsData: tradingInfo,
}

export default meta
