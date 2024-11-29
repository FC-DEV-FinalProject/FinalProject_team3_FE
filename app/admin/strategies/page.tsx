'use client'

// TODO: ssr
import { useState } from 'react'

import Tabs from '@/shared/ui/tabs'
import Title from '@/shared/ui/title'

import StockManage from './_ui/stock/stock-manage'
import TradeManage from './_ui/trade/trade-manage'

// import styles from './page.module.scss'

// const cx = classNames.bind(styles)

const tabs = ['종목', '매매유형']

type TabType = '종목' | '매매유형'

const AdminStrategiesPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('종목')

  return (
    <>
      {/* TODO: inline css 제거 */}
      <Title label="종목 및 매매 유형 관리" style={{ margin: '80px 0 26px 12.6px' }} />
      <div
        style={{
          padding: '0 45px 37px',
          borderRadius: '8px',
          marginBottom: '42px',
          backgroundColor: 'aliceblue',
        }}
      >
        <Tabs
          tabs={tabs.map((tab) => ({
            id: tab,
            label: tab,
            content: tab === '종목' ? <StockManage /> : <TradeManage />,
          }))}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      </div>
    </>
  )
}

export default AdminStrategiesPage
