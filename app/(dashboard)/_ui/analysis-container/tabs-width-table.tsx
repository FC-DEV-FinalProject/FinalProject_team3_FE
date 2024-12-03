'use client'

import { useEffect, useState } from 'react'
import React from 'react'

import { DailyGraphIcon, MoneyIcon, MonthlyGraphIcon, StatisticsIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Tabs from '@/shared/ui/tabs'

import useGetStatistics from '../../strategies/[strategyId]/_hooks/query/use-get-statistics'
import AccountContent from './account-content'
import AnalysisContent from './analysis-content'
import StatisticsContent from './statistics-content'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type AnalysisTabType = 'statistics' | 'daily' | 'monthly' | 'account-images'
interface Props {
  strategyId: number
  isEditable?: boolean
}

const TabsWithTable = ({ strategyId, isEditable = false }: Props) => {
  const [activeTab, setActiveTab] = useState<AnalysisTabType>('statistics')
  const [currentPage, setCurrentPage] = useState(1)
  const { data: statisticsData } = useGetStatistics(strategyId)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  const handlePageChange = (page: number) => setCurrentPage(page)

  const TABS = [
    {
      id: 'statistics',
      label: '통계',
      icon: StatisticsIcon,
      content: <StatisticsContent statisticsData={statisticsData} />,
    },
    {
      id: 'daily',
      label: '일간분석',
      icon: DailyGraphIcon,
      content: (
        <AnalysisContent
          type="daily"
          strategyId={strategyId}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isEditable={isEditable}
        />
      ),
    },
    {
      id: 'monthly',
      label: '월간분석',
      icon: MonthlyGraphIcon,
      content: (
        <AnalysisContent
          type="monthly"
          strategyId={strategyId}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ),
    },
    {
      id: 'account-images',
      label: '실거래계좌',
      icon: MoneyIcon,
      content: (
        <div className={cx('table-wrapper')}>
          <AccountContent
            imagesData={[]}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isEditable={isEditable}
          />
        </div>
      ),
    },
  ]

  return (
    <Tabs
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as AnalysisTabType)}
    />
  )
}

export default TabsWithTable
