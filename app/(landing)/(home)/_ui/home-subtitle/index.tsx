import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  children: React.ReactNode
}

const HomeSubtitle = ({ children }: Props) => {
  return <h2 className={cx('subtitle')}>{children}</h2>
}

export default HomeSubtitle
