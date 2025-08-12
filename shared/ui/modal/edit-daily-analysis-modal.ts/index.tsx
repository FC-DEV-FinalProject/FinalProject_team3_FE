'use client'

import React, { useState } from 'react'

import { useMyAnalysisMutation } from '@/app/(dashboard)/my/_hooks/query/use-manage-daily-analysis'
import { RegisterIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Input from '@/shared/ui/input'
import Modal from '@/shared/ui/modal'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface EditAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
  strategyId: number
  analysisId: number
  initialData: {
    date: string
    transaction: number
    dailyProfitLoss: number
  }
  page: number
  size: number
}

const EditAnalysisModal = ({
  isOpen,
  onClose,
  strategyId,
  initialData,
  page,
  size,
}: EditAnalysisModalProps) => {
  const [formData, setFormData] = useState({
    date: initialData.date,
    transaction: initialData.transaction.toString(),
    dailyProfitLoss: initialData.dailyProfitLoss.toString(),
  })
  const [error, setError] = useState<string>('')

  const { editAnalysisData } = useMyAnalysisMutation(strategyId, page, size)

  const handleChange = (field: 'date' | 'transaction' | 'dailyProfitLoss', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.date || !formData.transaction || !formData.dailyProfitLoss) {
      setError('모든 필드를 입력해주세요.')
      return false
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(formData.date)) {
      setError('날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)')
      return false
    }

    const transaction = Number(formData.transaction)
    const dailyProfitLoss = Number(formData.dailyProfitLoss)

    if (isNaN(transaction) || isNaN(dailyProfitLoss)) {
      setError('입출금과 일손익은 숫자여야 합니다.')
      return false
    }

    return true
  }

  const handleSubmit = () => {
    try {
      if (!validateForm()) return

      editAnalysisData(
        {
          payload: {
            date: formData.date,
            transaction: Number(formData.transaction),
            dailyProfitLoss: Number(formData.dailyProfitLoss),
          },
        },
        {
          onSuccess: () => {
            onClose()
          },
          onError: () => {
            setError('데이터 수정 중 오류가 발생했습니다.')
          },
        }
      )
    } catch (err) {
      setError('데이터 수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <Modal isOpen={isOpen} size="big" icon={RegisterIcon} message="일간분석 데이터 수정">
      <div className={cx('upload-container')}>
        <div className={cx('form-grid')}>
          <div className={cx('input-group')}>
            <label className={cx('label')}>날짜</label>
            <Input
              className={cx('data-input')}
              name="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              placeholder="날짜를 입력해주세요."
            />
          </div>

          <div className={cx('input-group')}>
            <label className={cx('label')}>입출금</label>
            <Input
              className={cx('data-input')}
              name="transaction"
              value={formData.transaction}
              onChange={(e) => handleChange('transaction', e.target.value)}
              placeholder="입출금을 입력해주세요."
            />
          </div>

          <div className={cx('input-group')}>
            <label className={cx('label')}>일 손익</label>
            <Input
              className={cx('data-input')}
              name="dailyProfitLoss"
              value={formData.dailyProfitLoss}
              onChange={(e) => handleChange('dailyProfitLoss', e.target.value)}
              placeholder="일손익금을 입력해주세요."
            />
          </div>
        </div>

        {error && <p className={cx('error-message')}>{error}</p>}

        <div className={cx('button-group')}>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="filled" onClick={handleSubmit}>
            수정
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditAnalysisModal
