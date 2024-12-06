import { useState } from 'react'

import { NoticeFormModel } from '../types'

const useNoticeForm = () => {
  const [formData, setFormData] = useState<NoticeFormModel>({
    title: '',
    content: '',
    files: [],
  })

  const onInputChange = (name: keyof NoticeFormModel, value: string | File[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    formData,
    onInputChange,
  }
}

export default useNoticeForm
