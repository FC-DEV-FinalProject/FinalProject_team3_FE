import { useState } from 'react'

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
  onClick?: () => void
}

export const UserInfo = ({ onClick }: Props) => {
  const [isEditable, setIsEditable] = useState(false)

  const handleUserInfoEdit = () => {
    setIsEditable(true)
  }

  const handleUserInfoView = () => {
    setIsEditable(false)
  }
  return (
    <div>
      <p className={cx('text')}>개인 정보</p>
      <div className={cx('line')}></div>
      <div className={cx('container')}>
        <div className={cx('content-wrapper')}>
          <div className={cx('left-wrapper')}>
            <div className={cx('avatar-wrapper')}>
              <Avatar size="extra-large" />
              {isEditable && <CameraIcon className={cx('camera-icon')} onClick={onClick} />}
            </div>
            {isEditable && <Button onClick={onClick}>프로필 사진 삭제</Button>}
          </div>

          <div className={cx('right-wrapper')}>
            {!isEditable && (
              <Button variant="filled" onClick={handleUserInfoEdit} className={cx('edit-button')}>
                개인 정보 수정
              </Button>
            )}
            <div className={cx('first-row')}>
              <p className={cx('title')}>이름</p>
              <Input inputSize="compact" className={cx('input')} disabled={true} />
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>이메일</p>
                <Input inputSize="compact" className={cx('input')} disabled={true} />
              </div>
              <div>
                <p className={cx('title')}>휴대전화</p>
                <div className={cx('position')}>
                  <Input inputSize="compact" className={cx('input')} disabled={!isEditable} />
                  {isEditable && <Button onClick={onClick}>확인</Button>}
                </div>
              </div>
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>생년월일</p>
                <Input inputSize="compact" className={cx('input')} disabled={true} />
              </div>
              <div>
                <p className={cx('title')}>닉네임</p>
                <div className={cx('position')}>
                  <Input inputSize="compact" className={cx('input')} disabled={!isEditable} />
                  {isEditable && <Button onClick={onClick}>확인</Button>}
                </div>
              </div>
            </div>

            {isEditable && (
              <div className={cx('password-row')}>
                <div>
                  <p className={cx('title')}>비밀번호</p>
                  <Input inputSize="compact" className={cx('input')} />
                </div>
                <div>
                  <p className={cx('title')}>비밀번호 확인</p>
                  <div className={cx('position')}>
                    <Input inputSize="compact" className={cx('input')} />
                    <Button onClick={onClick}>변경</Button>
                  </div>
                </div>
              </div>
            )}
            {isEditable && (
              <div>
                <ErrorMessage />
                <p className={cx('notification')}>
                  * 비밀번호는 문자, 숫자 포함 6~20자로 구성되어야 합니다.
                </p>{' '}
              </div>
            )}
          </div>
        </div>

        {isEditable && (
          <div className={cx('button-wrapper')}>
            <Button className={cx('left-button')} onClick={handleUserInfoView}>
              취소
            </Button>
            <Button variant="filled" onClick={onClick}>
              저장하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
