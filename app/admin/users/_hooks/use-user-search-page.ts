import { useState } from 'react'

import { searchOptions, tabs } from '../constants'

const useUserSearchPage = () => {
  const [select, setSelect] = useState(searchOptions[0].value)
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [inputValue, setInputValue] = useState('')
  const [keyword, setKeyword] = useState('')
  const [condition, setCondition] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const searchParams = {
    role: activeTab,
    condition,
    keyword,
    page: currentPage,
  }

  const setConditionAndKeyword = () => {
    setKeyword(inputValue)
    setCondition(select)
  }

  const initializeSearchParams = () => {
    setCurrentPage(1)
    setSelect(searchOptions[0].value)
    setInputValue('')
    setKeyword('')
    setCondition(null)
  }

  const onTabChange = (tab: string) => {
    setActiveTab(tab)
    initializeSearchParams()
  }

  return {
    searchParams,
    searchOptions,
    tabs,
    select,
    setSelect,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    keyword,
    setKeyword,
    condition,
    setCondition,
    setConditionAndKeyword,
    currentPage,
    setCurrentPage,
    onTabChange,
  }
}

export default useUserSearchPage
