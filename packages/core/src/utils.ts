export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function inverseLerp(a: number, b: number, v: number): number {
  return Math.max(0, Math.min(1, (v - a) / (b - a)))
}

export function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, v))
}

export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export function generateClamp(minPx: number, maxPx: number, viewportMin: number, viewportMax: number): string {
  const minRem = roundTo(minPx / 16, 4)
  const maxRem = roundTo(maxPx / 16, 4)

  const slope = (maxPx - minPx) / (viewportMax - viewportMin)
  const intercept = minPx - slope * viewportMin

  const slopeVw = roundTo(slope * 100, 4)
  const interceptRem = roundTo(intercept / 16, 4)

  const minStr = `${minRem}rem`
  const maxStr = `${maxRem}rem`
  const midParts: string[] = []
  if (interceptRem !== 0) midParts.push(`${interceptRem}rem`)
  midParts.push(`${slopeVw}vw`)
  const midStr = midParts.join(' + ').replace('+ -', '- ')

  return `clamp(${minStr}, ${midStr}, ${maxStr})`
}
