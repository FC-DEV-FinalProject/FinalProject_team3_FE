export const calculateTableNumber = ({
  page,
  idx,
  countPerPage,
}: {
  page: number
  idx: number
  countPerPage: number
}) => {
  return (page - 1) * countPerPage + (idx + 1)
}
