import { Dispatch, ReactNode, SetStateAction } from 'react'

import classNames from 'classnames/bind'

import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

import { COUNT_PER_PAGE } from './constant'
import styles from './styles.module.scss'
import addIndexToData from './utils/add-index-to-data'

const cx = classNames.bind(styles)

interface Props {
  active?: boolean
  domain: '종목' | '매매 유형'
  data: (ReactNode | string | number)[][]
  //TODO: domain이 종록일 때만 쓰는 속성들 컨트롤 하는 법 고민해보기
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
  // const [currentPage, setCurrentPage] = useState(1)

  const hasData = data?.length > 0

  return (
    <div className={cx('container')}>
      <span className={cx('title')}>{active ? '활성화' : '비활성화'}</span>
      <VerticalTable
        tableHead={['No.', domain === '종목' ? '종목명' : '매매 유형', '분류', '상태']}
        tableBody={addIndexToData(data)}
        countPerPage={size}
        currentPage={1} // 공통 컴포넌트와의 호환성 문제...
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
        countPerPage={size} //TODO: 이거 디자인에 맞춰서 크기 조절
      />
    </div>
  )
}

ManageTable.Skeleton = Skeleton

export default ManageTable
