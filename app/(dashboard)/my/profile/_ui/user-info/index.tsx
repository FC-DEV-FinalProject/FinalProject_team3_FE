'use client'

import { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { SIGNUP_ERROR_MESSAGES } from '@/app/(landing)/signup/_constants/signup'
import { CameraIcon } from '@/public/icons'
import axios from 'axios'
import classNames from 'classnames/bind'

import axiosInstance from '@/shared/api/axios'
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

const uploadImageToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  try {
    await axiosInstance.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
  } catch (error) {
    console.error('이미지 업로드 실패:', error)
    throw new Error('이미지 업로드에 실패했습니다')
  }
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
  const [isNicknameModified, setIsNicknameModified] = useState(false)
  const [isPhoneModified, setIsPhoneModified] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

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
      setIsNicknameModified(true)
      setErrors((prev) => ({ ...prev, nickname: null }))
    }
    if (name === 'phone') {
      setIsPhoneModified(true)
      setErrors((prev) => ({ ...prev, phone: null }))
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드가 가능합니다.')
      return
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setSelectedImage(file)
  }

  const handleNicknameCheck = async () => {
    try {
      const response = await checkNicknameDuplicate(form.nickname)
      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isNicknameVerified: true }))
        setIsNicknameModified(false)
        if (errors.nickname) {
          setErrors((prev) => ({ ...prev, nickname: null }))
        }
      } else {
        setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_DUPLICATED }))
        setFormState((prev) => ({ ...prev, isNicknameVerified: false }))
      }
    } catch (err) {
      console.error('닉네임 중복 확인 실패:', err)
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_CHECK_FAILED }))
      setFormState((prev) => ({ ...prev, isNicknameVerified: false }))
    }
  }

  const handlePhoneCheck = async () => {
    try {
      const response = await checkPhoneDuplicate(form.phone)
      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isPhoneVerified: true }))
        setIsPhoneModified(false)
        if (errors.phone) {
          setErrors((prev) => ({ ...prev, phone: null }))
        }
      } else {
        setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_DUPLICATED }))
        setFormState((prev) => ({ ...prev, isPhoneVerified: false }))
      }
    } catch (err) {
      console.error('휴대폰 번호 중복 확인 실패:', err)
      setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_CHECK_FAILED }))
      setFormState((prev) => ({ ...prev, isPhoneVerified: false }))
    }
  }

  const handleImageDelete = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
  }

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

    try {
      setIsUploading(true)

      const updateData = {
        nickName: form.nickname,
        phoneNum: form.phone,
        password: form.password || null,
        email: form.email,
        imageChange: selectedImage !== null,
        profileImage: selectedImage
          ? {
              imageName: selectedImage.name,
              size: selectedImage.size,
            }
          : null,
      }

      console.log('요청 데이터:', updateData)

      const response = await axiosInstance.patch('/api/users/mypage/profile', updateData)

      if (!response.data.isSuccess) {
        throw new Error(response.data.message)
      }

      if (selectedImage && response.data.data?.presignedUrl) {
        await uploadImageToS3(response.data.data.presignedUrl, selectedImage)
      }

      alert('프로필이 성공적으로 업데이트되었습니다.')
      router.push(PATH.PROFILE)
    } catch (error) {
      console.error('프로필 업데이트 실패:', error)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || '프로필 업데이트에 실패했습니다.'
        alert(errorMessage)
      } else {
        alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsUploading(false)
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
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className={cx('avatar-preview')} />
              ) : (
                <Avatar size="xxlarge" />
              )}
              <div className={cx('camera-wrapper')}>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profile-image">
                  <CameraIcon
                    className={cx('camera-icon')}
                    style={{ cursor: isUploading ? 'wait' : 'pointer' }}
                  />
                </label>
              </div>
            </div>
            {isEditable && selectedImage && (
              <Button onClick={handleImageDelete}>프로필 사진 삭제</Button>
            )}
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
                  <div className={cx('position-wrapper')}>
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      className={cx('input')}
                      inputSize="compact"
                      isWhiteDisabled={!isEditable}
                      errorMessage={errors.phone}
                    />
                    {isEditable && <Button onClick={handlePhoneCheck}>확인</Button>}
                  </div>
                  {formState.isPhoneVerified && !isPhoneModified && (
                    <p className={cx('verified-message')}>사용할 수 있는 휴대폰 번호입니다.</p>
                  )}
                  {isPhoneModified && (
                    <p className={cx('modified-message')}>
                      휴대폰 번호가 수정되었습니다. 다시 확인해 주세요.
                    </p>
                  )}
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
                  <div className={cx('position-wrapper')}>
                    <Input
                      id="nickname"
                      name="nickname"
                      inputSize="compact"
                      value={form.nickname}
                      onChange={handleInputChange}
                      className={cx('input')}
                      isWhiteDisabled={!isEditable}
                      errorMessage={errors.nickname}
                    />
                    {isEditable && <Button onClick={handleNicknameCheck}>확인</Button>}
                  </div>
                  {formState.isNicknameVerified && !isNicknameModified && (
                    <p className={cx('verified-message')}>사용할 수 있는 닉네임입니다.</p>
                  )}
                  {isNicknameModified && (
                    <p className={cx('modified-message')}>
                      닉네임이 수정되었습니다. 다시 중복확인해 주세요.
                    </p>
                  )}
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
            <Button className={cx('left-button')} onClick={handleBack} disabled={isUploading}>
              뒤로가기
            </Button>
            <Button
              className={cx('right-button')}
              variant="filled"
              onClick={handleFormSubmit}
              disabled={isUploading}
            >
              {isUploading ? '저장 중...' : '저장하기'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
