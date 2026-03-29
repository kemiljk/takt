import { describe, expect, test } from 'bun:test'
import { computeLineHeight } from '../src/lineHeight'
import type { NormalisedFontMetrics } from '../src/types'

// High x-height font (like DM Sans, xHeightRatio ~0.78)
const HIGH_X: NormalisedFontMetrics = {
  unitsPerEm: 1000,
  ascent: 1000,
  descent: -250,
  lineGap: 0,
  capHeight: 700,
  xHeight: 780,
  xWidthAvg: 500,
  familyName: 'DM Sans',
  xHeightRatio: 0.78,
  capHeightRatio: 0.7,
  ascentRatio: 1.0,
  descentRatio: -0.25,
  avgCharWidthRatio: 0.5,
}

// Low x-height font (like Garamond, xHeightRatio ~0.58)
const LOW_X: NormalisedFontMetrics = {
  ...HIGH_X,
  familyName: 'Garamond',
  xHeightRatio: 0.58,
}

describe('computeLineHeight', () => {
  test('returns higher line-height at small sizes', () => {
    const small = computeLineHeight(12, HIGH_X)
    const large = computeLineHeight(48, HIGH_X)
    expect(small.value).toBeGreaterThan(large.value)
  })

  test('line-height is between 1.0 and 1.8', () => {
    for (const size of [10, 12, 14, 16, 20, 24, 32, 48, 72, 96]) {
      const result = computeLineHeight(size, HIGH_X)
      expect(result.value).toBeGreaterThanOrEqual(1.0)
      expect(result.value).toBeLessThanOrEqual(1.8)
    }
  })

  test('low x-height fonts get more line-height', () => {
    const high = computeLineHeight(16, HIGH_X)
    const low = computeLineHeight(16, LOW_X)
    expect(low.value).toBeGreaterThanOrEqual(high.value)
  })

  test('includes reasoning string', () => {
    const result = computeLineHeight(16, HIGH_X)
    expect(result.reasoning).toContain('DM Sans')
    expect(result.reasoning).toContain('16px')
  })

  test('body size returns comfortable line-height (~1.4-1.6)', () => {
    const result = computeLineHeight(16, HIGH_X)
    expect(result.value).toBeGreaterThanOrEqual(1.3)
    expect(result.value).toBeLessThanOrEqual(1.7)
  })

  test('display size returns tight line-height (~1.1-1.3)', () => {
    const result = computeLineHeight(48, HIGH_X)
    expect(result.value).toBeGreaterThanOrEqual(1.0)
    expect(result.value).toBeLessThanOrEqual(1.4)
  })
})
