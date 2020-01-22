import * as React from 'react'

type Dimensions = {
  width: number;
  height: number;
}

export const useDebounce = (value: string, delay: number): string => {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return (): void => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounced
}

export const useWindowDimensions = (): Dimensions => {
  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = React.useCallback((): Dimensions => {
    const width = hasWindow ? window.innerWidth : 0
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height,
    }
  }, [hasWindow])

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions())

  React.useEffect(() => {
    if (hasWindow) {
      const handleResize = (): void => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return (): void => window.removeEventListener('resize', handleResize)
    }
    return undefined
  }, [hasWindow, getWindowDimensions])

  return windowDimensions
}
