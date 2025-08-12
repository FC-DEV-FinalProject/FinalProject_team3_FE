import axiosInstance from 'shared/api/axios'

interface UploadAccountImagesRequestModel {
  fileName: string
  fileSize: number
  title: string
}

interface UploadAccountImagesResponseModel {
  isSuccess: boolean
  message: string
  result: {
    presignedUrls: {
      presignedUrl: string
    }[]
  }
  code: number
}

interface DeleteAccountImagesRequestModel {
  strategyId: number
  imageIds: number[]
}

interface DeleteAccountImagesResponseModel {
  isSuccess: boolean
  message: string
  code: number
}

export const uploadAccountImages = async (
  strategyId: number,
  data: UploadAccountImagesRequestModel[]
): Promise<UploadAccountImagesResponseModel> => {
  const response = await axiosInstance.post(`/api/my-strategies/${strategyId}/account-images`, data)
  return response.data
}

export const deleteAccountImages = async ({
  strategyId,
  imageIds,
}: DeleteAccountImagesRequestModel): Promise<DeleteAccountImagesResponseModel> => {
  const response = await axiosInstance.post(
    `/api/my-strategies/${strategyId}/delete-account-images`,
    imageIds
  )
  return response.data
}
