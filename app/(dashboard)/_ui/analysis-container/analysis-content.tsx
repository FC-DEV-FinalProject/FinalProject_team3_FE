import { useState } from 'react'

import classNames from 'classnames/bind'

import { ANALYSIS_PAGE_COUNT } from '@/shared/constants/count-per-page'
import useModal from '@/shared/hooks/custom/use-modal'
import { MyDailyAnalysisModel } from '@/shared/types/strategy-data'
import { Button } from '@/shared/ui/button'
import AnalysisUploadModal from '@/shared/ui/modal/analysis-upload-modal'
import DailyAnalysisDeleteAllModal from '@/shared/ui/modal/daily-analysis-delete-all-modal'
import EditAnalysisModal from '@/shared/ui/modal/edit-daily-analysis-modal.ts'
import Pagination from '@/shared/ui/pagination'
import VerticalTable, { TableBodyDataType, isMyAnalysisData } from '@/shared/ui/table/vertical'

import { useAnalysisUploadMutation } from '../../my/_hooks/query/use-analysis-mutation'
import useGetMyDailyAnalysis from '../../my/_hooks/query/use-get-my-daily-analysis'
import { useMyAnalysisMutation } from '../../my/_hooks/query/use-manage-daily-analysis'
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
  const [selectedAnalysis, setSelectedAnalysis] = useState<MyDailyAnalysisModel | null>(null)

  const { isModalOpen, openModal, closeModal } = useModal()
  const {
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal()
  const {
    isModalOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal()

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
  const { deleteAnalysisData } = useMyAnalysisMutation(strategyId, currentPage, ANALYSIS_PAGE_COUNT)

  const handleDownload = () => {
    mutate({ strategyId, type })
  }

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

  const handleCloseEditModal = () => {
    closeEditModal()
    setSelectedAnalysis(null)
  }

  const handleDeleteAll = async () => {
    try {
      await deleteAllAnalysis()
      closeDeleteModal()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleDeleteAnalysis = async (dailyAnalysisId: number) => {
    try {
      await deleteAnalysisData(dailyAnalysisId)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const renderActions = (row: TableBodyDataType) => {
    if (!isMyAnalysisData(row)) return null

    return (
      <div className={cx('button-container')}>
        <Button
          size="small"
          variant="outline"
          className={cx('edit-button')}
          onClick={() => {
            setSelectedAnalysis(row)
            openEditModal()
          }}
        >
          수정
        </Button>
        <Button
          size="small"
          variant="filled"
          className={cx('delete-button')}
          onClick={() => handleDeleteAnalysis(row.dailyAnalysisId)}
        >
          삭제
        </Button>
      </div>
    )
  }

  const tableHeader = type === 'daily' ? DAILY_TABLE_HEADER : MONTHLY_TABLE_HEADER

  return (
    <div className={cx('table-wrapper', isEditable ? 'my-analysis' : 'analysis')}>
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
              variant="outline"
              onClick={handleDirectInput}
            >
              직접 입력
            </Button>
          </div>
          <Button
            size="small"
            variant="filled"
            onClick={openDeleteModal}
            disabled={isLoading}
            className={cx('delete-all-button')}
          >
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
            renderActions={isEditable ? renderActions : undefined}
            hideFirstColumn={isEditable}
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

      {selectedAnalysis && (
        <EditAnalysisModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          strategyId={strategyId}
          analysisId={selectedAnalysis.dailyAnalysisId}
          initialData={{
            date: selectedAnalysis.dailyDate,
            transaction: selectedAnalysis.transaction,
            dailyProfitLoss: selectedAnalysis.dailyProfitLoss,
          }}
          page={currentPage}
          size={ANALYSIS_PAGE_COUNT}
        />
      )}

      <DailyAnalysisDeleteAllModal
        isModalOpen={isDeleteModalOpen}
        onCloseModal={closeDeleteModal}
        onDelete={handleDeleteAll}
        isPending={isLoading}
      />
    </div>
  )
}

export default AnalysisContent
