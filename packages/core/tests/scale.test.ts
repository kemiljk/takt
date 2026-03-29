import { describe, expect, test } from 'bun:test'
import { generateScale } from '../src/scale'

describe('generateScale', () => {
  const defaults = {
    baseSize: 16,
    ratio: 1.25,
    stepsUp: 5,
    stepsDown: 2,
    viewportMin: 320,
    viewportMax: 1440,
  }

  test('generates correct number of steps', () => {
    const steps = generateScale(defaults)
    // stepsDown(2) + base(1) + stepsUp(5) = 8
    expect(steps).toHaveLength(8)
  })

  test('step names are correct', () => {
    const steps = generateScale(defaults)
    const names = steps.map(s => s.name)
    expect(names).toEqual(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'])
  })

  test('base step max equals baseSize', () => {
    const steps = generateScale(defaults)
    const base = steps.find(s => s.name === 'base')!
    expect(base.max).toBe(16)
  })

  test('scale increases with ratio', () => {
    const steps = generateScale(defaults)
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i]!.max).toBeGreaterThan(steps[i - 1]!.max)
    }
  })

  test('min values are smaller than max values', () => {
    const steps = generateScale(defaults)
    for (const step of steps) {
      expect(step.min).toBeLessThan(step.max)
    }
  })

  test('each step has a valid clamp string', () => {
    const steps = generateScale(defaults)
    for (const step of steps) {
      expect(step.clamp).toMatch(/^clamp\(/)
    }
  })

  test('with 0 steps down, first step is base', () => {
    const steps = generateScale({ ...defaults, stepsDown: 0 })
    expect(steps[0]!.name).toBe('base')
    expect(steps).toHaveLength(6)
  })
})
