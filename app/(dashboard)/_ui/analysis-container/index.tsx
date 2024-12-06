'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import Select from '@/shared/ui/select'

import useGetAnalysisChart from '../../strategies/[strategyId]/_hooks/query/use-get-analysis-chart'
import AnalysisChart from './analysis-chart'
import styles from './styles.module.scss'
import TabsWithTable from './tabs-width-table'
import { YAXIS_OPTIONS } from './yaxis-options'

const cx = classNames.bind(styles)

export type AnalysisChartOptionsType = keyof typeof YAXIS_OPTIONS

interface Props {
  strategyId: number
  type?: 'default' | 'my'
}

const AnalysisContainer = ({ strategyId, type = 'default' }: Props) => {
  const [firstOption, setFirstOption] = useState<AnalysisChartOptionsType>('PRINCIPAL')
  const [secondOption, setSecondOption] =
    useState<AnalysisChartOptionsType>('CUMULATIVE_PROFIT_LOSS')
  const { data: chartData } = useGetAnalysisChart({ strategyId, firstOption, secondOption })

  const optionsToArray = Object.entries(YAXIS_OPTIONS)
  const options: { value: string; label: string }[] = []

  for (const [key, value] of optionsToArray) {
    options.push({ value: key, label: value })
  }

  return (
    <div className={cx('container')}>
      <div className={cx('analysis-header')}>
        <p className={cx({ my: type === 'my' })}>분석</p>
        {type === 'default' && (
          <div>
            <Select
              size="large"
              options={options}
              value={firstOption}
              onChange={(newValue) => setFirstOption(newValue as AnalysisChartOptionsType)}
            />
            <Select
              size="large"
              options={options}
              value={secondOption}
              onChange={(newValue) => setSecondOption(newValue as AnalysisChartOptionsType)}
            />
          </div>
        )}
      </div>
      {type === 'default' && (
        <div className={cx('chart-wrapper')}>
          <AnalysisChart analysisChartData={chartData} />
        </div>
      )}
      <TabsWithTable strategyId={strategyId} isEditable={type === 'my' ? true : false} />
    </div>
  )
}

export default AnalysisContainer
