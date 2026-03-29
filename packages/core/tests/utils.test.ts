import { describe, expect, test } from 'bun:test'
import { lerp, inverseLerp, remap, roundTo, generateClamp } from '../src/utils'

describe('lerp', () => {
  test('returns start when t=0', () => {
    expect(lerp(0, 10, 0)).toBe(0)
  })
  test('returns end when t=1', () => {
    expect(lerp(0, 10, 1)).toBe(10)
  })
  test('returns midpoint when t=0.5', () => {
    expect(lerp(0, 10, 0.5)).toBe(5)
  })
  test('handles negative values', () => {
    expect(lerp(-10, 10, 0.5)).toBe(0)
  })
})

describe('inverseLerp', () => {
  test('returns 0 when value equals start', () => {
    expect(inverseLerp(0, 10, 0)).toBe(0)
  })
  test('returns 1 when value equals end', () => {
    expect(inverseLerp(0, 10, 10)).toBe(1)
  })
  test('clamps below 0', () => {
    expect(inverseLerp(0, 10, -5)).toBe(0)
  })
  test('clamps above 1', () => {
    expect(inverseLerp(0, 10, 15)).toBe(1)
  })
})

describe('remap', () => {
  test('maps value from one range to another', () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50)
  })
  test('handles inverted output range', () => {
    expect(remap(5, 0, 10, 100, 0)).toBe(50)
  })
})

describe('roundTo', () => {
  test('rounds to specified decimals', () => {
    expect(roundTo(1.23456, 2)).toBe(1.23)
    expect(roundTo(1.23456, 3)).toBe(1.235)
    expect(roundTo(1.23456, 0)).toBe(1)
  })
})

describe('generateClamp', () => {
  test('produces valid clamp string', () => {
    const result = generateClamp(12.8, 16, 320, 1440)
    expect(result).toMatch(/^clamp\(/)
    expect(result).toContain('rem')
    expect(result).toContain('vw')
  })
  test('min rem is smaller than max rem', () => {
    const result = generateClamp(12.8, 16, 320, 1440)
    const match = result.match(/clamp\(([0-9.]+)rem/)
    const minRem = parseFloat(match![1]!)
    const maxMatch = result.match(/,\s*([0-9.]+)rem\)$/)
    const maxRem = parseFloat(maxMatch![1]!)
    expect(minRem).toBeLessThan(maxRem)
  })
})
