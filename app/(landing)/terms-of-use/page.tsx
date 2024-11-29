import classNames from 'classnames/bind'

import InvestorTerms from '@/shared/ui/terms/investor-terms'
import TraderTerms from '@/shared/ui/terms/trader-terms'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

const TermsOfUsePage = () => {
  return (
    <>
      <h1 className={cx('title')}>이용약관</h1>
      <section className={cx('section-container')}>
        <InvestorTerms />
      </section>
      <section className={cx('section-container')}>
        <TraderTerms />
      </section>
    </>
  )
}

export default TermsOfUsePage
