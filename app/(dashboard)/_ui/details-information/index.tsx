import classNames from 'classnames/bind'

import { StrategyDetailsInformationModel } from '@/shared/types/strategy-data'

import StrategyIntroduction from '../introduction'
import InvestInformation from './invest-information'
import Percentage from './percentage'
import StrategyNameBox from './strategy-name-box'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  information: StrategyDetailsInformationModel
  type?: 'default' | 'my'
  isEditable?: boolean
  error?: Error
}

const DetailsInformation = ({
  strategyId,
  information,
  type = 'default',
  error,
  isEditable = false,
}: Props) => {
  const percentageToArray = [
    { percent: information.cumulativeProfitRate, label: '누적 수익률' },
    { percent: information.maxDrawdownRate, label: '최대 자본 인하율' },
    { percent: information.averageProfitLossRate, label: '평균 손익률' },
    { percent: information.profitFactor, label: 'Profit Factor' },
    { percent: information.winRate, label: '승률' },
  ]
  if (!information) return null
  return (
    <>
      <div className={cx('information-top')}>
        <StrategyNameBox
          error={error}
          iconUrls={[
            information.tradeTypeIconUrl,
            ...(information.stockTypeInfo?.stockTypeIconUrls ?? []),
          ]}
          iconNames={[
            information.tradeTypeName,
            ...(information.stockTypeInfo?.stockTypeNames ?? []),
          ]}
          name={information.strategyName}
          strategyId={strategyId}
          isEditable={isEditable}
          hasProposal={information.hasProposal}
        />
        <InvestInformation
          stock={information.stockTypeInfo?.stockTypeNames || []}
          trade={information.tradeTypeName}
          cycle={information.operationCycle}
          isEditable={isEditable}
        />
      </div>
      <StrategyIntroduction content={information.strategyDescription} isEditable={isEditable} />
      {type === 'default' && (
        <div className={cx('percentage-container')}>
          {percentageToArray.map((data) => (
            <Percentage key={data.label} percent={data.percent} label={data.label} />
          ))}
        </div>
      )}
    </>
  )
}

export default DetailsInformation
