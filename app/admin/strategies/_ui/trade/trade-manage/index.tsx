import classNames from 'classnames/bind'

import ActiveTradeManageTable from './active-trade-manage-table'
import InactiveTradeManageTable from './inactive-trade-manage-table'
import styles from './styles.module.scss'
import TradePostButton from './trade-post-button'

const cx = classNames.bind(styles)

// const activeMock = [
//   ['K100 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K200 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K50 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K200 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K100 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K50 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K200 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K100 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
//   ['K50 선물', <div style={{ width: '20px', height: '20px', backgroundColor: 'red' }} />],
// ]

const TradeManage = () => {
  return (
    <div className={cx('container')}>
      <TradePostButton />
      <ActiveTradeManageTable />
      <InactiveTradeManageTable />
    </div>
  )
}

export default TradeManage
