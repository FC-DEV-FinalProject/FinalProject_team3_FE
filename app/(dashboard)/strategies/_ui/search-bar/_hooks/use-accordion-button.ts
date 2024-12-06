import { useRef, useState } from 'react'

export interface ButtonIdStateModel {
  [key: string]: boolean
}

const useAccordionButton = () => {
  const [openIds, setOpenIds] = useState<ButtonIdStateModel | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleButtonIds = (id: string, isOpen: boolean) => {
    setOpenIds((prev) => ({ ...prev, [id]: isOpen }))
  }

  return { panelRef, openIds, handleButtonIds }
}

export default useAccordionButton
