import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  className?: string
}

const Spinner = ({ className }: Props) => {
  return <div className={cx('spinner', className)} />
}

export default Spinner
