import { useState } from 'react'

import { QuestionSearchConditionType, QuestionStateTapType } from '@/shared/types/questions'

import { searchConditions, tabs } from '../constants'

const useAdminQuestionsPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [keyword, setKeyword] = useState('')
  const [stateCondition, setStateCondition] = useState<QuestionStateTapType>('ALL')
  const [searchCondition, setSearchCondition] = useState<QuestionSearchConditionType>('TITLE')
  const initialSearchParams = {
    keyword: '',
    searchCondition,
  }
  const [searchParams, setSearchParams] = useState(initialSearchParams)

  const initializeSearchParams = () => {
    setKeyword('')
    setSearchCondition('TITLE')
    setSearchParams(initialSearchParams)
  }

  const setConditionAndKeyword = () => {
    setSearchParams({
      keyword,
      searchCondition,
    })
  }

  const onTabChange = (id: string) => {
    initializeSearchParams()
    setActiveTab(id)
    setStateCondition(id as QuestionStateTapType)
  }

  return {
    searchConditions,
    tabs,
    activeTab,
    setActiveTab,
    keyword,
    setKeyword,
    stateCondition,
    setStateCondition,
    searchCondition,
    searchParams,
    setSearchCondition,
    setConditionAndKeyword,
    onTabChange,
    initializeSearchParams,
  }
}

export default useAdminQuestionsPage
