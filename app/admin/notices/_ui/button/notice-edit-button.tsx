'use client'

import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  noticeId: number
}

const NoticeEditButton = ({ noticeId }: Props) => {
  const router = useRouter()

  const goToEditPage = () => {
    router.push(`/admin/notices/${noticeId}/edit`)
  }

  return (
    <>
      <Button onClick={goToEditPage} size="small" className={cx('button')}>
        수정
      </Button>
    </>
  )
}

export default NoticeEditButton
