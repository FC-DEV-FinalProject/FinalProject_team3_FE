import { useState } from 'react'

import { searchOptions, tabs } from '../constants'

const useUserSearchPage = () => {
  const [select, setSelect] = useState(searchOptions[0].value)
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [inputValue, setInputValue] = useState('')
  const [keyword, setKeyword] = useState('')
  const [condition, setCondition] = useState<string | null>(null)

  const setConditionAndKeyword = () => {
    setKeyword(inputValue)
    setCondition(select)
  }

  return {
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
  }
}

export default useUserSearchPage
