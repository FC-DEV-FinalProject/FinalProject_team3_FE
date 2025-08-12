import { Dispatch, ReactNode, SetStateAction } from 'react'

import classNames from 'classnames/bind'

import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

import { COUNT_PER_PAGE } from './constant'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  active?: boolean
  domain: '종목' | '매매 유형'
  data: (ReactNode | string | number)[][]
  size?: number
  currentPage?: number
  setCurrentPage?: Dispatch<SetStateAction<number>>
  maxPage?: number
}

const ManageTable = ({
  active,
  domain,
  data,
  size = COUNT_PER_PAGE,
  currentPage = 1,
  maxPage,
  setCurrentPage,
}: Props) => {
  const hasData = data?.length > 0

  return (
    <div className={cx('container')}>
      <span className={cx('title')}>{active ? '활성화' : '비활성화'}</span>
      <VerticalTable
        tableHead={['No.', domain === '종목' ? '종목명' : '매매 유형', '분류', '상태']}
        tableBody={data}
        countPerPage={size}
        currentPage={1}
      />
      {hasData && domain === '종목' && (
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage ?? 3}
          onPageChange={(page) => setCurrentPage?.(page)}
        />
      )}
    </div>
  )
}

const Skeleton = ({ active, domain, size }: Pick<Props, 'active' | 'domain' | 'size'>) => {
  return (
    <div className={cx('container')}>
      <span className={cx('title')}>{active ? '활성화' : '비활성화'}</span>
      <VerticalTable.Skeleton
        tableHead={['No.', domain === '종목' ? '종목명' : '매매 유형', '분류', '상태']}
        countPerPage={size}
      />
    </div>
  )
}

ManageTable.Skeleton = Skeleton

export default ManageTable
