import { CSSProperties, ReactNode } from 'react'

import Header from '@/shared/ui/header'
import { SearchInput } from '@/shared/ui/search-input'

interface Props {
  Left?: ReactNode
  Right?: ReactNode
  styles?: CSSProperties
}

const headerStyles: CSSProperties = {
  position: 'static',
  padding: '0',
  height: 'calc(40px * 2 + 18px)',
  // font B3
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '132%',
  letterSpacing: '-0.28px',
}

const AdminContentsHeader = ({ Left, Right }: Props) => {
  return <Header as="div" Left={Left} Right={Right} styles={headerStyles} />
}

const Search = () => {
  return <SearchInput placeholder="제목을 검색하세요." />
}

export default Object.assign(AdminContentsHeader, { Search })
