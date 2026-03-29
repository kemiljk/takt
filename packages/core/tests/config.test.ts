import { describe, expect, test } from 'bun:test'
import { createTaktConfig } from '../src/config'
import type { FontMetrics } from '../src/types'

const INTER_METRICS: FontMetrics = {
  unitsPerEm: 2048,
  ascent: 1984,
  descent: -494,
  lineGap: 0,
  capHeight: 1490,
  xHeight: 1118,
  xWidthAvg: 930,
}

describe('createTaktConfig', () => {
  test('produces a valid config with defaults', () => {
    const config = createTaktConfig({ font: INTER_METRICS })
    expect(config.steps).toHaveLength(8)
    expect(config.spacing.rhythmUnit).toBeGreaterThan(0)
    expect(config.font.xHeightRatio).toBeCloseTo(1118 / 2048, 3)
    expect(config.meta.version).toBe('0.1.0')
  })

  test('throws when given a string font', () => {
    expect(() => createTaktConfig({ font: 'Inter' })).toThrow()
  })

  test('respects custom ratio', () => {
    const config = createTaktConfig({ font: INTER_METRICS, ratio: 1.5 })
    const base = config.steps.find(s => s.name === 'base')!
    const lg = config.steps.find(s => s.name === 'lg')!
    expect(lg.fontSize.max / base.fontSize.max).toBeCloseTo(1.5, 1)
  })

  test('includes trim data when trim=true', () => {
    const config = createTaktConfig({ font: INTER_METRICS, trim: true })
    for (const step of config.steps) {
      expect(step.trim).toBeDefined()
      expect(step.trim!.capsize).toBeDefined()
    }
  })

  test('excludes trim data when trim=false', () => {
    const config = createTaktConfig({ font: INTER_METRICS, trim: false })
    for (const step of config.steps) {
      expect(step.trim).toBeUndefined()
    }
  })

  test('includes textBox when textBoxTrim=true', () => {
    const config = createTaktConfig({ font: INTER_METRICS, trim: true, textBoxTrim: true })
    const step = config.steps[0]!
    expect(step.trim!.textBox).toBeDefined()
    expect(step.trim!.textBox!.textBoxTrim).toBe('both')
  })

  test('step names match expected order', () => {
    const config = createTaktConfig({ font: INTER_METRICS })
    const names = config.steps.map(s => s.name)
    expect(names).toEqual(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'])
  })
})
