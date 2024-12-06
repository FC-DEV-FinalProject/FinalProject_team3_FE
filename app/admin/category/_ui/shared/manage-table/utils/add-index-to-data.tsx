import { ReactNode } from 'react'

const addIndexAndButton = (data: (string | number | ReactNode)[][]) => {
  return data?.map((d, idx) => [idx + 1, ...d])
}

export default addIndexAndButton
