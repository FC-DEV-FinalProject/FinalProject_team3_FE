import { useEffect, useRef, useState } from 'react'

const useDelayedLoading = (isLoading: boolean, minLoadingTime: number = 500) => {
  const [isDelayedLoading, setDelayedLoading] = useState(isLoading)
  const loadingStartTime = useRef<number | null>(null)

  useEffect(() => {
    if (isLoading) {
      loadingStartTime.current = Date.now()
      setDelayedLoading(true)
      return
    }

    if (!isLoading && loadingStartTime.current) {
      const loadingDuration = Date.now() - loadingStartTime.current

      if (loadingDuration < minLoadingTime) {
        const remainingTime = minLoadingTime - loadingDuration
        const timer = setTimeout(() => {
          setDelayedLoading(false)
        }, remainingTime)
        return () => clearTimeout(timer)
      } else {
        setDelayedLoading(false)
      }
    }
  }, [isLoading, minLoadingTime])

  return isDelayedLoading
}

export default useDelayedLoading
