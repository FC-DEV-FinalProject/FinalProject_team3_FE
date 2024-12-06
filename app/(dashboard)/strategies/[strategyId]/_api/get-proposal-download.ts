import axiosInstance from '@/shared/api/axios'

import { downloadFile } from './helper-download-file'

const getProposalDownload = async (strategyId: number, name: string) => {
  try {
    const response = await axiosInstance.get(`/api/my-strategies/${strategyId}/download-proposal`, {
      responseType: 'blob',
    })
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    const contentDisposition = response.headers['content-disposition']

    downloadFile(blob, contentDisposition, `${name}_제안서`)
  } catch (err) {
    console.error(err)
  }
}

export default getProposalDownload
