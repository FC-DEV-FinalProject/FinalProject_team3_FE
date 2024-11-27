'use client'

import { useEffect, useState } from 'react'
import React from 'react'

import { DailyGraphIcon, MoneyIcon, MonthlyGraphIcon, StatisticsIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Tabs from '@/shared/ui/tabs'

import AccountContent from './account-content'
import AnalysisContent from './analysis-content'
import { statisticsData, tableBody } from './example'
import StatisticsContent from './statistics-content'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TabsWithTable = () => {
  const [activeTab, setActiveTab] = useState('statistics')
  const [currentPage, setCurrentPage] = useState(1)

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
      id: 'daily-analysis',
      label: '일간분석',
      icon: DailyGraphIcon,
      content: (
        <AnalysisContent
          type="daily"
          analysisData={tableBody}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ),
    },
    {
      id: 'monthly-analysis',
      label: '월간분석',
      icon: MonthlyGraphIcon,
      content: (
        <AnalysisContent
          type="monthly"
          analysisData={tableBody}
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
          />
        </div>
      ),
    },
  ]

  return <Tabs tabs={TABS} activeTab={activeTab} onTabChange={(id) => setActiveTab(id)} />
}

export default TabsWithTable