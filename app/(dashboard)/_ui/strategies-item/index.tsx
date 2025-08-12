import { useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import useModal from '@/shared/hooks/custom/use-modal'
import { StrategiesModel } from '@/shared/types/strategy-data'
import { Button } from '@/shared/ui/button'
import { LinkButton } from '@/shared/ui/link-button'
import StrategyDeleteModal from '@/shared/ui/modal/strategy-delete-modal'
import { formatNumber } from '@/shared/utils/format'

import AreaChart from './area-chart'
import StrategiesSummary from './strategies-summary'
import styles from './styles.module.scss'
import Subscribe from './subscribe'

const cx = classNames.bind(styles)

interface Props {
  strategiesData: StrategiesModel
  type?: 'default' | 'my'
}

const StrategiesItem = ({ strategiesData: data, type = 'default' }: Props) => {
  const router = useRouter()
  const {
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal()

  const handleRouter = () => {
    router.push(`${PATH.STRATEGIES}/${data.strategyId}`)
  }

  return (
    <>
      <button className={cx('container', type)} onClick={handleRouter}>
        <StrategiesSummary
          iconUrls={[data.tradeTypeIconUrl, ...(data.stockTypeInfo?.stockTypeIconUrls ?? [])]}
          iconNames={[data.tradeTypeName, ...(data.stockTypeInfo?.stockTypeNames ?? [])]}
          title={data.strategyName}
          profile={{
            traderImage: data.traderImgUrl,
            nickname: data.nickname,
          }}
          subscriptionCount={data.subscriptionCount}
          averageRating={data.averageRating}
          totalReview={data.totalReviews}
        />
        <AreaChart profitRateChartData={data.profitRateChartData} />
        <div className={cx('mdd')}>
          <p>{formatNumber(data.mdd)}</p>
        </div>
        <div className={cx('sm-score')}>
          <p>{data.smScore.toFixed(1)}</p>
        </div>
        <div className={cx('profit')}>
          <span>누적 수익률</span>
          <p>{data.cumulativeProfitRate.toFixed(2)}%</p>
          <span>최근 1년 수익률</span>
          <p>
            {data.recentYearProfitLossRate ? data.recentYearProfitLossRate.toFixed(2) + '%' : '-'}
          </p>
        </div>
        {type === 'default' && (
          <div className={cx('subscribe')}>
            <Subscribe
              subscriptionStatus={data.isSubscribed}
              strategyId={data.strategyId}
              traderName={data.nickname}
            />
          </div>
        )}
        {type === 'my' && (
          <>
            <div className={cx('public')}>
              <p>{data.isPublic === 'PUBLIC' ? '공개' : '비공개'}</p>
            </div>
            <div className={cx('manage-buttons')}>
              <LinkButton
                size="small"
                variant="filled"
                href={`/my/strategies/manage/${data.strategyId}`}
                className={cx('manage-button')}
                onClick={(e) => e.stopPropagation()}
              >
                관리
              </LinkButton>
              <Button
                size="small"
                variant="outline"
                className={cx('manage-button')}
                onClick={(e) => {
                  e.stopPropagation()
                  openDeleteModal()
                }}
              >
                삭제
              </Button>
            </div>
          </>
        )}
      </button>
      <StrategyDeleteModal
        isModalOpen={isDeleteModalOpen}
        onCloseModal={closeDeleteModal}
        strategyId={data.strategyId}
      />
    </>
  )
}

export default StrategiesItem
