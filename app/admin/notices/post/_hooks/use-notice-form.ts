import { useState } from 'react'

import { NoticeFileModel, NoticeFormModel } from '../../types'

const useNoticeForm = (
  initialValue = {
    title: '',
    content: '',
    existingFiles: [],
    newFiles: [],
  }
) => {
  const [formData, setFormData] = useState<NoticeFormModel>(initialValue)

  const onInputChange = (
    name: keyof NoticeFormModel,
    value: string | File[] | NoticeFileModel[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    formData,
    setFormData,
    onInputChange,
  }
}

export default useNoticeForm
