'use client'

import { ChangeEvent } from 'react'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { Button } from '@/shared/ui/button'
import Checkbox from '@/shared/ui/check-box'
import { ErrorMessage } from '@/shared/ui/error-message'
import { Input } from '@/shared/ui/input'
import { LinkButton } from '@/shared/ui/link-button'
import Modal from '@/shared/ui/modal'
import Select from '@/shared/ui/select'

import useSignupEmail from '../_hooks/custom/use-signup-email'
import useSignupForm from '../_hooks/custom/use-signup-form'
import Step from '../_ui/step'
import styles from './page.module.scss'
import { generateDayOptions, generateMonthOptions, generateYearOptions } from './utils'

const cx = classNames.bind(styles)

const emailDomainOptions = [
  { value: '', label: '직접 입력' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'daum.net', label: 'daum.net' },
]

const yearOptions = generateYearOptions()
const monthOptions = generateMonthOptions()
const dayOptions = generateDayOptions()

const selectStyle = {
  backgroundColor: 'transparent',
  height: '48px',
}

const InformationPage = () => {
  const {
    form,
    setForm,
    errors,
    setErrors,
    formState,
    setFormState,
    isValidated,
    handleInputChange,
    handleBirthdayChange,
    handleMarketingAgree,
    handleFormSubmit,
    handleNicknameCheck,
    handlePhoneCheck,
    isModalOpen,
    setIsModalOpen,
  } = useSignupForm()

  const {
    selectedDomain,
    handleEmailChange,
    handleDomainSelect,
    handleEmailVerification,
    handleVerificationCodeCheck,
  } = useSignupEmail({
    errors,
    isValidated,
    setForm,
    setErrors,
    setFormState,
    form,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    handleInputChange(e)

    if (name === 'email' || name === 'emailDomain') {
      handleEmailChange(name)
    }
  }

  return (
    <>
      <Step />

      <form className={cx('form-container')}>
        <div className={cx('input-group')}>
          <label htmlFor="name">이름</label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
            className={cx('input')}
            errorMessage={errors.name}
          />
        </div>

        <div className={cx('input-group')}>
          <label htmlFor="nickname">닉네임</label>
          <div>
            <div className={cx('wrapper')}>
              <Input
                id="nickname"
                name="nickname"
                value={form.nickname}
                onChange={handleInputChange}
                placeholder="닉네임을 입력하세요"
                className={cx('input')}
                errorMessage={errors.nickname}
              />
              <Button onClick={handleNicknameCheck} type="button" className={cx('button')}>
                중복확인
              </Button>
            </div>
            {formState.isNicknameVerified && (
              <small className={cx('nickname-verified')}>사용할 수 있는 닉네임입니다.</small>
            )}
            <small>* 사이트 이용 시 사용할 닉네임을 입력해주세요.</small>
          </div>
        </div>

        <div className={cx('input-group')}>
          <label>이메일 인증</label>
          <div>
            <div>
              <div className={cx('wrapper')}>
                <Input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  className={cx('input')}
                  errorMessage={errors.email}
                />
                <span className={cx('symbol')}>@</span>
                <Input
                  id="emailDomain"
                  name="emailDomain"
                  value={form.emailDomain}
                  onChange={handleChange}
                  inputSize="small"
                  className={cx('input')}
                  disabled={selectedDomain !== ''}
                />
                <Select
                  options={emailDomainOptions}
                  isMultiple={false}
                  value={selectedDomain}
                  size="large"
                  onChange={(value) => handleDomainSelect(String(value))}
                  titleStyle={selectStyle}
                />
                <Button
                  onClick={handleEmailVerification}
                  type="button"
                  variant="filled"
                  className={cx('button')}
                >
                  인증
                </Button>
              </div>
              <small>* 사이트 이용 시 아이디로 사용됩니다.</small>
            </div>
            {formState.isEmailSent && (
              <>
                <div className={cx('wrapper', 'verification')}>
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    value={form.verificationCode}
                    onChange={handleInputChange}
                    placeholder="인증번호"
                    className={cx('input')}
                    errorMessage={errors.emailConfirm}
                  />
                  <Button
                    onClick={handleVerificationCodeCheck}
                    type="button"
                    className={cx('button')}
                  >
                    인증번호 확인
                  </Button>
                </div>
                {formState.isEmailVerified && (
                  <small className={cx('nickname-verified')}>이메일 인증에 성공했습니다.</small>
                )}
              </>
            )}
          </div>
        </div>

        <div className={cx('input-group')}>
          <label htmlFor="password">비밀번호</label>
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              className={cx('input')}
              errorMessage={errors.password}
            />
            <small>* 비밀번호는 문자, 숫자 포함 6~20자로 구성되어야 합니다.</small>
          </div>
        </div>

        <div className={cx('input-group')}>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleInputChange}
            placeholder="한 번 더 입력하세요"
            className={cx('input')}
            errorMessage={errors.passwordConfirm}
          />
        </div>

        <div className={cx('input-group')}>
          <label htmlFor="phone">휴대전화</label>
          <div>
            <div className={cx('wrapper')}>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="번호를 입력하세요."
                className={cx('input')}
                errorMessage={errors.phone}
              />
              <Button onClick={handlePhoneCheck} type="button" className={cx('button')}>
                중복확인
              </Button>
            </div>
            {formState.isPhoneVerified && (
              <small className={cx('nickname-verified')}>사용할 수 있는 휴대전화 번호입니다.</small>
            )}
            <small>* (-) 없이 숫자만 입력해주세요.</small>
          </div>
        </div>

        <div className={cx('select-group')}>
          <label htmlFor="birthday">생년월일</label>
          <div className={cx('select-wrapper')}>
            <Select
              options={yearOptions}
              value={form.birthYear}
              onChange={(value) => handleBirthdayChange(String(value), 'birthYear')}
              size="small"
              placeholder="년"
              titleStyle={selectStyle}
            />
            <Select
              options={monthOptions}
              value={form.birthMonth}
              onChange={(value) => handleBirthdayChange(String(value), 'birthMonth')}
              size="small"
              placeholder="월"
              titleStyle={selectStyle}
            />
            <Select
              options={dayOptions}
              value={form.birthDay}
              onChange={(value) => handleBirthdayChange(String(value), 'birthDay')}
              size="small"
              placeholder="일"
              titleStyle={selectStyle}
            />
          </div>
          {errors.select && (
            <div className={cx('select-error')}>
              <ErrorMessage errorMessage={errors.select} />
            </div>
          )}
        </div>

        <div className={cx('terms-wrapper')}>
          <label>정보수신동의</label>
          <div className={cx('checkbox-wrapper')}>
            <Checkbox
              label="정보성 마케팅 정보 알림에 수신 동의합니다."
              isChecked={form.isMarketingAgreed}
              onChange={handleMarketingAgree}
              textColor="gray800"
              textSize="b2"
            />
          </div>
        </div>
      </form>

      <div className={cx('button-wrapper')}>
        <LinkButton href={PATH.SIGN_UP_TERMS_OF_USE}>이전</LinkButton>
        <Button variant="filled" onClick={handleFormSubmit}>
          다음
        </Button>
      </div>
      <Modal message="회원가입에 실패했습니다." icon={ModalAlertIcon} isOpen={isModalOpen}>
        <Button onClick={() => setIsModalOpen(false)}>닫기</Button>
      </Modal>
    </>
  )
}

export default InformationPage
