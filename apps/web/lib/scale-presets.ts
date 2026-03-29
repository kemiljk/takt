export interface ScalePreset {
  name: string
  ratio: number
  description: string
}

export const SCALE_PRESETS: ScalePreset[] = [
  { name: 'Minor Second', ratio: 1.067, description: 'Subtle, nearly flat' },
  { name: 'Major Second', ratio: 1.125, description: 'Gentle, readable' },
  { name: 'Minor Third', ratio: 1.2, description: 'Classic, versatile' },
  { name: 'Major Third', ratio: 1.25, description: 'Strong hierarchy' },
  { name: 'Perfect Fourth', ratio: 1.333, description: 'Bold, dramatic' },
  { name: 'Augmented Fourth', ratio: 1.414, description: '√2, mathematical' },
  { name: 'Perfect Fifth', ratio: 1.5, description: 'Musical, expressive' },
]
