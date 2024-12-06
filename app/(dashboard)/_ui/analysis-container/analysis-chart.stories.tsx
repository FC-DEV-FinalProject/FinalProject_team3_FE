import type { Meta, StoryObj } from '@storybook/react'

import AnalysisChart from './analysis-chart'

const meta = {
  title: 'Components/AnalysisChart',
  component: AnalysisChart,
  tags: ['autodocs'],
} satisfies Meta<typeof AnalysisChart>

type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '900px' }}>
          <Story />
        </div>
      )
    },
  ],
  args: {
    analysisChartData: {
      dates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06'],
      data: {
        CURRENT_DRAWDOWN: [2000, 5660, 4000, 9000, 7000, 10000],
        PRINCIPAL: [50000, 60000, 80000, 80000, 80000, 80000],
      },
    },
  },
}

export const SameOption: StoryType = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '900px' }}>
          <Story />
        </div>
      )
    },
  ],
  args: {
    analysisChartData: {
      dates: [...Default.args.analysisChartData.dates],
      data: {
        CURRENT_DRAWDOWN: [2000, 5660, 4000, 9000, 7000, 10000],
      },
    },
  },
}

export default meta
