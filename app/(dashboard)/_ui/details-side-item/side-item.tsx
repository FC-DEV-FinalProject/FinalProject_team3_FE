import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import Avatar from '@/shared/ui/avatar'
import { LinkButton } from '@/shared/ui/link-button'
import { formatNumber } from '@/shared/utils/format'

import { TitleType } from '.'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: Omit<TitleType, '트레이더' | '최소 투자 금액' | '투자 원금'>
  data: number | string
  profileImage?: string
  isMyStrategy?: boolean
}

const SideItem = ({ title, data, profileImage, isMyStrategy = false }: Props) => {
  return (
    <div className={cx('side-item')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('data')}>
        {title === '트레이더' ? (
          <>
            <div className={cx('avatar')}>
              <Avatar src={profileImage} />
              <p>{data}</p>
            </div>
            {!isMyStrategy && (
              <LinkButton href={PATH.MY_QUESTIONS} size="small" style={{ height: '30px' }}>
                문의하기
              </LinkButton>
            )}
          </>
        ) : (
          <p>{formatNumber(data)}</p>
        )}
      </div>
    </div>
  )
}

export default SideItem
