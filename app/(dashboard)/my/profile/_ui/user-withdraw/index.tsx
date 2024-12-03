import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const UserWithdraw = () => {
  const router = useRouter()
  const handleWithdraw = () => {}
  const handleBack = () => {
    router.back()
  }
  return (
    <div className={cx('container')}>
      <p className={cx('title')}>회원탈퇴</p>
      <div className={cx('line')}></div>
      <p className={cx('message')}>회원 탈퇴 메세지</p>
      <div className={cx('content')}>
        <div className={cx('message-wrapper')}>
          <p>ㆍ탈퇴 즉시 모든 개인정보가 삭제됩니다.</p>
          <p>ㆍ구독한 전략에 대한 모든 내용이 삭제됩니다.</p>
        </div>
      </div>
      <div className={cx('button-wrapper')}>
        <Button className={cx('left-button')} onClick={handleBack}>
          뒤로가기
        </Button>
        <Button className={cx('right-button')} variant="filled" onClick={handleWithdraw}>
          탈퇴
        </Button>
      </div>
    </div>
  )
}
export default UserWithdraw
