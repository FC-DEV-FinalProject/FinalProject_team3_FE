'use client'

import Logo from '@/public/images/logo.svg'
import classNames from 'classnames/bind'

import { UserType } from '@/shared/types/auth'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COMPLETE_MESSAGE = {
  INVESTOR: '다양한 투자 전략들을 찾아보세요!',
  TRADER: '나만의 투자 전략들을 공유해보세요!',
}

interface Props {
  nickname: string
  userType: UserType
}

const SignupCompleteMessage = ({ nickname, userType }: Props) => {
  return (
    <section className={cx('container')}>
      <p>{nickname}님의 회원가입이 완료되었습니다.</p>
      <p>
        지금 바로 인베스트메틱
        <Logo width={42} />
        에서 <br />
        {COMPLETE_MESSAGE[userType]}
      </p>
    </section>
  )
}

export default SignupCompleteMessage
