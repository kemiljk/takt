import { describe, expect, test } from 'bun:test'
import { computeSpacing } from '../src/spacing'

describe('computeSpacing', () => {
  test('rhythm unit equals font size × line height', () => {
    const result = computeSpacing(16, 1.5, 320, 1440)
    expect(result.rhythmUnit).toBe(24)
  })

  test('base spacing equals rhythm unit', () => {
    const result = computeSpacing(16, 1.5, 320, 1440)
    expect(result.scale['base']!.px).toBe(24)
    expect(result.scale['base']!.multiplier).toBe(1)
  })

  test('all expected scale keys exist', () => {
    const result = computeSpacing(16, 1.5, 320, 1440)
    const expected = ['3xs', '2xs', 'xs', 's', 'm', 'base', 'l', 'xl', '2xl', '3xl', '4xl', '5xl']
    for (const key of expected) {
      expect(result.scale[key]).toBeDefined()
    }
  })

  test('scale values increase monotonically', () => {
    const result = computeSpacing(16, 1.5, 320, 1440)
    const keys = ['3xs', '2xs', 'xs', 's', 'm', 'base', 'l', 'xl', '2xl', '3xl', '4xl', '5xl']
    for (let i = 1; i < keys.length; i++) {
      expect(result.scale[keys[i]!]!.px).toBeGreaterThan(result.scale[keys[i - 1]!]!.px)
    }
  })

  test('each scale entry has rem and clamp strings', () => {
    const result = computeSpacing(16, 1.5, 320, 1440)
    for (const value of Object.values(result.scale)) {
      expect(value.rem).toMatch(/rem$/)
      expect(value.clamp).toMatch(/^clamp\(/)
    }
  })

  test('changing font metrics changes spacing', () => {
    const a = computeSpacing(16, 1.5, 320, 1440)
    const b = computeSpacing(16, 1.35, 320, 1440)
    expect(a.rhythmUnit).not.toBe(b.rhythmUnit)
    expect(a.scale['base']!.px).not.toBe(b.scale['base']!.px)
  })
})
