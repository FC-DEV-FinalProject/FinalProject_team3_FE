import { AxiosError } from 'axios'

import axiosInstance from '@/shared/api/axios'

import { downloadFile, extractFileName } from './helper-download-file'

const getAnalysisDownload = async (strategyId: number, type: 'daily' | 'monthly') => {
  try {
    const response = await axiosInstance.get(
      `/api/strategies/${strategyId}/${type}-analysis/download`,
      {
        responseType: 'blob',
      }
    )
    const mimeType = response.headers['content-type'] || 'application/octet-stream'
    const blob = new Blob([response.data], { type: mimeType })
    const contentDisposition = response.headers['content-disposition']

    const fileName = extractFileName(contentDisposition, `${type}_분석자료`)

    downloadFile(blob, fileName)
  } catch (err) {
    throw new Error('분석자료 다운 실패', err as AxiosError)
  }
}

export default getAnalysisDownload
