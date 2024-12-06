'use client'

import dynamic from 'next/dynamic'

import Highcharts from 'highcharts'
import mouseWheelZoom from 'highcharts/modules/mouse-wheel-zoom'

mouseWheelZoom(Highcharts)

const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
})

export interface AverageMetricsChartDataModel {
  dates: string[]
  data: {
    avgReferencePrice: number[]
    highestSmScoreReferencePrice: number[]
    highestSubscribeScoreReferencePrice: number[]
  }
}

interface Props {
  data: AverageMetricsChartDataModel
}

const AverageMetricsChart = ({ data }: Props) => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      height: 450,
      backgroundColor: '#FFFFFF',
      zooming: {
        mouseWheel: {
          enabled: true,
        },
        type: 'x',
      },
    },
    title: { text: undefined },
    xAxis: {
      categories: data.dates,
      labels: { enabled: false },
      gridLineWidth: 0,
      tickLength: 0,
      lineColor: '#E3E3E3',
      startOnTick: true,
      endOnTick: true,
      tickmarkPlacement: 'on',
    },
    yAxis: [
      {
        title: {
          text: '통합기준가',
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
          text: '기준가',
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
      x: 70,
      y: -10,
      itemStyle: {
        color: '#4D4D4D',
        fontSize: '12px',
      },
      floating: true,
      backgroundColor: '#FFFFFF',
      borderColor: '#A7A7A7',
      borderRadius: 4,
      borderWidth: 1,
      padding: 16,
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
      series: {
        animation: {
          duration: 2000,
        },
        marker: {
          enabled: false,
        },
      },
      areaspline: {
        fillOpacity: 0.5,
        lineWidth: 2,
        marker: {
          enabled: false,
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, '#FF4F1F'],
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
        name: '평균',
        data: data.data.avgReferencePrice,
        color: '#FF4F1F',
        yAxis: 0,
        stickyTracking: false,
        pointPlacement: 'on',
      },
      {
        type: 'spline',
        name: 'SM SCORE 1위',
        data: data.data.highestSmScoreReferencePrice,
        color: '#6877FF',
        yAxis: 1,
        stickyTracking: false,
        pointPlacement: 'on',
      },
      {
        type: 'spline',
        name: '구독 1위',
        data: data.data.highestSubscribeScoreReferencePrice,
        color: '#FFE070',
        yAxis: 1,
        stickyTracking: false,
        pointPlacement: 'on',
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1000,
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

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />
}

export default AverageMetricsChart
