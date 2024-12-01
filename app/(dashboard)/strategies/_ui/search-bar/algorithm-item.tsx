'use client'

import classNames from 'classnames/bind'

import { AlgorithmItemType } from './_type/search'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  name: AlgorithmItemType
  clickedAlgorithm: AlgorithmItemType | null
  onChange: (algorithm: AlgorithmItemType) => void
}

const AlgorithmItem = ({ name, clickedAlgorithm, onChange }: Props) => {
  return (
    <button
      className={cx('algorithm-button', { active: clickedAlgorithm === name })}
      onClick={() => onChange(name)}
    >
      {name}
    </button>
  )
}

export default AlgorithmItem
