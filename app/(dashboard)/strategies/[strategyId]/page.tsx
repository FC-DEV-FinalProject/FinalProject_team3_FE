'use client'

import AnalysisContainer from '@/app/(dashboard)/_ui/analysis-container'
import SubscriberItem from '@/app/(dashboard)/_ui/subscriber-item'

import useModal from '@/shared/hooks/custom/use-modal'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import BackHeader from '@/shared/ui/header/back-header'
import SubscribeCheckModal from '@/shared/ui/modal/subscribe-check-modal'
import Title from '@/shared/ui/title'

import DetailsInformation from '../../_ui/details-information'
import DetailsSideItem, { InformationModel, TitleType } from '../../_ui/details-side-item'
import useGetSubscribe from '../_hooks/query/use-get-subscribe'
import SideContainer from '../_ui/side-container'
import useGetDetailsInformationData from './_hooks/query/use-get-details-information-data'
import ReviewContainer from './_ui/review-container'

export type InformationType = { title: TitleType; data: string | number } | InformationModel[]

const StrategyDetailPage = ({ params }: { params: { strategyId: number } }) => {
  const user = useAuthStore((state) => state.user)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { mutate } = useGetSubscribe()
  const { refetch, data } = useGetDetailsInformationData({
    strategyId: params.strategyId,
  })

  const { detailsSideData, detailsInformationData: information } = data || {}

  const handleSubscribe = () => {
    mutate(params.strategyId, {
      onSuccess: () => {
        closeModal()
        refetch()
      },
    })
  }
  const handleUnsubscribe = () => {
    mutate(params.strategyId, {
      onSuccess: () => {
        closeModal()
        refetch()
      },
    })
  }

  const hasDetailsSideData = detailsSideData?.map((data) => {
    if (!Array.isArray(data)) return data.data !== undefined
  })

  return (
    <>
      <div>
        <BackHeader label={'목록으로 돌아가기'} />
        <Title label={'전략 상세보기'} />
        {information && <DetailsInformation information={information} />}
        <AnalysisContainer strategyId={params.strategyId} />
        <ReviewContainer strategyId={params.strategyId} />
        <SideContainer>
          {information && (
            <SubscriberItem
              isMyStrategy={user?.nickname === information.nickname}
              isSubscribed={information?.isSubscribed}
              subscribers={information?.subscriptionCount}
              onClick={openModal}
            />
          )}
          {information &&
            hasDetailsSideData?.[0] &&
            detailsSideData?.map((data, idx) => (
              <div key={`${data}_${idx}`}>
                <DetailsSideItem
                  information={data}
                  isMyStrategy={user?.nickname === information.nickname}
                />
              </div>
            ))}
        </SideContainer>
      </div>
      {isModalOpen && information && (
        <SubscribeCheckModal
          isSubscribing={information?.isSubscribed}
          isModalOpen={isModalOpen}
          closeModal={handleUnsubscribe}
          onChange={handleSubscribe}
        />
      )}
    </>
  )
}
export default StrategyDetailPage
