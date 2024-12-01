import { HttpResponse, http } from 'msw'

import { StrategyDetailsInformationModel } from '@/shared/types/strategy-data'

export const strategiesDetailsInformationMockData: StrategyDetailsInformationModel[] = [
  {
    strategyId: 1,
    strategyName: 'Dynamic ETF 전략',
    stockTypeInfo: {
      stockTypeIconUrls: ['/images/stock.png'],
      stockTypeNames: ['해외지수선물'],
    },
    tradeTypeIconUrl: '/images/trade.png',
    tradeTypeName: '자동',
    operationCycle: 'DAY',
    strategyDescription: '전략 설명 예시',
    cumulativeProfitRate: 4924.0,
    maxDrawdownRate: -13068.0,
    averageProfitLossRate: 600.0,
    profitFactor: 148.0,
    winRate: 0.69,
    subscriptionCount: 100,
    traderImgUrl: '',
    nickname: 'AlphaTrader',
    minimumInvestmentAmount: '1억~ 2억',
    initialInvestment: '10,000,000',
    kpRatio: 0.513,
    smScore: 72.1,
    finalProfitLossDate: '2024.03.11',
    createdAt: '2024.01.11',
    isSubscribed: true,
  },
  {
    strategyId: 2,
    strategyName: '고수익 ETF',
    stockTypeInfo: {
      stockTypeIconUrls: ['/images/stock.png'],
      stockTypeNames: ['해외지수선물'],
    },
    tradeTypeIconUrl: '/images/trade.png',
    tradeTypeName: '자동',
    operationCycle: 'DAY',
    strategyDescription: '전략 설명 예시',
    cumulativeProfitRate: 4924.0,
    maxDrawdownRate: -13068.0,
    averageProfitLossRate: 600.0,
    profitFactor: 148.0,
    winRate: 0.69,
    subscriptionCount: 100,
    traderImgUrl: '',
    nickname: 'BetaTrader',
    minimumInvestmentAmount: '1억~ 2억',
    initialInvestment: '10,000,000',
    kpRatio: 0.513,
    smScore: 65.4,
    finalProfitLossDate: '2024.03.11',
    createdAt: '2024.01.11',
    isSubscribed: true,
  },
  {
    strategyId: 3,
    strategyName: 'Futures Pro',
    stockTypeInfo: {
      stockTypeIconUrls: ['/images/stock.png'],
      stockTypeNames: ['해외지수선물'],
    },
    tradeTypeIconUrl: '/images/trade.png',
    tradeTypeName: '자동',
    operationCycle: 'DAY',
    strategyDescription: '전략 설명 예시',
    cumulativeProfitRate: 4924.0,
    maxDrawdownRate: -13068.0,
    averageProfitLossRate: 600.0,
    profitFactor: 148.0,
    winRate: 0.69,
    subscriptionCount: 100,
    traderImgUrl: '',
    nickname: 'Gamma',
    minimumInvestmentAmount: '1억~ 2억',
    initialInvestment: '10,000,000',
    kpRatio: 0.513,
    smScore: 79.6,
    finalProfitLossDate: '2024.03.11',
    createdAt: '2024.01.11',
    isSubscribed: true,
  },
  {
    strategyId: 4,
    strategyName: '월별 수익 전략',
    stockTypeInfo: {
      stockTypeIconUrls: ['/images/stock.png'],
      stockTypeNames: ['해외지수선물'],
    },
    tradeTypeIconUrl: '/images/trade.png',
    tradeTypeName: '자동',
    operationCycle: 'DAY',
    strategyDescription: '전략 설명 예시',
    cumulativeProfitRate: 4924.0,
    maxDrawdownRate: -13068.0,
    averageProfitLossRate: 600.0,
    profitFactor: 148.0,
    winRate: 0.69,
    subscriptionCount: 100,
    traderImgUrl: '',
    nickname: 'user1',
    minimumInvestmentAmount: '1억~ 2억',
    initialInvestment: '10,000,000',
    kpRatio: 0.513,
    smScore: 68.4,
    finalProfitLossDate: '2024.03.11',
    createdAt: '2024.01.11',
    isSubscribed: true,
  },
  {
    strategyId: 5,
    strategyName: '리스크 관리 전략',
    stockTypeInfo: {
      stockTypeIconUrls: ['/images/stock.png'],
      stockTypeNames: ['해외지수선물'],
    },
    tradeTypeIconUrl: '/images/trade.png',
    tradeTypeName: '자동',
    operationCycle: 'DAY',
    strategyDescription: '전략 설명 예시',
    cumulativeProfitRate: 4924.0,
    maxDrawdownRate: -13068.0,
    averageProfitLossRate: 600.0,
    profitFactor: 148.0,
    winRate: 0.69,
    subscriptionCount: 100,
    traderImgUrl: '',
    nickname: 'DeltaOne',
    minimumInvestmentAmount: '1억~ 2억',
    initialInvestment: '10,000,000',
    kpRatio: 0.513,
    smScore: 62.3,
    finalProfitLossDate: '2024.03.11',
    createdAt: '2024.01.11',
    isSubscribed: true,
  },
]

