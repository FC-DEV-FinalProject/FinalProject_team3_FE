'use client'

import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import StepItem from '@/app/(landing)/signup/_ui/step/step-item'
import { BarsIcon, CheckIcon, PencilIcon, ProfileIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import useStepHistoryStore from '@/shared/stores/use-step-history-store'

import styles from './styles.module.scss'

/* eslint-disable react-hooks/exhaustive-deps */

const cx = classNames.bind(styles)

export const STEPS = [
  { path: PATH.SIGN_UP_USER_TYPE, icon: ProfileIcon, step: 1, label: '회원 선택' },
  { path: PATH.SIGN_UP_TERMS_OF_USE, icon: BarsIcon, step: 2, label: '약관 동의' },
  { path: PATH.SIGN_UP_INFORMATION, icon: PencilIcon, step: 3, label: '정보 입력' },
  { path: PATH.SIGN_UP_COMPLETE, icon: CheckIcon, step: 4, label: '가입 완료' },
]

const Step = () => {
  const stepHistory = useStepHistoryStore((state) => state.stepHistory)
  const { addStep, removeStep } = useStepHistoryStore((state) => state.actions)
  const currentPath = usePathname()

  useEffect(() => {
    handleStepHistoryControl()
  }, [])

  const handleStepHistoryControl = () => {
    addStep(currentPath)
    if (stepHistory.length > 1) {
      removeStep()
    }
  }

  let prevStep = STEPS[STEPS.findIndex((step) => step.path === stepHistory[0])]?.step
  const currentStep = STEPS[STEPS.findIndex((step) => step.path === stepHistory[1])]?.step
  if (currentStep === 1) {
    prevStep = 0
  }

  return (
    <div className={cx('step')}>
      {STEPS.map((step) => (
        <StepItem
          key={step.path}
          step={step.step}
          pathname={step.path}
          icon={step.icon}
          prevStep={prevStep}
        >
          {step.label}
        </StepItem>
      ))}
    </div>
  )
}

export default Step
