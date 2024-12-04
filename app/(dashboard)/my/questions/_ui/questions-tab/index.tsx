'use client'

import { Suspense, useState } from 'react'

import { QuestionSearchConditionType } from '@/shared/types/questions'
import Tabs from '@/shared/ui/tabs'

import QuestionsTabContent from '../questions-tab-content'

interface Props {
  searchOptions: {
    keyword: string
    searchCondition: QuestionSearchConditionType
  }
}

const QuestionsTab = ({ searchOptions }: Props) => {
  const [activeTab, setActiveTab] = useState('all')

  const TABS = [
    {
      id: 'all',
      label: '모든 질문',
      content: (
        <Suspense>
          <QuestionsTabContent
            options={{
              stateCondition: 'ALL',
              searchCondition: searchOptions.searchCondition,
              keyword: searchOptions.keyword,
            }}
          />
        </Suspense>
      ),
    },
    {
      id: 'waiting',
      label: '답변 대기',
      content: (
        <Suspense>
          <QuestionsTabContent
            options={{
              stateCondition: 'WAITING',
              searchCondition: searchOptions.searchCondition,
              keyword: searchOptions.keyword,
            }}
          />
        </Suspense>
      ),
    },
    {
      id: 'completed',
      label: '답변 완료',
      content: (
        <Suspense>
          <QuestionsTabContent
            options={{
              stateCondition: 'COMPLETED',
              searchCondition: searchOptions.searchCondition,
              keyword: searchOptions.keyword,
            }}
          />
        </Suspense>
      ),
    },
  ]

  return <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />
}

export default QuestionsTab
