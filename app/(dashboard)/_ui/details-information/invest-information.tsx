import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  stock: string[]
  trade: string
  cycle: string
}

const InvestInformation = ({ stock, trade, cycle }: Props) => {
  const investData = [
    { title: '투자 종목', data: stock.join(',') },
    { title: '매매 유형', data: trade },
    { title: '투자 주기', data: cycle },
  ]
  return (
    <div className={cx('invest-container')}>
      {investData.map((data, idx) => (
        <div key={`${data}${idx}`} className={cx('info-item')}>
          <p className={cx('invest-title')}>{data.title}</p>
          <p className={cx('invest-data')}>{data.data}</p>
        </div>
      ))}
    </div>
  )
}

export default InvestInformation
