'use client'

import { Suspense } from 'react'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { Button } from '@/shared/ui/button'
import Title from '@/shared/ui/title'

import ListHeader from '../../_ui/list-header'
import MyStrategyList from './_ui/my-strategy-list'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const MyStrategiesPage = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push(PATH.ADD_STRATEGY)
  }
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <Title label={'나의 전략'} />
        <Button size="small" variant="filled" onClick={handleClick}>
          전략 등록하기
        </Button>
      </div>
      <ListHeader type="my" />
      <Suspense fallback={<div>Loading...</div>}>
        <MyStrategyList />
      </Suspense>
    </div>
  )
}

export default MyStrategiesPage
