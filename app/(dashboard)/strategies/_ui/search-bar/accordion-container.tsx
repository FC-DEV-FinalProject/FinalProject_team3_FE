'use client'

import { createContext } from 'react'

import useAccordionButton, { ButtonIdStateModel } from './_hooks/use-accordion-button'
import { SearchTermsModel } from './_type/search'
import AccordionButton from './accordion-button'
import AccordionPanel from './accordion-panel'

interface AccordionContextModel {
  panelRef: React.RefObject<HTMLDivElement>
  openIds: ButtonIdStateModel | null
  handleButtonIds: (id: string, open: boolean) => void
}

const initialState: AccordionContextModel = {
  panelRef: { current: null },
  openIds: null,
  handleButtonIds: () => {},
}

export const AccordionContext = createContext(initialState)

interface Props {
  optionId: keyof SearchTermsModel
  title: string
  panels?: string[]
}

const AccordionContainer = ({ optionId, title, panels }: Props) => {
  const { openIds, panelRef, handleButtonIds } = useAccordionButton()

  return (
    <AccordionContext.Provider value={{ openIds, panelRef, handleButtonIds }}>
      <div>
        <AccordionButton optionId={optionId} title={title} size={panels?.length} />
        <AccordionPanel optionId={optionId} panels={panels} />
      </div>
    </AccordionContext.Provider>
  )
}

export default AccordionContainer
