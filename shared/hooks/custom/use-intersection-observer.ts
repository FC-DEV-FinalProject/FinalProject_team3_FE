import { RefObject, useEffect } from 'react'

interface UseIntersectionObserverProps {
  ref: RefObject<HTMLElement>
  onIntersect: (entry: IntersectionObserverEntry) => void
  threshold?: number
  rootMargin?: string
}

export const useIntersectionObserver = ({
  ref,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
}: UseIntersectionObserverProps) => {
  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => onIntersect(entry))
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, threshold, rootMargin, onIntersect])
}
