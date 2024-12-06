'use client'

import { useState } from 'react'

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  const closeModal = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  }
}
export default useModal
