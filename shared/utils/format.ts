export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return dateString
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
}

export const arrayFormatNumbers = (arrayData: number[]): (string | number)[] | null => {
  if (Array.isArray(arrayData)) {
    return arrayData.map((data) => formatNumber(data))
  }
  return null
}

export const formatNumber = (data: number | string): string | number => {
  if (typeof data === 'number') {
    return data.toLocaleString()
  }
  return data
}
