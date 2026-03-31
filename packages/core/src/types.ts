export interface FontMetrics {
  unitsPerEm: number
  ascent: number
  descent: number
  lineGap: number
  capHeight: number
  xHeight: number
  xWidthAvg: number
}

export interface NormalisedFontMetrics extends FontMetrics {
  familyName: string
  xHeightRatio: number
  capHeightRatio: number
  ascentRatio: number
  descentRatio: number
  avgCharWidthRatio: number
}

export interface TaktInput {
  font: string | FontMetrics
  familyName?: string
  baseSize?: number
  ratio?: number
  stepsUp?: number
  stepsDown?: number
  viewportMin?: number
  viewportMax?: number
  trim?: boolean
  textBoxTrim?: boolean
}

export interface TaktConfig {
  font: NormalisedFontMetrics
  steps: TaktStep[]
  spacing: TaktSpacing
  meta: {
    generatedAt: string
    version: string
    input: TaktInput
  }
}

export interface TaktStep {
  name: string
  fontSize: {
    min: number
    max: number
    clamp: string
  }
  lineHeight: {
    value: number
    computed: string
    reasoning: string
  }
  letterSpacing: {
    value: number
    css: string
  }
  trim?: {
    capsize: {
      fontSize: string
      lineHeight: string
      '::before': Record<string, string>
      '::after': Record<string, string>
    }
    textBox?: {
      textBoxTrim: string
      textBoxEdge: string
    }
  }
}

export interface TaktSpacing {
  rhythmUnit: number
  scale: Record<
    string,
    {
      multiplier: number
      px: number
      rem: string
      clamp: string
    }
  >
}
