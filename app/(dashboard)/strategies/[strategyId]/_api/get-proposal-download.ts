import { AxiosError } from 'axios'

import axiosInstance from '@/shared/api/axios'

import { downloadFile, extractFileName } from './helper-download-file'

const TIME_OUT = 30000
const getProposalDownload = async (strategyId: number, name: string) => {
  try {
    const response = await axiosInstance.get(`/api/my-strategies/${strategyId}/download-proposal`, {
      responseType: 'blob',
      timeout: TIME_OUT,
      headers: {
        Accept: 'application/octet-stream',
      },
    })

    if (response.status !== 200) {
      throw new Error(`Failed with status: ${response.status}`)
    }

    const mimeType = response.headers['content-type'] || 'application/octet-stream'

    if (!response.data || response.data.size === 0) {
      throw new Error('Empty file data received')
    }

    const blob = new Blob([response.data], { type: mimeType })
    const contentDisposition = response.headers['content-disposition']
    const fileName = extractFileName(contentDisposition, `${name}_제안서`)

    downloadFile(blob, fileName)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error('API Error:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        headers: err.response?.headers,
        data: err.response?.data,
      })
      throw new Error(`제안서 다운로드 실패: ${err.response?.status} ${err.response?.statusText}`)
    }
    throw err
  }
}

export default getProposalDownload
