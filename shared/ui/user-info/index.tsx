import { CameraIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Avatar from '../avatar'
import { Button } from '../button'
import { ErrorMessage } from '../error-message'
import { Input } from '../input'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  className?: string
}

export const UserInfo = ({ className }: Props) => {
  return (
    <div className={cx('container')}>
      <p>개인정보</p>
      <div className={cx('avatar-wrapper')}>
        <Avatar size="large"></Avatar>

        <CameraIcon className={cx('camera-icon')} />
      </div>
      <Button>프로필사진 삭제</Button>

      <div className={cx('input-wrapper')}>
        <p>이름</p>
        <Input />
        <p>닉네임</p>
        <Input />
        <p>이메일</p>
        <Input />
        <p>휴대전화</p>
        <Input />
        <p>생년월일</p>
        <Input />
        <p>비밀번호</p>
        <Input />
        <ErrorMessage />
        <p>비밀번호 확인</p>
        <Input />
      </div>
      <div className={cx('button-wrapper')}>
        <Button>취소</Button>
        <Button>저장하기</Button>
      </div>
    </div>
  )
}
