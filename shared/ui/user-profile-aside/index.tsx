import classNames from 'classnames/bind'

import Avatar from '../avatar'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  type: string
  name: string
  email: string
}

export const UserProfileAside = ({ type, name, email }: Props) => {
  return (
    <div className={cx('container')}>
      <p className={cx('profile-info')}>프로필 정보</p>
      <div className={cx('line')}></div>
      <div className={cx('content')}>
        <div className={cx('left-wrapper')}>
          <p className={cx('type')}>{type}</p>
          <p className={cx('name')}>{name}</p>
          <p className={cx('email')}>{email}</p>
        </div>
        <div className={cx('right-wrapper')}>
          <Avatar size="xlarge" />
        </div>
      </div>
    </div>
  )
}
