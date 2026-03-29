import type { TaktInput, TaktConfig, FontMetrics } from './types'
import { normaliseMetrics } from './metrics'
import { generateScale } from './scale'
import { computeLineHeight } from './lineHeight'
import { computeLetterSpacing } from './letterSpacing'
import { computeTrim } from './trim'
import { computeSpacing } from './spacing'

const DEFAULTS = {
  baseSize: 16,
  ratio: 1.25,
  stepsUp: 5,
  stepsDown: 2,
  viewportMin: 320,
  viewportMax: 1440,
  trim: true,
  textBoxTrim: false,
}

export function createTaktConfig(input: TaktInput): TaktConfig {
  // Merge defaults
  const resolved = { ...DEFAULTS, ...input }

  // Normalise font metrics (if string, throw — async resolution must happen before calling this)
  if (typeof resolved.font === 'string') {
    throw new Error('Pass pre-resolved FontMetrics to createTaktConfig. Use unpackFont() first for async font loading.')
  }

  const metrics = normaliseMetrics(resolved.font)

  // Generate type scale
  const scaleSteps = generateScale({
    baseSize: resolved.baseSize,
    ratio: resolved.ratio,
    stepsUp: resolved.stepsUp,
    stepsDown: resolved.stepsDown,
    viewportMin: resolved.viewportMin,
    viewportMax: resolved.viewportMax,
  })

  // Compute per-step values
  const steps = scaleSteps.map(step => {
    const refSize = step.max // Use max (desktop) size for metric computation
    const lineHeight = computeLineHeight(refSize, metrics)
    const letterSpacing = computeLetterSpacing(refSize, metrics)

    const result: TaktConfig['steps'][0] = {
      name: step.name,
      fontSize: { min: step.min, max: step.max, clamp: step.clamp },
      lineHeight,
      letterSpacing,
    }

    if (resolved.trim) {
      const trimResult = computeTrim(refSize, lineHeight.value, resolved.font as FontMetrics)
      if (trimResult) {
        result.trim = {
          capsize: trimResult.capsize,
        }
        if (resolved.textBoxTrim && trimResult.textBox) {
          result.trim.textBox = trimResult.textBox
        }
      }
    }

    return result
  })

  // Find the body step and compute spacing
  const bodyStep = steps.find(s => s.name === 'base')!
  const spacing = computeSpacing(bodyStep.fontSize.max, bodyStep.lineHeight.value, resolved.viewportMin, resolved.viewportMax)

  return {
    font: metrics,
    steps,
    spacing,
    meta: {
      generatedAt: new Date().toISOString(),
      version: '0.1.0',
      input,
    },
  }
}
