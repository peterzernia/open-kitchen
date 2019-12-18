import * as React from 'react'

/* eslint import/prefer-default-export: 0 */
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
