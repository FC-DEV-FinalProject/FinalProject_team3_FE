import { useState } from 'react'

const useAdminNoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return {
    currentPage,
    setCurrentPage,
  }
}

export default useAdminNoticePage
