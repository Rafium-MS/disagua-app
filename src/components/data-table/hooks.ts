import { useMemo } from 'react'

export function useSortedData<T>(data: T[], sortBy: (item: T) => string | number) {
  return useMemo(() => [...data].sort((a, b) => {
    const av = sortBy(a)
    const bv = sortBy(b)
    if (av < bv) return -1
    if (av > bv) return 1
    return 0
  }), [data, sortBy])
}
