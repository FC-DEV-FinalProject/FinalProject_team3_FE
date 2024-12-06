'use client'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const NoticePostButton = () => {
  const router = useRouter()

  const onClick = () => {
    router.push('/admin/notices/post')
  }

  return (
    <Button onClick={onClick} variant="filled" size="small" className={cx('post-button')}>
      공지 등록하기
    </Button>
  )
}

export default NoticePostButton
