'use client'

import { ImageLogo, TextLogo } from '@/public/images'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const FooterLogo = () => {
  return (
    <div className={cx('logo-container')}>
      <ImageLogo width={100} />
      <TextLogo width={177} className={cx('text')} />
    </div>
  )
}

export default FooterLogo
