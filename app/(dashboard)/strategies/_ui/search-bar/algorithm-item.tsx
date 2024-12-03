'use client'

import classNames from 'classnames/bind'

import { AlgorithmItemType } from './_type/search'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  optionId: AlgorithmItemType
  name: string
  clickedAlgorithm: AlgorithmItemType | null
  onChange: (algorithm: AlgorithmItemType) => void
}

const AlgorithmItem = ({ optionId, name, clickedAlgorithm, onChange }: Props) => {
  return (
    <button
      className={cx('algorithm-button', { active: clickedAlgorithm === optionId })}
      onClick={() => onChange(optionId)}
    >
      {name}
    </button>
  )
}

export default AlgorithmItem
