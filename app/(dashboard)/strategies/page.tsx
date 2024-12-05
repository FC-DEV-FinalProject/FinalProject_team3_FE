import { Suspense } from 'react'

import classNames from 'classnames/bind'

import Title from '@/shared/ui/title'

import ListHeader from '../_ui/list-header'
import SearchBarContainer from './_ui/search-bar'
import SearchBarSkeleton from './_ui/search-bar/search-bar-skeleton'
import SideContainer from './_ui/side-container'
import StrategyList from './_ui/strategy-list'
import StrategiesLoading from './loading'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const StrategiesPage = () => {
  return (
    <div className={cx('container')}>
      <Title label={'전략 랭킹 모음'} />
      <ListHeader />
      <Suspense fallback={<StrategiesLoading />}>
        <StrategyList />
      </Suspense>
      <SideContainer>
        <Suspense fallback={<SearchBarSkeleton />}>
          <SearchBarContainer />
        </Suspense>
      </SideContainer>
    </div>
  )
}

export default StrategiesPage
