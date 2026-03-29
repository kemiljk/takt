import { describe, expect, test } from 'bun:test'
import { computeLetterSpacing } from '../src/letterSpacing'
import type { NormalisedFontMetrics } from '../src/types'

const METRICS: NormalisedFontMetrics = {
  unitsPerEm: 2048,
  ascent: 1984,
  descent: -494,
  lineGap: 0,
  capHeight: 1490,
  xHeight: 1118,
  xWidthAvg: 930,
  familyName: 'Inter',
  xHeightRatio: 1118 / 2048,
  capHeightRatio: 1490 / 2048,
  ascentRatio: 1984 / 2048,
  descentRatio: -494 / 2048,
  avgCharWidthRatio: 930 / 2048,
}

describe('computeLetterSpacing', () => {
  test('small text gets positive tracking', () => {
    const result = computeLetterSpacing(10, METRICS)
    expect(result.value).toBeGreaterThan(0)
  })

  test('body text gets near-zero tracking', () => {
    const result = computeLetterSpacing(16, METRICS)
    expect(Math.abs(result.value)).toBeLessThanOrEqual(0.005)
  })

  test('display text gets negative tracking', () => {
    const result = computeLetterSpacing(48, METRICS)
    expect(result.value).toBeLessThan(0)
  })

  test('css format is correct', () => {
    const positive = computeLetterSpacing(10, METRICS)
    expect(positive.css).toMatch(/em$/)
    
    const zero = computeLetterSpacing(16, METRICS)
    expect(zero.css).toBe('0em')
  })
})
