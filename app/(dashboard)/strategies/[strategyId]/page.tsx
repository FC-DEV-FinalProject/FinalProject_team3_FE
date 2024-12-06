'use client'

import React, { Suspense } from 'react'

import dynamic from 'next/dynamic'

import useModal from '@/shared/hooks/custom/use-modal'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import BackHeader from '@/shared/ui/header/back-header'
import SubscribeCheckModal from '@/shared/ui/modal/subscribe-check-modal'
import Title from '@/shared/ui/title'

import { InformationModel, TitleType } from '../../_ui/details-side-item'
import SideSkeleton from '../../_ui/details-side-item/side-skeleton'
import useGetSubscribe from '../_hooks/query/use-get-subscribe'
import SideContainer from '../_ui/side-container'
import useGetDetailsInformationData from './_hooks/query/use-get-details-information-data'
import DetailsLoading from './_ui/details-skeleton'

const DetailsInformation = React.lazy(() => import('../../_ui/details-information'))
const AnalysisContainer = React.lazy(() => import('@/app/(dashboard)/_ui/analysis-container'))
const ReviewContainer = React.lazy(() => import('./_ui/review-container'))
const SubscriberItem = React.lazy(() => import('@/app/(dashboard)/_ui/subscriber-item'))
const DetailsSideItem = React.lazy(() => import('../../_ui/details-side-item'))

const DynamicSkeleton = dynamic(() => import('./_ui/details-skeleton'), {
  loading: () => <DetailsLoading />,
  ssr: false,
})

const DynamicSideSkeleton = dynamic(() => import('../../_ui/details-side-item/side-skeleton'), {
  loading: () => <SideSkeleton />,
  ssr: false,
})

export type InformationType = { title: TitleType; data: string | number } | InformationModel[]

const StrategyDetailPage = ({ params }: { params: { strategyId: string } }) => {
  const strategyNumber = parseInt(params.strategyId)
  const user = useAuthStore((state) => state.user)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { mutate } = useGetSubscribe()
  const { refetch, data } = useGetDetailsInformationData({
    strategyId: strategyNumber,
  })

  const { detailsSideData, detailsInformationData: information } = data || {}

  const handleSubscribe = () => {
    mutate(strategyNumber, {
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
      <BackHeader label={'목록으로 돌아가기'} />
      <Title label={'전략 상세보기'} />
      <Suspense fallback={<DynamicSkeleton />}>
        {information && (
          <>
            <DetailsInformation information={information} strategyId={strategyNumber} />
            <AnalysisContainer strategyId={strategyNumber} />
            <ReviewContainer strategyId={strategyNumber} />
          </>
        )}
      </Suspense>
      <SideContainer>
        <Suspense fallback={<DynamicSideSkeleton />}>
          {information && (
            <>
              <SubscriberItem
                isMyStrategy={user?.nickname === information.nickname}
                isSubscribed={information?.isSubscribed}
                subscribers={information?.subscriptionCount}
                onClick={openModal}
              />
              {hasDetailsSideData?.[0] &&
                detailsSideData?.map((data, idx) => (
                  <div key={`${data}_${idx}`}>
                    <DetailsSideItem
                      strategyId={strategyNumber}
                      information={data}
                      isMyStrategy={user?.nickname === information.nickname}
                      strategyName={information.strategyName}
                    />
                  </div>
                ))}
            </>
          )}
        </Suspense>
      </SideContainer>
      {information && (
        <SubscribeCheckModal
          isSubscribing={information?.isSubscribed}
          isModalOpen={isModalOpen}
          onCloseModal={closeModal}
          onChange={handleSubscribe}
        />
      )}
    </>
  )
}

export default StrategyDetailPage
