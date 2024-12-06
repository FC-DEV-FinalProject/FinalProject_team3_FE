import classNames from 'classnames/bind'

import PrivacyTerms from '@/shared/ui/terms/privacy-terms'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

const TermsOfUsePage = () => {
  return (
    <>
      <section className={cx('section-container')}>
        <PrivacyTerms />
      </section>
    </>
  )
}

export default TermsOfUsePage
