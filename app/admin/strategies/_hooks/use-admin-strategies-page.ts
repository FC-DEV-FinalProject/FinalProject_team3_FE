import { useState } from 'react'

import { tabs } from '../constants'
import { AdminStrategiesTapType } from '../types'

const useAdminQuestionsPage = () => {
  const [activeTab, setActiveTab] = useState<AdminStrategiesTapType>('ALL')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const initialSearchParams = {
    searchWord: '',
  }
  const [searchParams, setSearchParams] = useState(initialSearchParams)

  const initializeSearchParams = () => {
    setKeyword('')
    setSearchParams(initialSearchParams)
  }

  const searchWithKeyword = () => {
    setSearchParams({
      searchWord: keyword,
    })
  }

  const onTabChange = (id: string) => {
    initializeSearchParams()
    setActiveTab(id as AdminStrategiesTapType)
  }

  return {
    tabs,
    activeTab,
    setActiveTab,
    keyword,
    setKeyword,
    currentPage,
    setCurrentPage,
    searchParams,
    searchWithKeyword,
    onTabChange,
    initializeSearchParams,
  }
}

export default useAdminQuestionsPage
