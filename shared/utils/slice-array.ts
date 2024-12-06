const sliceArray = <T>(array: T[], countPerPage: number, currentPage: number) => {
  return array.slice(
    countPerPage * (currentPage - 1),
    countPerPage * (currentPage - 1) + countPerPage
  )
}

export default sliceArray
