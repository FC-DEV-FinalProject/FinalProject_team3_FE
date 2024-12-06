export interface APIResponseBaseModel<T extends boolean> {
  isSuccess: T
  message: string
  code: T extends false ? number : never
}
