export const extractFileName = (
  contentDisposition: string | undefined,
  defaultFileName: string
): string => {
  if (!contentDisposition) return defaultFileName

  const fileNameMatch = contentDisposition.match(/filename\*?="?([^;"]+)/i)
  return fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : defaultFileName
}

export const downloadFile = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob)
  try {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    window.URL.revokeObjectURL(url)
  }
}
