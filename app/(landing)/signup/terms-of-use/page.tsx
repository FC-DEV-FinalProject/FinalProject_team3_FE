'use client'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { Button } from '@/shared/ui/button'
import Checkbox from '@/shared/ui/check-box'
import { LinkButton } from '@/shared/ui/link-button'
import InvestorTerms from '@/shared/ui/terms/investor-terms'
import PrivacyTerms from '@/shared/ui/terms/privacy-terms'
import TraderTerms from '@/shared/ui/terms/trader-terms'

import { getUserTypeCookie } from '../_lib/cookies'
import Step from '../_ui/step'
import { useTermsCheck } from './_hooks/use-terms-check'
import TermsContainer from './_ui/terms-container'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const TermsOfUsePage = () => {
  const userType = getUserTypeCookie()
  const {
    isAllChecked,
    isUserTermChecked,
    isPrivacyTermChecked,
    handleAllCheck,
    handleUserTermCheck,
    handlePrivacyTermCheck,
    handleNextClick,
  } = useTermsCheck()

  return (
    <>
      <Step />
      <div className={cx('container')}>
        <div className={cx('all-check-wrapper')}>
          <Checkbox
            label=" 이용약관, 개인정보 취급방침에 모두 동의합니다."
            isChecked={isAllChecked}
            onChange={handleAllCheck}
            textColor="gray800"
            textSize="b2"
          />
        </div>

        <TermsContainer
          title="이용약관"
          isChecked={isPrivacyTermChecked}
          onChange={handlePrivacyTermCheck}
        >
          <PrivacyTerms />
        </TermsContainer>
        <TermsContainer
          title="개인정보 취급방침"
          isChecked={isUserTermChecked}
          onChange={handleUserTermCheck}
        >
          {userType === 'TRADER' ? <TraderTerms /> : <InvestorTerms />}
        </TermsContainer>

        <div className={cx('button-wrapper')}>
          <LinkButton href={PATH.SIGN_UP_USER_TYPE}>이전</LinkButton>
          <Button onClick={handleNextClick} variant="filled" disabled={!isAllChecked}>
            다음
          </Button>
        </div>
      </div>
    </>
  )
}

export default TermsOfUsePage
