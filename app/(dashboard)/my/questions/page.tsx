'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames/bind'

import { QuestionSearchConditionType } from '@/shared/types/questions'
import { DropdownValueType } from '@/shared/ui/dropdown/types'
import { SearchInput } from '@/shared/ui/search-input'
import Select from '@/shared/ui/select'
import Title from '@/shared/ui/title'

import QuestionsTab from './_ui/questions-tab'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const searchSelectOptions = [
  {
    value: 'TITLE',
    label: '제목',
  },
  {
    value: 'CONTENT',
    label: '내용',
  },
  {
    value: 'TITLE_OR_CONTENT',
    label: '제목 또는 내용',
  },
  {
    value: 'TRADER_NAME',
    label: '트레이더명',
  },
  {
    value: 'INVESTOR_NAME',
    label: '투자자명',
  },
  {
    value: 'STRATEGY_NAME',
    label: '전략명',
  },
]

const MyQuestionsPage = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownValueType>('TITLE')
  const [searchOptions, setSearchOptions] = useState({
    keyword: '',
    searchCondition: selectedOption as QuestionSearchConditionType,
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSearch = () => {
    setSearchOptions({
      keyword: inputRef.current?.value || '',
      searchCondition: selectedOption as QuestionSearchConditionType,
    })
  }

  return (
    <div className={cx('container')}>
      <div className={cx('title-wrapper')}>
        <Title label="문의 내역" />
        <div className={cx('search-wrapper')}>
          <Select
            size="small"
            value={selectedOption}
            placeholder="검색 조건"
            onChange={setSelectedOption}
            options={searchSelectOptions}
          />
          <SearchInput
            ref={inputRef}
            placeholder="검색어를 입력하세요."
            onSearchIconClick={handleSearch}
          />
        </div>
      </div>
      <QuestionsTab searchOptions={searchOptions} />
    </div>
  )
}

export default MyQuestionsPage
