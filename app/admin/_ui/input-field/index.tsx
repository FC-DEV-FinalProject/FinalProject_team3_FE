'use client'

import { ReactNode } from 'react'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  label: string
  Input: ReactNode
}

const InputField = ({ label, Input }: Props) => {
  return (
    <label className={cx('container')}>
      <span className={cx('label')}>{label}</span>
      <div className={cx('input')}>{Input}</div>
    </label>
  )
}

export default InputField
