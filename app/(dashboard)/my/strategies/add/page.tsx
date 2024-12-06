'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { FileIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import BackHeader from '@/shared/ui/header/back-header'
import { Input } from '@/shared/ui/input'
import Select from '@/shared/ui/select'
import Title from '@/shared/ui/title'

import {
  MinimumInvestmentAmountType,
  OperationCycleType,
  ProposalFileInfoModel,
  StrategyModel,
} from '../../_api/add-strategy'
import {
  minimumInvestmentAmountOptions,
  operationCycleOptions,
} from '../../_constants/investment-amount'
import { useAddStrategy } from '../../_hooks/query/use-add-strategy'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface StrategyFormDataModel {
  strategyName: string
  tradeType: string
  operationCycle: OperationCycleType
  stockTypes: string[]
  minimumInvestmentAmount: MinimumInvestmentAmountType
  description: string
  proposalFile?: File
}

interface FormErrorsModel {
  strategyName: string
  tradeType: string
  operationCycle: string
  stockTypes: string
  minimumInvestmentAmount: string
  description: string
  proposalFile?: string
}

const StrategyAddPage = () => {
  const router = useRouter()
  const { strategyTypes, registerStrategy, isTypesLoading, isRegistering, error } = useAddStrategy()

  const [formData, setFormData] = useState<StrategyFormDataModel>({
    strategyName: '',
    tradeType: '',
    operationCycle: 'DAY',
    stockTypes: [],
    minimumInvestmentAmount: 'UNDER_10K',
    description: '',
  })

  const [formErrors, setFormErrors] = useState<FormErrorsModel>({
    strategyName: '',
    tradeType: '',
    operationCycle: '',
    stockTypes: '',
    minimumInvestmentAmount: '',
    description: '',
  })

  const validateForm = (): boolean => {
    const newErrors = {
      strategyName: !formData.strategyName ? '전략 명칭을 입력해주세요.' : '',
      tradeType: !formData.tradeType ? '매매 유형을 선택해주세요.' : '',
      operationCycle: !formData.operationCycle ? '주기를 선택해주세요.' : '',
      stockTypes: formData.stockTypes.length === 0 ? '종목을 선택해주세요.' : '',
      minimumInvestmentAmount: !formData.minimumInvestmentAmount
        ? '최소 운용가능 금액을 선택해주세요.'
        : '',
      description: !formData.description ? '전략 소개를 입력해주세요.' : '',
      proposalFile: '',
    }

    setFormErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (
      file &&
      (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel')
    ) {
      setFormData((prev) => ({ ...prev, proposalFile: file }))
      setFormErrors((prev) => ({ ...prev, proposalFile: '' }))
    } else {
      setFormErrors((prev) => ({ ...prev, proposalFile: '엑셀 파일만 업로드 가능합니다.' }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    const fileInfo: ProposalFileInfoModel | undefined = formData.proposalFile
      ? {
          proposalFileName: formData.proposalFile.name,
          proposalFileSize: formData.proposalFile.size,
        }
      : undefined

    const data: StrategyModel = {
      strategyName: formData.strategyName,
      tradeTypeId: Number(formData.tradeType),
      operationCycle: formData.operationCycle,
      stockTypeIds: formData.stockTypes.map(Number),
      minimumInvestmentAmount: formData.minimumInvestmentAmount,
      description: formData.description,
      proposalFile: fileInfo,
    }

    registerStrategy(data)
  }

  const toggleStockType = (value: string) => {
    setFormData((prev) => {
      const newStockTypes = prev.stockTypes.includes(value)
        ? prev.stockTypes.filter((type) => type !== value)
        : [...prev.stockTypes, value]
      return { ...prev, stockTypes: newStockTypes }
    })
    setFormErrors((prev) => ({ ...prev, stockTypes: '' }))
  }

  const tradeTypeOptions =
    strategyTypes?.tradeTypes.map((type) => ({
      value: String(type.tradeTypeId),
      label: type.tradeTypeName,
    })) || []

  if (isTypesLoading) {
    return <div className={cx('loading')}>로딩 중...</div>
  }
  return (
    <>
      <BackHeader label="전략관리로 돌아가기" />
      <Title label="전략 등록" />
      <form onSubmit={handleSubmit} className={cx('form')}>
        {error && <div className={cx('error')}>{error}</div>}
        <div className={cx('form-row')}>
          <label>전략 명칭</label>
          <div className={cx('form-field')}>
            <Input
              value={formData.strategyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, strategyName: e.target.value }))
                setFormErrors((prev) => ({ ...prev, strategyName: '' }))
              }}
              placeholder="전략명을 입력하세요"
              errorMessage={formErrors.strategyName}
            />
          </div>
        </div>
        <div className={cx('horizontal-wrapper')}>
          <div className={cx('form-row', 'half')}>
            <label>매매 유형</label>
            <div className={cx('form-field')}>
              <Select
                value={formData.tradeType}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, tradeType: value as string }))
                  setFormErrors((prev) => ({ ...prev, tradeType: '' }))
                }}
                options={tradeTypeOptions}
                placeholder="매매 유형 선택"
                titleStyle={{ width: '200px', height: '50px' }}
              />
              {formErrors.tradeType && (
                <div className={cx('field-error')}>{formErrors.tradeType}</div>
              )}
            </div>
          </div>

          <div className={cx('form-row', 'half')}>
            <label>주기</label>
            <div className={cx('form-field')}>
              <Select
                value={formData.operationCycle}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, operationCycle: value as OperationCycleType }))
                  setFormErrors((prev) => ({ ...prev, operationCycle: '' }))
                }}
                options={operationCycleOptions}
                placeholder="주기 선택"
                titleStyle={{ width: '200px', height: '50px' }}
                containerStyle={{ width: '100%' }}
              />
              {formErrors.operationCycle && (
                <div className={cx('field-error')}>{formErrors.operationCycle}</div>
              )}
            </div>
          </div>
        </div>
        <div className={cx('form-row')}>
          <label>종목</label>
          <div className={cx('form-field')}>
            <div className={cx('stock-grid')}>
              {strategyTypes?.stockTypes.map((type) => (
                <button
                  key={type.stockTypeId}
                  type="button"
                  onClick={() => toggleStockType(String(type.stockTypeId))}
                  className={cx('stock-item', {
                    selected: formData.stockTypes.includes(String(type.stockTypeId)),
                  })}
                >
                  {type.stockTypeName}
                  <span className={cx('marker')}>
                    <Image
                      src={type.stockIconUrl}
                      alt={type.stockTypeName}
                      width={20}
                      height={20}
                    />
                  </span>
                </button>
              ))}
            </div>
            {formErrors.stockTypes && (
              <div className={cx('field-error')}>{formErrors.stockTypes}</div>
            )}
          </div>
        </div>
        <div className={cx('form-row')}>
          <label>최소 운용가능 금액</label>
          <div className={cx('form-field')}>
            <Select
              value={formData.minimumInvestmentAmount}
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  minimumInvestmentAmount: value as MinimumInvestmentAmountType,
                }))
                setFormErrors((prev) => ({ ...prev, minimumInvestmentAmount: '' }))
              }}
              options={minimumInvestmentAmountOptions}
              placeholder="최소 운용가능 금액 선택"
              titleStyle={{ width: '200px', height: '50px' }}
              containerStyle={{ width: '100%' }}
            />
            {formErrors.minimumInvestmentAmount && (
              <div className={cx('field-error')}>{formErrors.minimumInvestmentAmount}</div>
            )}
          </div>
        </div>
        <div className={cx('form-row')}>
          <label>전략 소개</label>
          <div className={cx('form-field')}>
            <Input
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, description: e.target.value }))
                setFormErrors((prev) => ({ ...prev, description: '' }))
              }}
              placeholder="내용을 입력하세요"
              errorMessage={formErrors.description}
            />
          </div>
        </div>
        <div className={cx('form-row')}>
          <label>제안서</label>
          <div className={cx('form-field')}>
            <div className={cx('file-upload')}>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                id="proposalFile"
                className={cx('file-input')}
              />
              <label htmlFor="proposalFile" className={cx('file-label')}>
                <span>{formData.proposalFile?.name || '엑셀 파일을 선택해주세요'}</span>
                <FileIcon className={cx('file-icon')} />
              </label>
            </div>
            {formErrors.proposalFile && (
              <div className={cx('field-error')}>{formErrors.proposalFile}</div>
            )}
          </div>
        </div>
        <div className={cx('button-wrapper')}>
          <Button variant="outline" onClick={() => router.back()} type="button">
            취소
          </Button>
          <Button variant="filled" type="submit" disabled={isRegistering}>
            {isRegistering ? '등록 중...' : '전략 등록하기'}
          </Button>
        </div>
      </form>
    </>
  )
}
export default StrategyAddPage
