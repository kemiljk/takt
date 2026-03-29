import type { TaktSpacing } from './types'
import { generateClamp, roundTo } from './utils'

const SPACING_SCALE: Record<string, number> = {
  '3xs': 0.125,
  '2xs': 0.25,
  'xs': 0.375,
  's': 0.5,
  'm': 0.75,
  'base': 1,
  'l': 1.5,
  'xl': 2,
  '2xl': 3,
  '3xl': 4,
  '4xl': 6,
  '5xl': 8,
}

export function computeSpacing(
  bodyFontSize: number,
  bodyLineHeight: number,
  viewportMin: number,
  viewportMax: number
): TaktSpacing {
  const rhythmUnit = bodyFontSize * bodyLineHeight

  const scale: TaktSpacing['scale'] = {}
  for (const [name, multiplier] of Object.entries(SPACING_SCALE)) {
    const px = roundTo(rhythmUnit * multiplier, 2)
    const remValue = px / 16
    const rem = remValue.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')

    // Fluid version: scale between 85% at viewportMin and 100% at viewportMax
    const minPx = roundTo(px * 0.85, 2)
    const maxPx = px
    const clamp = generateClamp(minPx, maxPx, viewportMin, viewportMax)

    scale[name] = { multiplier, px, rem: `${rem}rem`, clamp }
  }

  return { rhythmUnit, scale }
}
