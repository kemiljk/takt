import type { TaktConfig } from '../types'

type TokenValue = Record<string, unknown>

export function generateTokens(config: TaktConfig): Record<string, unknown> {
  const fontSize: Record<string, TokenValue> = {}
  const lineHeight: Record<string, TokenValue> = {}
  const letterSpacing: Record<string, TokenValue> = {}
  const spacing: Record<string, TokenValue> = {}

  // Type scale tokens
  for (const step of config.steps) {
    fontSize[step.name] = {
      min: {
        $type: 'dimension',
        $value: `${step.fontSize.min}px`,
      },
      max: {
        $type: 'dimension',
        $value: `${step.fontSize.max}px`,
      },
      fluid: {
        $type: 'dimension',
        $value: step.fontSize.clamp,
      },
    }

    lineHeight[step.name] = {
      value: {
        $type: 'number',
        $value: step.lineHeight.value,
      },
    }

    letterSpacing[step.name] = {
      value: {
        $type: 'dimension',
        $value: step.letterSpacing.css,
      },
    }
  }

  // Spacing tokens
  for (const [name, value] of Object.entries(config.spacing.scale)) {
    spacing[name] = {
      px: {
        $type: 'dimension',
        $value: `${value.px}px`,
      },
      fluid: {
        $type: 'dimension',
        $value: value.clamp,
      },
    }
  }

  return {
    typography: {
      font: {
        familyName: {
          $type: 'string',
          $value: config.font.familyName,
        },
      },
      fontSize,
      lineHeight,
      letterSpacing,
    },
    spacing,
  }
}
