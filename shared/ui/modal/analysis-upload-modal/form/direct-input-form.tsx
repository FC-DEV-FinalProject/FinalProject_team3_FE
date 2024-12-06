'use client'

import React, { useState } from 'react'

import { useAnalysisUploadMutation } from '@/app/(dashboard)/my/_hooks/query/use-analysis-mutation'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  onClose: () => void
}

interface EntryDataModel {
  date: string
  transaction: string
  dailyProfitLoss: string
}

const DirectInputForm = ({ strategyId, onClose }: Props) => {
  const [currentEntry, setCurrentEntry] = useState<EntryDataModel>({
    date: '',
    transaction: '',
    dailyProfitLoss: '',
  })
  const [savedEntries, setSavedEntries] = useState<EntryDataModel[]>([])
  const [error, setError] = useState<string>('')
  const { uploadAnalysis, isLoading } = useAnalysisUploadMutation(strategyId)

  const handleCurrentEntryChange = (field: keyof EntryDataModel, value: string) => {
    setCurrentEntry((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError('')
  }

  const validateEntry = (entry: EntryDataModel) => {
    if (!entry.date || !entry.transaction || !entry.dailyProfitLoss) {
      setError('모든 필드를 입력해주세요.')
      return false
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(entry.date)) {
      setError('날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)')
      return false
    }

    if (isNaN(Number(entry.transaction)) || isNaN(Number(entry.dailyProfitLoss))) {
      setError('입출금과 일일손익은 숫자여야 합니다.')
      return false
    }

    return true
  }

  const addEntry = () => {
    if (!validateEntry(currentEntry)) return
    if (savedEntries.length >= 4) {
      setError('최대 5개까지만 입력할 수 있습니다.')
      return
    }

    setSavedEntries([...savedEntries, currentEntry])
    setCurrentEntry({
      date: '',
      transaction: '',
      dailyProfitLoss: '',
    })
  }

  const removeEntry = (index: number) => {
    setSavedEntries(savedEntries.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    const allEntries = [...savedEntries]
    if (currentEntry.date || currentEntry.transaction || currentEntry.dailyProfitLoss) {
      if (!validateEntry(currentEntry)) return
      allEntries.push(currentEntry)
    }

    if (allEntries.length === 0) {
      setError('최소 하나의 데이터를 입력해주세요.')
      return
    }

    const data = allEntries.map((entry) => ({
      date: entry.date,
      transaction: Number(entry.transaction),
      dailyProfitLoss: Number(entry.dailyProfitLoss),
    }))

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
  }

  return (
    <div className={cx('upload-container')}>
      <div className={cx('form-grid')}>
        <div className={cx('input-group')}>
          <label className={cx('label')}>날짜</label>
          <Input
            className={cx('data-input')}
            name="date"
            value={currentEntry.date}
            onChange={(e) => handleCurrentEntryChange('date', e.target.value)}
            placeholder="날짜를 입력해주세요."
          />
        </div>

        <div className={cx('input-group')}>
          <label className={cx('label')}>입출금</label>
          <Input
            className={cx('data-input')}
            name="transaction"
            value={currentEntry.transaction}
            onChange={(e) => handleCurrentEntryChange('transaction', e.target.value)}
            placeholder="입출금을 입력해주세요."
          />
        </div>

        <div className={cx('input-group')}>
          <label className={cx('label')}>일 손익</label>
          <Input
            className={cx('data-input')}
            name="dailyProfitLoss"
            value={currentEntry.dailyProfitLoss}
            onChange={(e) => handleCurrentEntryChange('dailyProfitLoss', e.target.value)}
            placeholder="일손익금을 입력해주세요."
          />
        </div>

        <div className={cx('input-actions')}>
          {savedEntries.length < 5 && (
            <Button className={cx('add-button')} variant="filled" onClick={addEntry}>
              추가
            </Button>
          )}
        </div>
      </div>

      {savedEntries.map((entry, index) => (
        <div key={index} className={cx('form-grid')}>
          <div className={cx('input-group')}>
            <label className={cx('label')}>날짜</label>
            <Input className={cx('data-input')} value={entry.date} disabled />
          </div>

          <div className={cx('input-group')}>
            <label className={cx('label')}>입출금</label>
            <Input className={cx('data-input')} value={entry.transaction} disabled />
          </div>

          <div className={cx('input-group')}>
            <label className={cx('label')}>일 손익</label>
            <Input className={cx('data-input')} value={entry.dailyProfitLoss} disabled />
          </div>

          <div className={cx('input-actions')}>
            <Button
              variant="outline"
              className={cx('delete-button')}
              onClick={() => removeEntry(index)}
            >
              삭제
            </Button>
          </div>
        </div>
      ))}

      {error && <p className={cx('error-message')}>{error}</p>}

      <div className={cx('button-group')}>
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          취소
        </Button>
        <Button variant="filled" onClick={handleSubmit} disabled={isLoading}>
          등록
        </Button>
      </div>
    </div>
  )
}

export default DirectInputForm
