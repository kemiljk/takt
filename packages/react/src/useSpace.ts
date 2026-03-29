'use client'
import { useMemo } from 'react'
import { useTakt } from './useTakt'

export function useSpace(key: string | number) {
  const config = useTakt()
  return useMemo(() => {
    if (typeof key === 'number') {
      const px = config.spacing.rhythmUnit * key
      const rem = `${(px / 16).toFixed(3)}rem`
      return { value: key, px, rem, clamp: rem, style: { gap: rem } }
    }
    const entry = config.spacing.scale[key]
    if (!entry) throw new Error(`Spacing key "${key}" not found`)
    return {
      value: entry.multiplier,
      px: entry.px,
      rem: entry.rem,
      clamp: entry.clamp,
      style: { gap: entry.clamp },
    }
  }, [config, key])
}
