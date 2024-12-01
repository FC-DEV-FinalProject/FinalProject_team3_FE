'use client'

import dynamic from 'next/dynamic'

import classNames from 'classnames/bind'
import Highcharts from 'highcharts'

import { ProfitRateChartDataModel } from '@/shared/types/strategy-data'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
})

interface Props {
  profitRateChartData: ProfitRateChartDataModel
}

const AreaChart = ({ profitRateChartData: data }: Props) => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      height: 100,
      backgroundColor: 'transparent',
      margin: [0, 0, 0, 0],
    },
    title: { text: undefined },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
      min: Math.min(...data.profitRates),
      max: Math.max(...data.profitRates),
    },
    legend: { enabled: false },
    plotOptions: {
      areaspline: {
        lineWidth: 1,
        lineColor: '#4d4d4d',
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    series: [
      {
        type: 'areaspline',
        data: data.dates.map((x, idx) => ({
          x: new Date(x).getTime(),
          y: data.profitRates[idx],
        })),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#4d4d4d'],
            [1, 'rgba(255, 255, 255, 0)'],
          ],
        },
      },
    ],
    credits: { enabled: false },
    tooltip: { enabled: false },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 200,
          },
          chartOptions: {
            chart: {
              width: null,
            },
          },
        },
      ],
    },
  }

  return (
    <div className={cx('chart')}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}

export default AreaChart
