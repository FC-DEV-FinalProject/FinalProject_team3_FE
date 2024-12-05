'use client'

import { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { SIGNUP_ERROR_MESSAGES } from '@/app/(landing)/signup/_constants/signup'
import { CameraIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { checkNicknameDuplicate, checkPhoneDuplicate } from '@/shared/api/check-duplicate'
import { PATH } from '@/shared/constants/path'
import Avatar from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkButton } from '@/shared/ui/link-button'

import { ProfileModel } from '../../../_api/get-profile'
import styles from './styles.module.scss'
import { ProfileFormErrorsModel, ProfileFormModel, ProfileFormStateModel } from './types'
import { validateProfileForm } from './utils'

const cx = classNames.bind(styles)

const initialFormState = {
  isNicknameVerified: false,
  isPhoneVerified: false,
}

interface Props {
  isEditable?: boolean
  profile: ProfileModel
}

const UserInfo = ({ profile, isEditable = false }: Props) => {
  const router = useRouter()

  const initialForm: ProfileFormModel = {
    name: profile?.userName || '',
    nickname: profile?.nickname || '',
    email: profile?.email || '',
    password: '',
    passwordConfirm: '',
    phone: profile?.phone || '',
    birthDate: profile?.birthDate || '',
  }

  const [form, setForm] = useState<ProfileFormModel>(initialForm)
  const [formState, setFormState] = useState<ProfileFormStateModel>(initialFormState)
  const [errors, setErrors] = useState<ProfileFormErrorsModel>({})
  const [isValidated, setIsValidated] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (isValidated) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }

    if (name === 'nickname') {
      setFormState((prev) => ({ ...prev, isNicknameVerified: false }))
      setErrors((prev) => ({ ...prev, nickname: null }))
    }
    if (name === 'phone') {
      setFormState((prev) => ({ ...prev, isPhoneVerified: false }))
      setErrors((prev) => ({ ...prev, phone: null }))
    }
  }

  const handleNicknameCheck = async () => {
    setFormState((prev) => ({ ...prev, isNicknameVerified: false }))

    try {
      const response = await checkNicknameDuplicate(form.nickname)
      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isNicknameVerified: true }))
        if (errors.nickname) {
          setErrors((prev) => ({ ...prev, nickname: null }))
        }
      } else {
        setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_DUPLICATED }))
      }
    } catch (err) {
      console.error('닉네임 중복 확인 실패:', err)
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_CHECK_FAILED }))
    }
  }
  const handlePhoneCheck = async () => {
    try {
      const response = await checkPhoneDuplicate(form.phone)

      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isPhoneVerified: true }))
        if (errors.phone) {
          setErrors((prev) => ({ ...prev, phone: null }))
        }
      } else {
        setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_DUPLICATED }))
      }
    } catch (err) {
      console.error('휴대폰 번호 중복 확인 실패:', err)
      setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_CHECK_FAILED }))
    }
  }

  const handleImageChange = () => {}
  const handleImageDelete = () => {}
  const handleBack = () => {
    router.back()
  }

  const handleFormSubmit = async () => {
    const formErrors = validateProfileForm(
      form,
      formState.isNicknameVerified,
      formState.isPhoneVerified
    )
    setIsValidated(true)

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
  }

  if (!profile) {
    return null
  }

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>개인 정보</p>
      <div className={cx('line')}></div>

      <div className={cx('content')}>
        <div className={cx('content-wrapper')}>
          <div className={cx('left-wrapper')}>
            <div className={cx('avatar-wrapper')}>
              <Avatar size="xxlarge" />
              <div className={cx('camera-wrapper')}>
                <CameraIcon className={cx('camera-icon')} onClick={handleImageChange} />
              </div>
            </div>
            {isEditable && <Button onClick={handleImageDelete}>프로필 사진 삭제</Button>}
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
                value={form.name}
                inputSize="compact"
                className={cx('input')}
                isWhiteDisabled={!isEditable}
                disabled={isEditable}
              />
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>이메일</p>
                <Input
                  inputSize="compact"
                  value={form.email}
                  className={cx('input')}
                  isWhiteDisabled={!isEditable}
                  disabled={isEditable}
                />
              </div>
              <div>
                <p className={cx('title')}>휴대전화</p>
                <div className={cx('position')}>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className={cx('input')}
                    inputSize="compact"
                    isWhiteDisabled={!isEditable}
                  />

                  {isEditable && <Button onClick={handlePhoneCheck}>확인</Button>}
                </div>
              </div>
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>생년월일</p>
                <Input
                  inputSize="compact"
                  value={form.birthDate}
                  className={cx('input')}
                  isWhiteDisabled={!isEditable}
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
                    value={form.nickname}
                    onChange={handleInputChange}
                    className={cx('input')}
                    isWhiteDisabled={!isEditable}
                  />

                  {isEditable && <Button onClick={handleNicknameCheck}>확인</Button>}
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
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 입력하세요"
                    className={cx('input')}
                    errorMessage={errors.password}
                  />
                </div>
                <div>
                  <p className={cx('title')}>비밀번호 확인</p>

                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    value={form.passwordConfirm}
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
            <Button className={cx('left-button')} onClick={handleBack}>
              뒤로가기
            </Button>
            <Button className={cx('right-button')} variant="filled" onClick={handleFormSubmit}>
              저장하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
