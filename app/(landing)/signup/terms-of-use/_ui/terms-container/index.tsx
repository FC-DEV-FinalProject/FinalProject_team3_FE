import classNames from 'classnames/bind'

import Checkbox from '@/shared/ui/check-box'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  isChecked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
}

const TermsContainer = ({ title, isChecked, onChange, children }: Props) => {
  return (
    <section className={cx('container')}>
      <h2 className={cx('title')}>{title}</h2>
      <div className={cx('terms-wrapper')}>{children}</div>
      <Checkbox
        className={cx('checkbox')}
        label="동의합니다."
        isChecked={isChecked}
        onChange={onChange}
        textSize="b3"
      />
    </section>
  )
}

export default TermsContainer
