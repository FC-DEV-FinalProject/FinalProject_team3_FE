import { ReactNode } from 'react'

import classNames from 'classnames/bind'

import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

import styles from './styles.module.scss'
import addIndexToData from './utils/add-index-to-data'

const cx = classNames.bind(styles)

interface Props {
  active?: boolean
  domain: '종목' | '매매 유형'
  data: (ReactNode | string | number)[][]
}

const ManageTable = ({ active, domain, data }: Props) => {
  return (
    <div className={cx('container')}>
      <span className={cx('title')}>{active ? '활성화' : '비활성화'}</span>
      <VerticalTable
        tableHead={['No.', domain === '종목' ? '종목명' : '매매 유형', '분류', '상태']}
        tableBody={addIndexToData(data, active)}
        countPerPage={8}
        currentPage={1}
      />
      <Pagination currentPage={1} maxPage={3} onPageChange={() => {}} />
    </div>
  )
}

const Skeleton = ({ active, domain }: Pick<Props, 'active' | 'domain'>) => {
  return (
    <div className={cx('container')}>
      <span className={cx('title')}>{active ? '활성화' : '비활성화'}</span>
      <VerticalTable.Skeleton
        tableHead={['No.', domain === '종목' ? '종목명' : '매매 유형', '분류', '상태']}
        countPerPage={8} //TODO: 이거 디자인에 맞춰서 크기 조절
      />
    </div>
  )
}

ManageTable.Skeleton = Skeleton

export default ManageTable
