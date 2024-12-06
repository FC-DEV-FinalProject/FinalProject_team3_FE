'use client'

import Logo from '@/public/images/logo.svg'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { LinkButton } from '@/shared/ui/link-button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const HeroSection = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <section className={cx('section')}>
      <h1 className={cx('title')}>
        성공적인 투자 전략을
        <br />
        참고하거나 공유하고 싶다면
        <br />
        <Logo className={cx('logo')} /> 인베스트메틱에서!
      </h1>
      {!user?.userId && (
        <LinkButton href={PATH.SIGN_UP_USER_TYPE} variant="filled" className={cx('button')}>
          바로 함께하기
        </LinkButton>
      )}
    </section>
  )
}

export default HeroSection
