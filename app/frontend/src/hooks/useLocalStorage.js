import { useState, useEffect } from 'react'

function getStorageValue (key, defaultValue) {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(key)
    try {
      const initial = saved ? JSON.parse(saved) : undefined
      return initial ?? defaultValue
    } catch (e) {
      console.error('Failed to parse stored value:', e)
      return defaultValue
    }
  }
  return defaultValue
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.error('Failed to set stored value:', e)
      }
    }
  }, [key, value])

  return [value, setValue]
}
