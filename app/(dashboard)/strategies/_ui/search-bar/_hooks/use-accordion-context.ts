import { useContext } from 'react'

import { AccordionContext } from '../accordion-container'

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('검색 메뉴 로드 실패')
  }
  return context
}
