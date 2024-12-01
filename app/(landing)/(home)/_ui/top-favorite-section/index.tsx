'use client'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { LinkButton } from '@/shared/ui/link-button'

import useGetTopRanking from '../../_hooks/query/use-get-top-ranking'
import HomeSubtitle from '../home-subtitle'
import TopFavoriteCard from '../top-strategy-card/top-favorite-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TopFavoriteSection = () => {
  const { data: favoriteStrategies } = useGetTopRanking()

  return (
    <section className={cx('section-container')}>
      <HomeSubtitle>
        인베스트메틱에서 제공하는 <br />
        인기 있는 전략을 확인해보세요!
      </HomeSubtitle>

      <ul className={cx('strategy-wrapper')}>
        {favoriteStrategies &&
          favoriteStrategies.map((strategy, idx) => (
            <li key={strategy.strategyId}>
              <TopFavoriteCard
                ranking={idx + 1}
                nickname={strategy.nickname}
                title={strategy.strategyName}
                chartData={strategy.profitRateChartData}
                percentageChange={strategy.cumulativeProfitRate}
                subscriptionCount={strategy.subscriptionCount}
                averageRating={strategy.averageRating}
                reviewCount={strategy.totalReviews}
              />
            </li>
          ))}
      </ul>

      <LinkButton href={PATH.STRATEGIES} variant="filled">
        전략랭킹 더보기
      </LinkButton>
    </section>
  )
}

export default TopFavoriteSection
