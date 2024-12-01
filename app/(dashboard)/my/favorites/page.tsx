import { Suspense } from 'react'

import classNames from 'classnames/bind'

import Title from '@/shared/ui/title'

import FavoriteStrategyList from './_ui/favorite-strategy-list'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const MyFavoritesPage = () => {
  return (
    <div className={cx('container')}>
      <Title label="구독한 전략" />
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteStrategyList />
      </Suspense>
    </div>
  )
}

export default MyFavoritesPage
