import axiosInstance from '@/shared/api/axios'

const uploadFileWithPresignedUrl = async (presignedUrl: string, file: File) => {
  await axiosInstance.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}

export default uploadFileWithPresignedUrl
