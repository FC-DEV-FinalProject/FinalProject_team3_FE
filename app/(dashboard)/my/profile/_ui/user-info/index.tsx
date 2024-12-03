'use client'

import { ChangeEvent, useState } from 'react'

import { CameraIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Avatar from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  onClick?: () => void
}

export const UserInfo = ({ onClick }: Props) => {
  const [isEditable, setIsEditable] = useState(false)
  const [value, setValue] = useState('')

  const handleUserInfoEdit = () => {
    setIsEditable(true)
  }

  const handleUserInfoView = () => {
    setIsEditable(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={cx('container')}>
      <p className={cx('text')}>개인 정보</p>
      <div className={cx('line')}></div>

      <div className={cx('content')}>
        <div className={cx('content-wrapper')}>
          <div className={cx('left-wrapper')}>
            <div className={cx('avatar-wrapper')}>
              <Avatar size="xxlarge" />
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
              <Input
                id="name"
                name="name"
                value={value}
                inputSize="compact"
                className={cx('input')}
                isWhiteDisabled={!isEditable ? true : undefined}
                disabled={isEditable}
              />
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>이메일</p>
                <Input
                  inputSize="compact"
                  value={value}
                  className={cx('input')}
                  isWhiteDisabled={!isEditable ? true : undefined}
                  disabled={isEditable}
                />
              </div>
              <div>
                <p className={cx('title')}>휴대전화</p>
                <div className={cx('position')}>
                  <Input
                    id="phone"
                    name="phone"
                    value={value}
                    onChange={handleInputChange}
                    className={cx('input')}
                    inputSize="compact"
                    isWhiteDisabled={!isEditable ? true : undefined}
                  />

                  {isEditable && <Button onClick={onClick}>확인</Button>}
                </div>
              </div>
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>생년월일</p>
                <Input
                  inputSize="compact"
                  value={value}
                  className={cx('input')}
                  isWhiteDisabled={!isEditable ? true : undefined}
                  disabled={isEditable}
                />
              </div>
              <div>
                <p className={cx('title')}>닉네임</p>
                <div className={cx('position')}>
                  <Input
                    id="nickname"
                    name="nickname"
                    inputSize="compact"
                    value={value}
                    onChange={handleInputChange}
                    className={cx('input')}
                    isWhiteDisabled={!isEditable ? true : undefined}
                  />

                  {isEditable && <Button onClick={onClick}>확인</Button>}
                </div>
              </div>
            </div>

            {isEditable && (
              <div className={cx('password-row')}>
                <div>
                  <p className={cx('title')}>비밀번호</p>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    inputSize="compact"
                    value={value}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 입력하세요"
                    className={cx('input')}
                    errorMessage={''}
                  />
                </div>
                <div>
                  <p className={cx('title')}>비밀번호 확인</p>

                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    value={value}
                    onChange={handleInputChange}
                    placeholder="한 번 더 입력하세요"
                    className={cx('input')}
                    inputSize="compact"
                  />
                </div>
              </div>
            )}
            {isEditable && (
              <div>
                <p className={cx('notification')}>
                  * 비밀번호는 문자, 숫자 포함 6~20자로 구성되어야 합니다.
                </p>
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
