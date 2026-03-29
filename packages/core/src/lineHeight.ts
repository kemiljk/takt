import type { NormalisedFontMetrics } from './types'
import { lerp, inverseLerp, remap } from './utils'

export function computeLineHeight(fontSize: number, metrics: NormalisedFontMetrics): {
  value: number
  computed: string
  reasoning: string
} {
  // Base line-height decreases as font size increases
  const t = inverseLerp(12, 72, fontSize)
  const baseLineHeight = lerp(1.6, 1.1, t)

  // Adjust based on x-height ratio
  const xHeightAdjust = remap(metrics.xHeightRatio, 0.55, 0.85, 0.06, -0.06)

  const raw = baseLineHeight + xHeightAdjust
  const value = Math.round(Math.max(1.0, Math.min(1.8, raw)) * 1000) / 1000

  // Generate reasoning
  let sizeCategory: string
  if (fontSize <= 14) sizeCategory = 'small'
  else if (fontSize <= 20) sizeCategory = 'body'
  else if (fontSize <= 32) sizeCategory = 'heading'
  else sizeCategory = 'display'

  const xHeightDesc = metrics.xHeightRatio > 0.75 ? 'high' : metrics.xHeightRatio < 0.65 ? 'low' : 'moderate'

  const reasoning =
    `At ${fontSize}px (${sizeCategory} size), base line-height is ${baseLineHeight.toFixed(3)}. ` +
    `${metrics.familyName} has a ${xHeightDesc} x-height ratio (${metrics.xHeightRatio.toFixed(3)}), ` +
    `adjusting by ${xHeightAdjust > 0 ? '+' : ''}${xHeightAdjust.toFixed(3)}. ` +
    `Final: ${value}.`

  return { value, computed: value.toString(), reasoning }
}
