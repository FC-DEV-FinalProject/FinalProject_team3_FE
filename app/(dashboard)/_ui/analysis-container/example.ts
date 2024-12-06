export const analysisChartData = {
  dates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06'],
  data: {
    CURRENT_DRAWDOWN: [2000, 5660, 4000, 9000, 7000, 10000],
    PRINCIPAL: [50000, 60000, 80000, 70000, 80000, 90000],
  },
}

export const statisticsData = {
  assetManagement: {
    balance: 896217437, // 잔고
    cumulativeTransactionAmount: 896217437, // 누적 거래 금액
    principal: 238704360, // 원금
    operationPeriod: '2년 4월', // 운용 기간
    startDate: '2012-10-11', // 시작 일자
    endDate: '2015-03-11', // 종료 일자 (endDate)
    daysSincePeakUpdate: 513, // 고점 갱신 후 경과일
  },
  profitLoss: {
    cumulativeProfitAmount: 247525031, // 누적 수익 금액
    cumulativeProfitRate: 49.24, // 누적 수익률
    maxCumulativeProfitAmount: 247525031, // 최대 누적 수익 금액
    maxCumulativeProfitRate: 49.24, // 최대 누적 수익률
    averageProfitLossAmount: 336311, // 평균 손익 금액
    averageProfitLossRate: 6, // 평균 손익률
    maxDailyProfitAmount: 25257250, // 최대 일 수익 금액
    maxDailyProfitRate: 3.985, // 최대 일 수익률
    maxDailyLossAmount: -17465050, // 최대 일 손실 금액
    maxDailyLossRate: -3.95, // 최대 일 손실률
    roa: 453, // 자산 수익률 (Return on Assets)
    profitFactor: 1.48, // Profit Factor
  },
  ddMddInfo: {
    currentDrawdown: 0, // 현재 자본 인하 금액
    currentDrawdownRate: 0, // 현재 자본 인하율
    maxDrawdown: -54832778, // 최대 자본 인하 금액
    maxDrawdownRate: -13.98, // 최대 자본 인하율
  },
  tradingInfo: {
    totalTradeDays: 736, // 총 거래 일수
    totalProfitableDays: 508, // 총 이익 일수
    totalLossDays: 228, // 총 손실 일수
    currentConsecutiveLossDays: 6, // 현재 연속 손실 일수
    maxConsecutiveProfitDays: 22, // 최대 연속 이익 일수
    maxConsecutiveLossDays: 8, // 최대 연속 손실 일수
    winRate: 69, // 승률
  },
}

export const tableBody = [
  {
    date: '2015-03-12', // 날짜
    principal: 100000000, // 원금
    transaction: 0, // 입출금
    dailyProfitLoss: 332410, // 일 손익
    dailyProfitLossRate: 0.33, // 일 수익률
    cumulativeProfitLoss: 302280, // 누적 손익
    cumulativeProfitLossRate: 0.3, // 누적 수익률
  },
  {
    date: '2015-03-13',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-14',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-15',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-16',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-17',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-18',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
  {
    date: '2015-03-19',
    principal: 100000000,
    transaction: 0,
    dailyProfitLoss: 332410,
    dailyProfitLossRate: 0.33,
    cumulativeProfitLoss: 302280,
    cumulativeProfitLossRate: 0.3,
  },
]
