import { generateClamp, roundTo } from './utils'

interface ScaleInput {
  baseSize: number
  ratio: number
  stepsUp: number
  stepsDown: number
  viewportMin: number
  viewportMax: number
}

interface ScaleStep {
  name: string
  min: number
  max: number
  clamp: string
}

const BELOW_NAMES = ['4xs', '3xs', '2xs', 'xs', 'sm']
const ABOVE_NAMES = ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl']

export function generateScale(input: ScaleInput): ScaleStep[] {
  const { baseSize, ratio, stepsUp, stepsDown, viewportMin, viewportMax } = input

  const stepNames: string[] = []

  // Generate step names below base (smallest first)
  const belowSlice = BELOW_NAMES.slice(BELOW_NAMES.length - stepsDown)
  stepNames.push(...belowSlice)

  // Add base
  stepNames.push('base')

  // Generate step names above base
  for (let i = 0; i < stepsUp; i++) {
    stepNames.push(ABOVE_NAMES[i]!)
  }

  // Generate scale steps
  const steps: ScaleStep[] = []
  for (let i = -stepsDown; i <= stepsUp; i++) {
    const name = stepNames[i + stepsDown]!
    const max = baseSize * Math.pow(ratio, i)
    // At minimum viewport, use a reduced base (0.8 factor) with same ratio
    const minBase = baseSize * 0.8
    const min = minBase * Math.pow(ratio, i)

    const minRounded = roundTo(min, 2)
    const maxRounded = roundTo(max, 2)

    const clamp = generateClamp(minRounded, maxRounded, viewportMin, viewportMax)

    steps.push({
      name,
      min: minRounded,
      max: maxRounded,
      clamp,
    })
  }

  return steps
}
