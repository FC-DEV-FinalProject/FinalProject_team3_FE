import { CameraIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Avatar from '../avatar'
import { Button } from '../button'
import { Input } from '../input'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  className?: string
  isProfileImageDelete: boolean
  onClick?: () => void
}

export const UserInfo = ({ isProfileImageDelete, onClick, className }: Props) => {
  return (
    <div>
      <p className={cx('text')}>개인정보</p>
      <div className={cx('line')}></div>
      <div className={cx('container')}>
        <div className={cx('content-wrapper')}>
          <div className={cx('left-wrapper')}>
            <div className={cx('avatar-wrapper')}>
              <Avatar size="extra-large" />
              <CameraIcon className={cx('camera-icon')} onClick={onClick} />
            </div>
            {isProfileImageDelete && <Button onClick={onClick}>프로필사진 삭제</Button>}
          </div>

          <div className={cx('right-wrapper')}>
            <div className={cx('full-row')}>
              <p className={cx('name')}>이름</p>
              <Input className={cx('input')} />
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('name')}>닉네임</p>
                <Input className={cx('input')} />
              </div>
              <div>
                <p className={cx('name')}>이메일</p>
                <Input className={cx('input')} />
              </div>
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('name')}>휴대전화</p>
                <Input className={cx('input')} />
              </div>
              <div>
                <p className={cx('name')}>생년월일</p>
                <Input className={cx('input')} />
              </div>
            </div>

            <div className={cx('password-row')}>
              <div>
                <p className={cx('name')}>비밀번호</p>
                <Input className={cx('input')} />
              </div>
              <div>
                <p className={cx('name')}>비밀번호 확인</p>
                <Input className={cx('input')} />
              </div>
            </div>

            <p className={cx('note')}>* 비밀번호는 문자, 숫자 포함 6~20자로 구성되어야 합니다.</p>
          </div>
        </div>

        <div className={cx('button-wrapper')}>
          <Button className={cx('left-button')} onClick={onClick}>
            취소
          </Button>
          <Button variant="filled" onClick={onClick}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  )
}
