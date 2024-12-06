import { useState } from 'react'

import { DailyGraphIcon, MoneyIcon, MonthlyGraphIcon, StatisticsIcon } from '@/public/icons'
import type { Meta, StoryFn } from '@storybook/react'

import Tabs, { TabItemModel } from './index'

const meta: Meta = {
  title: 'components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

const tabsData: TabItemModel[] = [
  { id: 'all', label: '모든 회원', content: <div style={{ marginTop: 30 }}>모든회원</div> },
  { id: 'investor', label: '일반', content: <div style={{ marginTop: 30 }}>일반</div> },
  { id: 'trader', label: '트레이더', content: <div style={{ marginTop: 30 }}>트레이더</div> },
  { id: 'admin', label: '관리자', content: <div style={{ marginTop: 30 }}>관리자</div> },
]

const iconTabsData: TabItemModel[] = [
  {
    id: 'statistics',
    label: '통계',
    content: <div style={{ marginTop: 30 }}>통계</div>,
    icon: StatisticsIcon,
  },
  {
    id: 'daily',
    label: '일간분석',
    content: <div style={{ marginTop: 30 }}>일간분석</div>,
    icon: DailyGraphIcon,
  },
  {
    id: 'monthly',
    label: '월간분석',
    content: <div style={{ marginTop: 30 }}>월간분석</div>,
    icon: MonthlyGraphIcon,
  },
  {
    id: 'account',
    label: '실거래계좌',
    content: <div style={{ marginTop: 30 }}>실거래계좌</div>,
    icon: MoneyIcon,
  },
]

export const Default: StoryFn = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id)

  return <Tabs tabs={tabsData} activeTab={activeTab} onTabChange={setActiveTab} />
}

export const WithIcons: StoryFn = () => {
  const [activeTab, setActiveTab] = useState(iconTabsData[0].id)

  return <Tabs tabs={iconTabsData} activeTab={activeTab} onTabChange={setActiveTab} />
}

export default meta
