export const downloadFile = (
  blob: Blob,
  contentDisposition: string | undefined,
  defaultFileName: string
) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url

  const fileName = contentDisposition
    ? decodeURIComponent(contentDisposition.split('filename=')[1])
    : defaultFileName

  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(url)
}
