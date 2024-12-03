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
  if (!data) return <p>등록된 데이터가 없습니다.</p>
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      height: 367,
      backgroundColor: 'transparent',
      margin: [10, 50, 10, 50],
      zoomType: 'x',
    } as Highcharts.ChartOptions,
    title: { text: undefined },
    xAxis: {
      visible: false,
      categories: data.dates,
      min: data.dates.length > 30 ? data.dates.length - 30 : 0,
      max: data.dates.length - 1,
    },
    yAxis: [
      {
        title: {
          text: getOptionName(0),
          style: {
            color: '#797979',
            fontSize: '10px',
          },
        },
        labels: {
          style: {
            color: '#797979',
            fontSize: '10px',
          },
        },
      },
      {
        title: {
          text: getOptionName(1),
          style: {
            color: '#797979',
            fontSize: '10px',
          },
        },
        opposite: true,
        labels: {
          style: {
            color: '#797979',
            fontSize: '10px',
          },
        },
      },
    ],
    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 40,
      y: -10,
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
        lineWidth: 1,
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
        lineWidth: 1,
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
