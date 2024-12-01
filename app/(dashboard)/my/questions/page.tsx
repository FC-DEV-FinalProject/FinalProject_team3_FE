'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import { DropdownValueType } from '@/shared/ui/dropdown/types'
import { SearchInput } from '@/shared/ui/search-input'
import Select from '@/shared/ui/select'
import Title from '@/shared/ui/title'

import QuestionsTab from './_ui/questions-tab'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const searchSelectOptions = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'trader',
    label: '트레이더',
  },
  {
    value: 'title',
    label: '제목',
  },
  {
    value: 'strategy',
    label: '전략명',
  },
]

const MyQuestionsPage = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownValueType>('최신순')

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
          <SearchInput />
        </div>
      </div>
      <QuestionsTab />
    </div>
  )
}

export default MyQuestionsPage
