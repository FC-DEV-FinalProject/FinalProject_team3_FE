'use client'

import React from 'react'

import { RegisterIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '@/shared/ui/modal'

import DirectInputForm from './form/direct-input-form'
import ExcelUploadForm from './form/excel-upload-form'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface AnalysisUploadModalProps {
  isOpen: boolean
  onClose: () => void
  strategyId: number
  uploadType: 'excel' | 'direct'
  message: string
}

const AnalysisUploadModal = ({
  isOpen,
  onClose,
  strategyId,
  uploadType,
  message,
}: AnalysisUploadModalProps) => {
  return (
    <Modal isOpen={isOpen} size="big" icon={RegisterIcon} message={message}>
      <div className={cx('container')}>
        {uploadType === 'excel' && <ExcelUploadForm strategyId={strategyId} onClose={onClose} />}
        {uploadType === 'direct' && <DirectInputForm strategyId={strategyId} onClose={onClose} />}
      </div>
    </Modal>
  )
}

export default AnalysisUploadModal
