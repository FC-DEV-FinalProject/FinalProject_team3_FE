'use client'

import { PageNotFoundImg } from '@/public/images'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'

import { LinkButton } from '../link-button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export const PageNotFound = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('text-wrapper')}>
        <p className={cx('number')}>404</p>
        <p className={cx('text')}>페이지를 찾을 수 없습니다.</p>
        <div className={cx('button-wrapper')}>
          <LinkButton href={PATH.HOME} size="medium" variant="filled">
            홈으로 돌아가기
          </LinkButton>
        </div>
      </div>
      <div className={cx('img-wrapper')}>
        <PageNotFoundImg />
      </div>
    </div>
  )
}
