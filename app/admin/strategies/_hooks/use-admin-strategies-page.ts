import { useState } from 'react'

import { tabs } from '../constants'
import { AdminStrategiesTapType } from '../types'

const useAdminQuestionsPage = () => {
  const [activeTab, setActiveTab] = useState<AdminStrategiesTapType>('ALL')
  const [inputValue, setInputValue] = useState('')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const searchParams = {
    searchWord: keyword,
    page: currentPage,
  }

  const initializeSearchParams = () => {
    setInputValue('')
    setKeyword('')
    setCurrentPage(1)
  }

  const searchWithKeyword = () => {
    setKeyword(inputValue)
    setCurrentPage(1)
  }

  const onTabChange = (id: string) => {
    initializeSearchParams()
    setActiveTab(id as AdminStrategiesTapType)
  }

  return {
    tabs,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    currentPage,
    setCurrentPage,
    searchParams,
    searchWithKeyword,
    onTabChange,
    initializeSearchParams,
  }
}

export default useAdminQuestionsPage
