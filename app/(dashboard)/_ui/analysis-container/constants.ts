export const CHART_SELECT_OPTIONS = {
  BALANCE: '잔고',
  PRINCIPAL: '원금',
  CUMULATIVE_TRANSACTION_AMOUNT: '누적 입출 금액',
  TRANSACTION: '일별 입출 금액',
  DAILY_PROFIT_LOSS: '일 손익 금액',
  DAILY_PROFIT_LOSS_RATE: '일 손익률',
  CUMULATIVE_PROFIT_LOSS: '누적 수익 금액',
  CUMULATIVE_PROFIT_LOSS_RATE: '누적 수익률',
  CURRENT_DRAWDOWN: '현재 자본 인하 금액',
  CURRENT_DRAWDOWN_RATE: '현재 자본 인하율',
  AVERAGE_PROFIT_LOSS: '평균 손익 금액',
  AVERAGE_PROFIT_LOSS_RATIO: '평균 손익률',
  WIN_RATE: '승률',
  PROFIT_FACTOR: 'Profit Factor',
  ROA: 'ROA',
  TOTAL_PROFIT: '총 이익',
  TOTAL_LOSS: '총 손실',
} as const

export const DAILY_TABLE_HEADER = [
  '날짜',
  '원금',
  '입출금',
  '일 손익',
  '일 손익률',
  '누적 손익',
  '누적 수익률',
]

export const MONTHLY_TABLE_HEADER = [
  '날짜',
  '원금',
  '입출금',
  '월 손익',
  '월 손익률',
  '누적 손익',
  '누적 수익률',
]
