import { CSSProperties } from 'react'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import ManageTable from '../../shared/manage-table'
import styles from './styles.module.scss'

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
      <Button variant="filled" size="small" style={buttonStyles}>
        매매 유형 등록하기
      </Button>
      <ManageTable data={[]} active domain="매매 유형" />
      <ManageTable data={[]} domain="매매 유형" />
    </div>
  )
}

const buttonStyles: CSSProperties = {
  position: 'absolute',
  top: '-144px',
  right: 0,
  padding: '12px 24px',
}

export default TradeManage
