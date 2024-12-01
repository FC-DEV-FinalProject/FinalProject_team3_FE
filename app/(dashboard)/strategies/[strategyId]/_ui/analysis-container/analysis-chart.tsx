'use client'

import dynamic from 'next/dynamic'

import classNames from 'classnames/bind'
import Highcharts, { SeriesOptionsType } from 'highcharts'

import styles from './styles.module.scss'
import { YAXIS_OPTIONS } from './yaxis-options'

const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
})

const cx = classNames.bind(styles)

type YAxisType = keyof typeof YAXIS_OPTIONS

interface AnalysisChartDataModel {
  dates: string[]
  data: {
    [key in YAxisType]?: number[]
  }
}

interface Props {
  analysisChartData: AnalysisChartDataModel
}

const AnalysisChart = ({ analysisChartData: data }: Props) => {
  const getOptionName = (sequence: number) => {
    const key = Object.keys(data.data)[sequence] as YAxisType | undefined
    return key ? YAXIS_OPTIONS[key] : ''
  }
  if (!data) return null
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      height: 367,
      backgroundColor: 'transparent',
      margin: [0, 0, 0, 0],
    },
    title: { text: undefined },
    xAxis: {
      visible: false,
      categories: data.dates,
      startOnTick: true,
      endOnTick: true,
    },
    yAxis: [{ visible: false }, { visible: false }],
    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 10,
      y: 0,
      itemStyle: {
        color: '#4D4D4D',
        fontSize: '12px',
      },
      backgroundColor: '#FFFFFF',
      borderColor: '#A7A7A7',
      borderRadius: 4,
      borderWidth: 1,
      padding: 5,
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<div style="margin-bottom: 5px;">{point.key}</div>',
      pointFormat: '<b>{point.y:.2f}</b>',
      footerFormat: '',
      borderColor: '#ECECEC',
      borderWidth: 1,
      shadow: false,
      backgroundColor: '#FFFFFF',
      style: {
        padding: '10px',
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
        lineWidth: 2,
        marker: {
          enabled: false,
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#ffbfad'],
            [1, '#FFFFFF'],
          ],
        },
      },
      spline: {
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: 'areaspline',
        name: getOptionName(0),
        data: Object.values(data.data)[0],
        color: '#ff5f33',
        yAxis: 0,
        stickyTracking: false,
        pointPlacement: 'on',
      },
      ...(Object.values(data.data)[1]
        ? [
            {
              type: 'spline',
              name: getOptionName(1),
              data: Object.values(data.data)[1],
              color: '#6877FF',
              yAxis: 1,
              stickyTracking: false,
              pointPlacement: 'on',
            },
          ]
        : []),
    ] as SeriesOptionsType[],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 960,
          },
          chartOptions: {
            chart: {
              width: null,
            },
          },
        },
      ],
    },
    credits: { enabled: false },
  }
  return (
    <div className={cx('chart')}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}

export default AnalysisChart
