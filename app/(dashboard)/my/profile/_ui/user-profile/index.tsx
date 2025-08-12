import classNames from 'classnames/bind'

import Avatar from '@/shared/ui/avatar'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  role: string
  nickname: string
  email: string
  imageURL?: string | undefined
}

const UserProfile = ({ role, nickname, email, imageURL }: Props) => {
  return (
    <div className={cx('container')}>
      <p className={cx('title')}>프로필 정보</p>
      <div className={cx('line')}></div>
      <div className={cx('content')}>
        <div className={cx('left-wrapper')}>
          <p className={cx('role')}>{role}</p>
          <p className={cx('nickname')}>{nickname}</p>
          <p className={cx('email')}>{email}</p>
        </div>
        <div className={cx('right-wrapper')}>
          <Avatar size="xlarge" src={imageURL} />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
