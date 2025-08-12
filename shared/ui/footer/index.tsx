import Link from 'next/link'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'

import FooterLogo from './footer-logo'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const Footer = () => {
  return (
    <footer className={cx('footer-container')}>
      <div className={cx('footer-wrapper')}>
        <FooterLogo />
        <div className={cx('info-wrapper')}>
          <div className={cx('info')}>
            <strong>(주) 시스메틱</strong>
            <ul className={cx('contents')}>
              <li>대표이사: 박혜정</li>
              <li>사업자 등록 번호 ㅣ 711-86-00050</li>
              <li>통신판매업신고 ㅣ 제2020-서울 영등포-2864호</li>
              <li>특허출원번호 ㅣ 10-2016-00262203</li>
            </ul>
          </div>
          <div className={cx('info')}>
            <strong>CONTACT</strong>
            <ul className={cx('contents')}>
              <li>서울시 영등포구 당산로41길 11, E동 1202호</li>
              <li>ceo@sysmetic.co.kr</li>
              <li>+82-2-6338-1880</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('copyright-container')}>
        <div className={cx('copyright-wrapper')}>
          <p className={cx('copyright')}>Copyright 2024 Investmetic Co. All Rights Reserved.</p>

          <ul className={cx('links')}>
            <li>
              <Link href={PATH.TERMS_OF_USE}>이용약관</Link>
            </li>
            <li>
              <Link href={PATH.PRIVACY_TERMS}>개인정보 취급방침</Link>
            </li>
            <li>
              <Link href={PATH.NOTICES}>공지사항</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
