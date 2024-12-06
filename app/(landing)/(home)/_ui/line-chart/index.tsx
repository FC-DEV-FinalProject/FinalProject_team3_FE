'use client'

import dynamic from 'next/dynamic'

import Highcharts from 'highcharts'

import { CardSizeType } from '../top-strategy-card/types'

const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
})

interface Props {
  data: number[]
  isNegative?: boolean
  size?: CardSizeType
}

const getChartDimensions = (size: CardSizeType) => ({
  height: size === 'small' ? 55 : 120,
  width: size === 'small' ? 90 : 185,
})

const LineChart = ({ data, isNegative = false, size = 'small' }: Props) => {
  const dimensions = getChartDimensions(size)

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      height: dimensions.height,
      width: dimensions.width,
      backgroundColor: 'transparent',
      margin: [0, 0, 0, 0],
    },
    title: { text: undefined },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
      min: Math.min(...data) * 0.95,
      max: Math.max(...data) * 1.05,
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 2,
        marker: { enabled: false },
        states: { hover: { enabled: false } },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        type: 'line',
        data,
        color: isNegative ? '#6877FF' : '#FF7752',
      },
    ],
    credits: { enabled: false },
    tooltip: { enabled: false },
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />
}

export default LineChart
