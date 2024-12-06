import { ComponentType, ReactNode, Suspense } from 'react'

function withSuspense<P>(Component: ComponentType<P>, fallback: ReactNode = <div>Loading...</div>) {
  const WrappedComponent = (props: P & JSX.IntrinsicAttributes) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  )

  WrappedComponent.displayName = `withSuspense(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}

export default withSuspense
