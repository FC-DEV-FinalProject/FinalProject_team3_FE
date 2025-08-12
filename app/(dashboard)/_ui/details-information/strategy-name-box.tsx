'use client'

import { useEffect, useRef, useState } from 'react'

import StrategiesIcon from '@/app/(dashboard)/_ui/strategies-item/strategies-icon'
import { FileIcon } from '@/public/icons'
import { TrashcanIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { SUPPORTED_FILE_TYPES } from '@/shared/constants/supported-file-types'
import Input from '@/shared/ui/input'

import useGetProposalFileName from '../../my/_hooks/query/use-get-proposal-file-name'
import useEditInformationStore from '../../my/strategies/manage/[strategyId]/_store/use-edit-information-store'
import useGetProposalDownload from '../../strategies/[strategyId]/_hooks/query/use-get-proposal-download'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  name: string
  hasProposal: boolean
  iconUrls?: string[]
  iconNames?: string[]
  isEditable?: boolean
  error?: Error
}

const StrategyNameBox = ({
  strategyId,
  name,
  hasProposal: initialHasProposal,
  iconUrls,
  iconNames,
  isEditable = false,
  error,
}: Props) => {
  const information = useEditInformationStore((state) => state.information)
  const proposal = useEditInformationStore((state) => state.proposal)
  const setStrategyName = useEditInformationStore((state) => state.actions.setStrategyName)
  const setProposalFile = useEditInformationStore((state) => state.actions.setProposalFile)
  const initializeProposal = useEditInformationStore((state) => state.actions.initializeProposal)
  const setProposalModified = useEditInformationStore((state) => state.actions.setProposalModified)

  const { refetch } = useGetProposalFileName(strategyId)
  const { mutate } = useGetProposalDownload()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')

  const handleDownload = () => {
    mutate({ strategyId, name })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const supportedTypes = SUPPORTED_FILE_TYPES

    if (file && supportedTypes.includes(file.type)) {
      setSelectedFile(file)
      setProposalFile(file)
      setFileError('')
    } else {
      setSelectedFile(null)
      setProposalFile(null)
      setFileError('지원되는 파일 형식이 아닙니다.')
    }
  }

  const handleProposalClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleProposalDelete = () => {
    if (selectedFile || proposal.proposalFileName) {
      setSelectedFile(null)
      setProposalFile(null)
      initializeProposal('')
      setProposalModified(true)
      setFileError('')
    }
  }

  useEffect(() => {
    setStrategyName(name)
  }, [name, setStrategyName])

  useEffect(() => {
    if (isEditable) {
      refetch().then((response) => {
        const fileName = response.data?.result?.proposalFileName
        if (fileName) {
          initializeProposal(fileName)
        }
      })
    }
  }, [isEditable, refetch, initializeProposal])

  const displayFileName =
    selectedFile?.name || proposal.proposalFileName || '등록된 제안서가 없습니다'

  return (
    <div className={cx('name-container')}>
      <div className={cx('name-section')}>
        <StrategiesIcon iconUrls={iconUrls} iconNames={iconNames} isDetailsPage={true} />
        {isEditable ? (
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStrategyName(e.target.value)}
            inputSize="small"
            className={cx('name-input')}
            maxLength={16}
            value={information.strategyName as string}
          />
        ) : (
          <p className={cx('name')}>{name}</p>
        )}
        {initialHasProposal && !isEditable && (
          <button onClick={handleDownload} className={cx('download-button')}>
            제안서 다운로드
          </button>
        )}
      </div>
      {isEditable && (
        <div className={cx('proposal-section')}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.pdf,.doc,.docx,.txt,.ppt,.pptx"
            className={cx('file-input')}
          />
          <div className={cx('proposal-input-wrapper')}>
            <Input readOnly value={displayFileName} className={cx('file-name-input')} />
            <button onClick={handleProposalClick} className={cx('proposal-button', 'modify')}>
              <FileIcon />
            </button>
            <button onClick={handleProposalDelete} className={cx('proposal-button', 'delete')}>
              <TrashcanIcon />
            </button>
          </div>
          {error && <p className={cx('error-message')}>{error.message}</p>}
          {fileError && <p className={cx('error-message')}>{fileError}</p>}
        </div>
      )}
    </div>
  )
}

export default StrategyNameBox
