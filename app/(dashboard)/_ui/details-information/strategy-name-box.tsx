import React from 'react'

import StrategiesIcon from '@/app/(dashboard)/_ui/strategies-item/strategies-icon'
import classNames from 'classnames/bind'

import useGetProposalDownload from '../../strategies/[strategyId]/_hooks/query/use-get-proposal-download'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  iconUrls?: string[]
  iconNames?: string[]
  name: string
}

const StrategyNameBox = ({ strategyId, iconUrls, iconNames, name }: Props) => {
  const { mutate } = useGetProposalDownload()

  const handleDownload = () => {
    mutate({ strategyId, name })
  }

  return (
    <div className={cx('name-container')}>
      <StrategiesIcon iconUrls={iconUrls} iconNames={iconNames} isDetailsPage={true} />
      <p className={cx('name')}>{name}</p>
      <button onClick={handleDownload}>제안서 다운로드</button>
    </div>
  )
}

export default StrategyNameBox
