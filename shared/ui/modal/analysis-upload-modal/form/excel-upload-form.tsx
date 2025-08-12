'use client'

import React, { useState } from 'react'

import { useAnalysisUploadMutation } from '@/app/(dashboard)/my/_hooks/query/use-analysis-mutation'
import { FileIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import { processExcelFile } from '@/shared/utils/excel-utils'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  onClose: () => void
}

const ExcelUploadForm = ({ strategyId, onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')
  const { uploadAnalysis, isLoading } = useAnalysisUploadMutation(strategyId)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    try {
      const data = await processExcelFile(file)
      uploadAnalysis(
        { data },
        {
          onSuccess: () => {
            onClose()
          },
          onError: () => {
            setError('데이터 업로드 중 오류가 발생했습니다.')
          },
        }
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : '파일 처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className={cx('upload-container')}>
      <div className={cx('file-input-wrapper')}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className={cx('hidden-input')}
          id="fileInput"
        />
        <label htmlFor="fileInput" className={cx('custom-input')}>
          <span className={cx('placeholder')}>{file ? file.name : '파일 찾아보기'}</span>
          <button className={cx('file-button')}>
            <FileIcon />
          </button>
        </label>
        <Button variant="outline" className={cx('guide-button')} disabled={isLoading}>
          <a href="/files/upload-guide.xls" download="엑셀업로드설명.xls">
            업로드 가이드 다운
          </a>
        </Button>
      </div>
      <p className={cx('guide-message')}>
        *일간분석 데이터 업로드 후 통계지표 집계 및 반영까지 약간의 시간이 소요될 수 있습니다.
      </p>

      {error && <p className={cx('error-message')}>{error}</p>}

      <div className={cx('button-group')}>
        <Button onClick={onClose} variant="outline" disabled={isLoading}>
          취소
        </Button>
        <Button variant="filled" disabled={!file || isLoading} onClick={handleSubmit}>
          업로드
        </Button>
      </div>
    </div>
  )
}

export default ExcelUploadForm
