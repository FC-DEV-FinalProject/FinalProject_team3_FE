import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { STEPS } from '@/app/(landing)/signup/_ui/step'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import useStepHistoryStore from '@/shared/stores/use-step-history-store'

import styles from './styles.module.scss'

/* eslint-disable react-hooks/exhaustive-deps */

const cx = classNames.bind(styles)

interface Props {
  children: React.ReactNode
  step: number
  pathname: string
  icon: React.ElementType
  prevStep: number
}

const StepItem = ({ children, step, pathname, icon: Icon, prevStep }: Props) => {
  const currentPath = usePathname()
  const currentPathIdx = STEPS.findIndex((step) => step.path === currentPath)
  const stepHistory = useStepHistoryStore((state) => state.stepHistory)
  const [isNextStep, setIsNextStep] = useState(false)
  const [isPrevStep, setIsPrev] = useState(false)
  const [isFixedStep, setIsFixedStep] = useState(() => currentPathIdx - step >= 0)

  useEffect(() => {
    if (currentPathIdx - (prevStep - 1) > 0) {
      handleNextStep()
    } else if (stepHistory.length !== 0) {
      handlePrevStep()
    }
  }, [currentPath])

  const stepIdx = step - 1

  const handleNextStep = () => {
    if (currentPathIdx > stepIdx) {
      setIsNextStep(true)
      if (currentPathIdx - step > 0) {
        setIsFixedStep(true)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentPathIdx === stepIdx) {
      setIsPrev(true)
    }
    if (currentPathIdx - stepIdx > 0) {
      setIsNextStep(true)
      setIsFixedStep(true)
    }
  }

  const isCurrentStep = currentPath === pathname

  const stepCondition = {
    current: isCurrentStep,
    next: isNextStep,
    prev: isPrevStep,
    fix: isFixedStep,
  }

  return (
    <>
      <div className={cx('step-item')}>
        <div className={cx('circle', stepCondition)}>
          {isFixedStep || isCurrentStep || isNextStep ? <Icon className={cx('icon')} /> : step}
        </div>
        <p className={cx(stepCondition)}>{children}</p>
      </div>
      {pathname !== PATH.SIGN_UP_COMPLETE && <div className={cx('bar', stepCondition)}> </div>}
    </>
  )
}

export default StepItem
