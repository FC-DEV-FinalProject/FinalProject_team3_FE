'use client'

import { SetStateAction, useState } from 'react'

import { NoticeFileModel, NoticeFormModel } from '../types'

interface UseFileHandlerProps {
  formData: NoticeFormModel
  setFormData: React.Dispatch<SetStateAction<NoticeFormModel>>
  onInputChange: (name: keyof NoticeFormModel, value: string | File[] | NoticeFileModel[]) => void
}

const useFileHandler = ({ formData, setFormData, onInputChange }: UseFileHandlerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasDuplicateFile = (file: File) => {
    return (
      formData.existingFiles?.some((existingFile) => existingFile.fileName === file.name) ||
      formData.newFiles?.some((newFile) => newFile.name === file.name)
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    const uniqueFiles = selectedFiles.filter((file) => !hasDuplicateFile(file))
    const duplicateFiles = selectedFiles.filter((file) => hasDuplicateFile(file))

    if (duplicateFiles.length > 0) {
      setIsModalOpen(true)
      return
    }

    if (uniqueFiles.length > 0) {
      onInputChange('newFiles', [...(formData.newFiles || []), ...uniqueFiles])
    }

    e.target.value = ''
  }

  const handleDeleteFile = (id: number | string) => {
    if (typeof id === 'number') {
      setFormData((prev) => ({
        ...prev,
        existingFiles: prev.existingFiles?.filter((file) => file.noticeFileId !== id),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        newFiles: prev.newFiles?.filter((file) => file.name !== id),
      }))
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return {
    handleFileChange,
    handleDeleteFile,
    handleCloseModal,
    isModalOpen,
  }
}

export default useFileHandler
