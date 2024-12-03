export const PANEL_MAPPING: { [key: string]: Record<string, string> } = {
  operationCycles: {
    데이: 'DAY',
    포지션: 'POSITION',
  },
  durations: {
    '1년 이하': 'ONE_YEAR_OR_LESS',
    '1년 ~ 2년': 'ONE_TO_TWO_YEARS',
    '2년 ~ 3년': 'TWO_TO_THREE_YEARS',
    '3년 이상': 'THREE_YEARS_OR_MORE',
  },
  profitRanges: {
    '10% 이하': 'UNDER_10_PERCENT',
    '10% ~ 20%': 'BETWEEN_10_AND_20',
    '20% ~ 30%': 'BETWEEN_20_AND_30',
    '30% 이상': 'OVER_30_PERCENT',
  },
}
