'use client'

import classNames from 'classnames/bind'

import Step from '../_ui/step'
import UserTypeCard from '../_ui/user-type-card'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const UserTypePage = () => {
  return (
    <>
      <Step />
      <section className={cx('card-container')}>
        <h2 className="visually-hidden">회원 유형 선택</h2>
        <UserTypeCard userType="INVESTOR" title="투자자" highlight="다양한 투자 전략을 구독" />
        <UserTypeCard userType="TRADER" title="트레이더" highlight="나만의 투자 전략을 공유" />
      </section>
    </>
  )
}

export default UserTypePage
