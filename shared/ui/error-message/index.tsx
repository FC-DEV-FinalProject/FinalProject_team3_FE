import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  errorMessage?: string | null
}
export const ErrorMessage = ({ errorMessage }: Props) => {
  return <>{errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}</>
}
