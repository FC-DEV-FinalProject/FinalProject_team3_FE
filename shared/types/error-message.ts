import { ERROR_MESSAGES } from '../constants/error-messages'

export type ErrorMessageType = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES]
