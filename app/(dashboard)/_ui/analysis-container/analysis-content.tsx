import classNames from 'classnames/bind'

import { ANALYSIS_PAGE_COUNT } from '@/shared/constants/count-per-page'
import { Button } from '@/shared/ui/button'
import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

import useGetAnalysis from '../../strategies/[strategyId]/_hooks/query/use-get-analysis'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const DAILY_TABLE_HEADER = [
  '날짜',
  '원금',
  '입출금',
  '일 손익',
  '일 손익률',
  '누적 손익',
  '누적 수익률',
]

const MONTHLY_TABLE_HEADER = [
  '날짜',
  '원금',
  '입출금',
  '월 손익',
  '월 손익률',
  '누적 손익',
  '누적 수익률',
]

interface Props {
  type: 'daily' | 'monthly'
  strategyId: number
  currentPage: number
  onPageChange: (page: number) => void
  isEditable?: boolean
}

const AnalysisContent = ({
  type,
  strategyId,
  currentPage,
  onPageChange,
  isEditable = false,
}: Props) => {
  const { data: analysisData } = useGetAnalysis(strategyId, type, currentPage, ANALYSIS_PAGE_COUNT)

  const tableHeader = type === 'daily' ? DAILY_TABLE_HEADER : MONTHLY_TABLE_HEADER

  if (analysisData?.content === null || analysisData?.content === undefined) return null

  return (
    <div className={cx('table-wrapper', 'analysis')}>
      {!isEditable && (
        <Button size="small" className={cx('excel-button')} variant="filled">
          엑셀 다운받기
        </Button>
      )}
      {isEditable && (
        <div className={cx('button-container')}>
          <div className={cx('button-wrapper')}>
            <Button size="small" className={cx('upload-button')} variant="filled">
              엑셀 업로드
            </Button>
            <Button size="small" className={cx('upload-button')} variant="outline">
              직접 입력
            </Button>
          </div>
          <Button size="small" variant="filled">
            전체 삭제
          </Button>
        </div>
      )}

      <VerticalTable
        tableHead={tableHeader}
        tableBody={analysisData?.content}
        currentPage={currentPage}
        countPerPage={ANALYSIS_PAGE_COUNT}
        isEditable={isEditable}
      />
      <Pagination
        currentPage={currentPage}
        maxPage={analysisData?.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default AnalysisContent
