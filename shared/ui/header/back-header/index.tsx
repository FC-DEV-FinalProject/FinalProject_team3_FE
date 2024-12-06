'use client'

// NOTE: 이름 공모전 개최
// TODO: 아이콘 바꿔야함
// TODO: 스타일 추가되면 바꿔야함
import { useRouter } from 'next/navigation'

import { BackIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Header from '..'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const headerStyles = {
  background: 'rgba(251, 251, 251, 0.5)',
  backdropFilter: 'blur(60px)',
  padding: '0',
}

interface Props {
  label: string
}

const BackHeader = ({ label }: Props) => {
  return <Header Left={<Left label={label} />} styles={headerStyles} />
}

const Left = ({ label }: Props) => {
  const router = useRouter()
  const onClick = () => {
    router.back()
  }

  return (
    <button onClick={onClick} className={cx('container')}>
      <BackIcon />
      <span>{label}</span>
    </button>
  )
}

export default BackHeader
