import type { FontMetrics, TaktStep } from './types'
import { createStyleObject } from '@capsizecss/core'

export function computeTrim(fontSize: number, lineHeight: number, metrics: FontMetrics): TaktStep['trim'] {
  const capsizeStyles = createStyleObject({
    fontSize,
    leading: fontSize * lineHeight,
    fontMetrics: metrics,
  })

  const capsize = {
    fontSize: `${fontSize}px`,
    lineHeight: `${fontSize * lineHeight}px`,
    '::before': (capsizeStyles['::before'] as Record<string, string>) || {},
    '::after': (capsizeStyles['::after'] as Record<string, string>) || {},
  }

  const textBox = {
    textBoxTrim: 'both',
    textBoxEdge: 'cap alphabetic',
  }

  return { capsize, textBox }
}
