export interface TradeResponseModel {
  isSuccess: boolean
  message: string
  result: Array<{
    tradeTypeId: number
    tradeName: string
    activateState: boolean
    tradeTypeIconUrl: string
  }>
}
