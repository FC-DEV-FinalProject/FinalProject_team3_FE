import { useState } from 'react'

import classNames from 'classnames/bind'

import { ANALYSIS_PAGE_COUNT } from '@/shared/constants/count-per-page'
import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AnalysisUploadModal from '@/shared/ui/modal/analysis-upload-modal'
import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

import { useAnalysisUploadMutation } from '../../my/_hooks/query/use-analysis-mutation'
import useGetMyDailyAnalysis from '../../my/_hooks/query/use-get-my-daily-analysis'
import useGetAnalysis from '../../strategies/[strategyId]/_hooks/query/use-get-analysis'
import useGetAnalysisDownload from '../../strategies/[strategyId]/_hooks/query/use-get-analysis-download'
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
  const { mutate } = useGetAnalysisDownload()

  const [uploadType, setUploadType] = useState<'excel' | 'direct' | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  //TODO 현재 나의 전략 일간분석 조회 권한이 없어서 안보임
  const { data: myAnalysisData } = useGetMyDailyAnalysis(
    strategyId,
    currentPage,
    ANALYSIS_PAGE_COUNT
  )
  const { data: publicAnalysisData } = useGetAnalysis(
    strategyId,
    type,
    currentPage,
    ANALYSIS_PAGE_COUNT
  )

  const analysisData = isEditable ? myAnalysisData : publicAnalysisData

  const { deleteAllAnalysis, isLoading } = useAnalysisUploadMutation(
    strategyId,
    currentPage,
    ANALYSIS_PAGE_COUNT
  )

  const handleDownload = () => {
    mutate({ strategyId, type })
  }

  const tableHeader = type === 'daily' ? DAILY_TABLE_HEADER : MONTHLY_TABLE_HEADER

  const handleExcelUpload = () => {
    setUploadType('excel')
    openModal()
  }

  const handleDirectInput = () => {
    setUploadType('direct')
    openModal()
  }

  const handleCloseModal = () => {
    closeModal()
    setUploadType(null)
  }

  const handleDeleteAll = async () => {
    if (window.confirm('모든 데이터를 삭제하시겠습니까?')) {
      try {
        await deleteAllAnalysis()
      } catch (error) {
        console.error('Delete error:', error)
        alert('데이터 삭제 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className={cx('table-wrapper', 'analysis')}>
      {!isEditable && analysisData && (
        <Button
          onClick={handleDownload}
          size="small"
          className={cx('excel-button')}
          variant="filled"
        >
          엑셀 다운받기
        </Button>
      )}
      {isEditable && (
        <div className={cx('button-container')}>
          <div className={cx('button-wrapper')}>
            <Button
              size="small"
              className={cx('upload-button')}
              variant="filled"
              onClick={handleExcelUpload}
            >
              엑셀 업로드
            </Button>
            <Button
              size="small"
              className={cx('upload-button')}
              variant="filled"
              onClick={handleDirectInput}
            >
              직접 입력
            </Button>
          </div>
          <Button size="small" variant="filled" onClick={handleDeleteAll} disabled={isLoading}>
            전체 삭제
          </Button>
        </div>
      )}
      {analysisData ? (
        <>
          <VerticalTable
            tableHead={tableHeader}
            tableBody={analysisData.content}
            currentPage={1}
            countPerPage={ANALYSIS_PAGE_COUNT}
            isEditable={isEditable}
          />
          <Pagination
            currentPage={currentPage}
            maxPage={analysisData.totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className={cx('no-data')}>
          <p>업데이트 된 분석 데이터가 없습니다.</p>
        </div>
      )}

      {uploadType && (
        <AnalysisUploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          strategyId={strategyId}
          uploadType={uploadType}
          message={uploadType === 'excel' ? '엑셀 업로드' : '일간분석 데이터 입력'}
        />
      )}
    </div>
  )
}

export default AnalysisContent