const reviewData = [
  {
    strategyId: 1,
    averageRating: 3.8,
    reviewCount: 4,
    reviews: {
      content: [
        {
          reviewId: 85,
          nickname: '김아무개씨',
          content: 'good strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:31:44',
          starRating: 4,
          isOwner: false,
        },
        {
          reviewId: 84,
          nickname: 'user2',
          content: 'good strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:24:55',
          starRating: 5,
          isOwner: false,
        },
        {
          reviewId: 83,
          nickname: 'user3',
          content: 'good strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:24:38',
          starRating: 5,
          isOwner: false,
        },
        {
          reviewId: 82,
          nickname: 'user4',
          content: 'bad strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:24:09',
          starRating: 1,
          isOwner: false,
        },
        {
          reviewId: 81,
          nickname: 'user4',
          content: 'bad strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:24:09',
          starRating: 1,
          isOwner: false,
        },
        {
          reviewId: 80,
          nickname: 'user4',
          content: 'bad strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:24:09',
          starRating: 1,
          isOwner: false,
        },
        {
          reviewId: 79,
          nickname: 'user4',
          content: 'bad strategy!',
          imageUrl: '',
          createdAt: '2024-11-17 19:24:09',
          starRating: 1,
          isOwner: false,
        },
      ],
      totalElements: 7,
    },
  },
  {
    strategyId: 2,
    averageRating: 3.8,
    reviewCount: 4,
    reviews: {
      content: [
        {
          reviewId: 85,
          nickname: '김아무개씨',
          content: 'good strategy!',
          imageUrl: '/images/profiles/user1.jpg',
          createdAt: '2024-11-17 19:31:44',
          starRating: 4,
          isOwner: false,
        },
        {
          reviewId: 84,
          nickname: 'user2',
          content: 'good strategy!',
          imageUrl: '/images/profiles/user1.jpg',
          createdAt: '2024-11-17 19:24:55',
          starRating: 5,
          isOwner: false,
        },
        {
          reviewId: 83,
          nickname: 'user3',
          content: 'good strategy!',
          imageUrl: '/images/profiles/user1.jpg',
          createdAt: '2024-11-17 19:24:38',
          starRating: 5,
          isOwner: false,
        },
        {
          reviewId: 82,
          nickname: 'user4',
          content: 'bad strategy!',
          imageUrl: '/images/profiles/user1.jpg',
          createdAt: '2024-11-17 19:24:09',
          starRating: 1,
          isOwner: false,
        },
      ],
      totalElements: 4,
    },
  },
]

export const strategyDetailsHandlers = [
  http.get('/api/strategies/:strategyId', ({ params }) => {
    const { strategyId } = params
    const strategyData = strategiesDetailsInformationMockData.find(
      (item) => item.strategyId === Number(strategyId)
    )
    if (strategyData) {
      return HttpResponse.json({ ...strategyData })
    }
    return HttpResponse.json(
      {
        isSuccess: false,
        message: '전략을 찾을 수 없습니다.',
        code: 4002,
      },
      { status: 400 }
    )
  }),

  http.get('/api/strategies/:strategyId/reviews', ({ params, request }) => {
    const { strategyId } = params
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const size = parseInt(url.searchParams.get('size') || '4')

    const reviewDataForStrategy = reviewData.find((item) => item.strategyId === Number(strategyId))
    if (!isNaN(page) && !isNaN(size) && reviewDataForStrategy) {
      const { content, totalElements } = reviewDataForStrategy.reviews
      const slicedContent = content.slice(size * (page - 1), size * (page - 1) + size)

      return HttpResponse.json({
        strategyId,
        averageRating: reviewDataForStrategy.averageRating,
        reviewCount: reviewDataForStrategy.reviewCount,
        reviews: {
          content: slicedContent,
          totalElements,
        },
      })
    }

    return HttpResponse.json(
      {
        isSuccess: false,
        message: '전략의 리뷰를 찾을 수 없습니다.',
        code: 4002,
      },
      { status: 400 }
    )
  }),
]
