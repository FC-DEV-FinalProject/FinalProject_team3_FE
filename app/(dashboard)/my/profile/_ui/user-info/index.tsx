'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { CameraIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import Avatar from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import Input from '@/shared/ui/input'
import { LinkButton } from '@/shared/ui/link-button'

import { ProfileModel } from '../../../_api/get-profile'
import usePatchUserProfile from '../../../_hooks/query/use-patch-user-profile'
import { useProfileForm } from '../../_hooks/custom/use-profile-form'
import { useProfileImage } from '../../_hooks/custom/use-profile-image'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isEditable?: boolean
  profile: ProfileModel
}

const UserInfo = ({ profile, isEditable = false }: Props) => {
  const router = useRouter()
  const updateProfile = usePatchUserProfile()

  const {
    form,
    errors,
    successMessages,
    hasNicknameChanged,
    hasPhoneChanged,
    handleInputChange,
    handleNicknameCheck,
    handlePhoneCheck,
    handlePasswordCheck,
    validateChangedFields,
    isFormValid,
    getUpdatedFields,
  } = useProfileForm(profile)

  const {
    selectedImage,
    previewUrl,
    imageError,
    isImageVerified,
    handleImageChange,
    handleImageDelete,
  } = useProfileImage()

  const handleBack = () => {
    router.back()
  }

  const handleFormSubmit = async () => {
    if (!validateChangedFields()) return

    try {
      const updatedFields = getUpdatedFields()
      const updateData = {
        ...updatedFields,
        imageChange: selectedImage !== null,
      }

      await updateProfile.mutateAsync(
        {
          profileData: updateData,
          imageFile: selectedImage,
        },
        {
          onSuccess: () => {
            router.push(PATH.PROFILE)
          },
        }
      )
    } catch (err) {
      console.error('프로필 업데이트 실패:', err)
    }
  }

  if (!profile) return null

  const displayImageUrl = previewUrl || profile.imageUrl || ''
  const shouldShowImage = Boolean(previewUrl || profile.imageUrl)

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>개인 정보</p>
      <div className={cx('line')}></div>
      <div className={cx('content')}>
        <div className={cx('content-wrapper')}>
          <div className={cx('left-wrapper')}>
            <div className={cx('avatar-wrapper', { isEditable })}>
              {shouldShowImage ? (
                <div className={cx('image-container')}>
                  <Image
                    src={displayImageUrl}
                    alt="Profile"
                    width={200}
                    height={200}
                    className={cx('avatar-preview')}
                    unoptimized
                  />
                </div>
              ) : (
                <Avatar size="xxlarge" />
              )}
              {isEditable && (
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
                      style={{ cursor: updateProfile.isPending ? 'wait' : 'pointer' }}
                    />
                  </label>
                </div>
              )}
            </div>
            {isEditable && selectedImage && (
              <Button onClick={handleImageDelete}>프로필 사진 삭제</Button>
            )}
            {imageError && <p className={cx('error-message')}>{imageError}</p>}
          </div>

          <div className={cx('right-wrapper')}>
            {!isEditable && (
              <LinkButton variant="filled" className={cx('edit-button')} href={PATH.EDIT_PROFILE}>
                개인 정보 수정
              </LinkButton>
            )}

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>이름</p>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  inputSize="compact"
                  className={cx('input')}
                  isWhiteDisabled={!isEditable}
                  disabled={true}
                />
              </div>
              <div>
                <p className={cx('title')}>가입일자</p>
                <Input
                  id="joinDate"
                  name="joinDate"
                  value={form.joinDate}
                  inputSize="compact"
                  className={cx('input')}
                  isWhiteDisabled={!isEditable}
                  disabled={true}
                />
              </div>
            </div>

            <div className={cx('row')}>
              <div>
                <p className={cx('title')}>이메일</p>
                <Input
                  inputSize="compact"
                  value={form.email}
                  className={cx('input')}
                  isWhiteDisabled={!isEditable}
                  disabled={true}
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
                    />
                    {isEditable && (
                      <Button onClick={handlePhoneCheck} disabled={!hasPhoneChanged || !form.phone}>
                        확인
                      </Button>
                    )}
                  </div>
                  {errors.phone && <p className={cx('error-message')}>{errors.phone}</p>}
                  {successMessages.phone && (
                    <p className={cx('success-message')}>{successMessages.phone}</p>
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
                  disabled={true}
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
                    />
                    {isEditable && (
                      <Button
                        onClick={handleNicknameCheck}
                        disabled={!hasNicknameChanged || !form.nickname}
                      >
                        확인
                      </Button>
                    )}
                  </div>
                  {errors.nickname && <p className={cx('error-message')}>{errors.nickname}</p>}
                  {successMessages.nickname && (
                    <p className={cx('success-message')}>{successMessages.nickname}</p>
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
                  />
                </div>
                <div>
                  <p className={cx('title')}>비밀번호 확인</p>
                  <div className={cx('position-wrapper')}>
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
                    <Button
                      onClick={handlePasswordCheck}
                      disabled={!form.password && !form.passwordConfirm}
                    >
                      확인
                    </Button>
                  </div>
                  {errors.password && <p className={cx('error-message')}>{errors.password}</p>}
                  {successMessages.password && (
                    <p className={cx('success-message')}>{successMessages.password}</p>
                  )}
                </div>
              </div>
            )}
            {isEditable && (
              <div>
                <p className={cx('notification')}>
                  * 비밀번호는 영문과 숫자를 포함하여 6~20자로 구성되어야 합니다.
                </p>
              </div>
            )}
          </div>
        </div>
        {isEditable && (
          <div className={cx('button-wrapper')}>
            <Button
              className={cx('left-button')}
              onClick={handleBack}
              disabled={updateProfile.isPending}
            >
              뒤로가기
            </Button>
            <Button
              className={cx('right-button')}
              variant="filled"
              onClick={handleFormSubmit}
              disabled={updateProfile.isPending || !isFormValid(isImageVerified)}
            >
              {updateProfile.isPending ? '저장 중...' : '저장하기'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
