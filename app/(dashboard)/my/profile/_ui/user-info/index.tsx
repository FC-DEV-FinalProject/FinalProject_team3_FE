'use client'

import { useRouter } from 'next/navigation'

import { CameraIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import Avatar from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkButton } from '@/shared/ui/link-button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isEditable?: boolean
}

const UserInfo = ({ isEditable = false }: Props) => {
  const router = useRouter()
  const handleChange = () => {}
  const handleDelete = () => {}
  const handleNicknameConfirm = () => {}
  const handlePhoneConfirm = () => {}
  const handleBack = () => {
    router.back()
  }
  const handleSave = () => {}
  return (
    <div className={cx('container')}>
      <p className={cx('text')}>개인 정보</p>
      <div className={cx('line')}></div>

      <div className={cx('content')}>
        <div className={cx('content-wrapper')}>
          <div className={cx('left-wrapper')}>
            <div className={cx('avatar-wrapper')}>
              <Avatar size="xxlarge" />
              <div className={cx('camera-wrapper')}>
                <CameraIcon className={cx('camera-icon')} onClick={handleChange} />
              </div>
            </div>
            {isEditable && <Button onClick={handleDelete}>프로필 사진 삭제</Button>}
          </div>

          <div className={cx('right-wrapper')}>
            {!isEditable && (
              <LinkButton variant="filled" className={cx('edit-button')} href={PATH.EDIT_PROFILE}>
                개인 정보 수정
              </LinkButton>
            )}
            <div className={cx('first-row')}>
              <p className={cx('title')}>이름</p>
              <Input
                id="name"
                name="name"
                value={'고양이'}
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
                  value={'hello@example.com'}
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
                    value={'01012345678'}
                    onChange={() => {}}
                    className={cx('input')}
                    inputSize="compact"
                    isWhiteDisabled={!isEditable ? true : undefined}
                  />

                  {isEditable && <Button onClick={handlePhoneConfirm}>확인</Button>}
                </div>
              </div>
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>생년월일</p>
                <Input
                  inputSize="compact"
                  value={'2004.05.04'}
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
                    value={'고양이귀여워'}
                    onChange={() => {}}
                    className={cx('input')}
                    isWhiteDisabled={!isEditable ? true : undefined}
                  />

                  {isEditable && <Button onClick={handleNicknameConfirm}>확인</Button>}
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
            <Button className={cx('left-button')} onClick={handleBack}>
              뒤로가기
            </Button>
            <Button className={cx('right-button')} variant="filled" onClick={handleSave}>
              저장하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default UserInfo
