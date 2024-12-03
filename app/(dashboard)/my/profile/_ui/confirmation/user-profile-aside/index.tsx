import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  onClick?: () => void
}

export const Confirmation = ({ onClick }: Props) => {
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
        <Button className={cx('left-button')} onClick={onClick}>
          취소
        </Button>
        <Button className={cx('right-button')} variant="filled" onClick={onClick}>
          탈퇴
        </Button>
      </div>
    </div>
  )
}
