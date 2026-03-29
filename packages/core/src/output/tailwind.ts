import type { TaktConfig } from '../types'

interface TailwindThemeConfig {
  fontSize?: Record<string, [string, Record<string, string>]>
  lineHeight?: Record<string, string>
  letterSpacing?: Record<string, string>
  spacing?: Record<string, string>
}

export function generateTailwind(config: TaktConfig): TailwindThemeConfig {
  const theme: TailwindThemeConfig = {
    fontSize: {},
    lineHeight: {},
    letterSpacing: {},
    spacing: {},
  }

  // Type scale
  for (const step of config.steps) {
    const lineHeightValue = step.lineHeight.value.toString()
    const letterSpacingValue = step.letterSpacing.css

    theme.fontSize![step.name] = [
      step.fontSize.clamp,
      {
        lineHeight: lineHeightValue,
        letterSpacing: letterSpacingValue,
      },
    ]

    theme.lineHeight![step.name] = lineHeightValue
    theme.letterSpacing![step.name] = letterSpacingValue
  }

  // Spacing scale
  for (const [name, value] of Object.entries(config.spacing.scale)) {
    theme.spacing![name] = value.clamp
  }

  return theme
}
