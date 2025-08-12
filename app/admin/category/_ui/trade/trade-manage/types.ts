interface TradeResponseBaseModel<T extends boolean> {
  isSuccess: T
  message: string
  code: T extends false ? number : never
}

export interface TradeResponseModel extends TradeResponseBaseModel<boolean> {
  result: Array<{
    tradeTypeId: number
    tradeName: string
    activateState: boolean
    tradeTypeIconUrl: string
  }>
}

// eslint-disable-next-line
export interface ToggleTradeActiveStateResponseModel extends TradeResponseBaseModel<boolean> {}

// eslint-disable-next-line
export interface DeleteInactiveTradeResponseModel extends TradeResponseBaseModel<boolean> {}

export interface PresignedUrlResponseModel extends TradeResponseBaseModel<boolean> {
  result: {
    presignedUrl: string
  }
}
