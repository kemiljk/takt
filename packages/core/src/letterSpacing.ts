import type { NormalisedFontMetrics } from './types'
import { lerp, inverseLerp, remap } from './utils'

export function computeLetterSpacing(fontSize: number, metrics: NormalisedFontMetrics): {
  value: number
  css: string
} {
  // Smooth curve from positive (small) through neutral (body) to negative (display)

  let value: number
  if (fontSize <= 16) {
    const t = inverseLerp(10, 16, fontSize)
    value = lerp(0.02, 0, t)
  } else {
    const t = inverseLerp(16, 48, fontSize)
    value = lerp(0, -0.04, t)
  }

  // Wider fonts need less adjustment
  const widthMod = remap(metrics.avgCharWidthRatio, 0.4, 0.6, 1.0, 0.7)
  value = Math.round(value * widthMod * 1000) / 1000

  return { value, css: value === 0 ? '0em' : `${value}em` }
}
