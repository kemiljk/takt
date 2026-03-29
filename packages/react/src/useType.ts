'use client'
import { useMemo } from 'react'
import { useTakt } from './useTakt'

export function useType(stepName: string) {
  const config = useTakt()
  return useMemo(() => {
    const step = config.steps.find(s => s.name === stepName)
    if (!step) throw new Error(`Type step "${stepName}" not found`)
    return {
      fontSize: step.fontSize.clamp,
      lineHeight: step.lineHeight.computed,
      letterSpacing: step.letterSpacing.css,
      style: {
        fontSize: step.fontSize.clamp,
        lineHeight: step.lineHeight.computed,
        letterSpacing: step.letterSpacing.css,
      },
      className: `takt-type-${stepName}`,
      trim: step.trim,
    }
  }, [config, stepName])
}
