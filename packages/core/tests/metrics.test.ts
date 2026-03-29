import { describe, expect, test } from 'bun:test'
import { normaliseMetrics } from '../src/metrics'
import type { FontMetrics } from '../src/types'

// Inter-like metrics
const INTER_METRICS: FontMetrics = {
  unitsPerEm: 2048,
  ascent: 1984,
  descent: -494,
  lineGap: 0,
  capHeight: 1490,
  xHeight: 1118,
  xWidthAvg: 930,
}

describe('normaliseMetrics', () => {
  test('computes correct ratios for Inter-like font', () => {
    const result = normaliseMetrics(INTER_METRICS, 'Inter')
    expect(result.familyName).toBe('Inter')
    expect(result.xHeightRatio).toBeCloseTo(1118 / 2048, 4)
    expect(result.capHeightRatio).toBeCloseTo(1490 / 2048, 4)
    expect(result.ascentRatio).toBeCloseTo(1984 / 2048, 4)
    expect(result.descentRatio).toBeCloseTo(-494 / 2048, 4)
    expect(result.avgCharWidthRatio).toBeCloseTo(930 / 2048, 4)
  })

  test('preserves original metrics', () => {
    const result = normaliseMetrics(INTER_METRICS)
    expect(result.unitsPerEm).toBe(2048)
    expect(result.ascent).toBe(1984)
    expect(result.descent).toBe(-494)
  })

  test('defaults familyName to Unknown', () => {
    const result = normaliseMetrics(INTER_METRICS)
    expect(result.familyName).toBe('Unknown')
  })
})
