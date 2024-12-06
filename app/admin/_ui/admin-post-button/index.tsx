'use client'

import { CSSProperties } from 'react'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  label: string
  pathname: string
  top?: string
  styles?: CSSProperties
}

const AdminPostButton = ({ label, pathname, top = '-55px', styles }: Props) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/admin/${pathname}/post`)
  }

  return (
    <Button
      onClick={onClick}
      variant="filled"
      size="small"
      className={cx('post-button')}
      style={{ top, ...styles }}
    >
      {label}
    </Button>
  )
}

export default AdminPostButton
