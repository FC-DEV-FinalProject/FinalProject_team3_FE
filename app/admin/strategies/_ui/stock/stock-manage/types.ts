interface StockResponseBaseModel<T extends boolean> {
  isSuccess: T
  message: string
  code: T extends false ? number : never
}

export interface StockResponseModel extends StockResponseBaseModel<boolean> {
  result: {
    content: Array<{
      stockTypeId: number
      stockTypeName: string
      activateState: boolean
      stockTypeIconUrl: string
    }>
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}

// eslint-disable-next-line
export interface ToggleStockActiveStateResponseModel extends StockResponseBaseModel<boolean> {}

export interface PresignedUrlResponseModel extends StockResponseBaseModel<boolean> {
  result: {
    presignedUrl: string
  }
}
