import type { TaktConfig } from '@takt/core'

/**
 * Generate Tailwind v4 CSS theme block from a Takt config.
 * This outputs CSS custom properties that Tailwind v4 can consume via @theme.
 */
export function taktTailwindPlugin(config: TaktConfig): string {
  const lines: string[] = ['@theme {']

  for (const step of config.steps) {
    lines.push(`  --font-size-${step.name}: ${step.fontSize.clamp};`)
    lines.push(`  --line-height-${step.name}: ${step.lineHeight.computed};`)
    lines.push(`  --letter-spacing-${step.name}: ${step.letterSpacing.css};`)
  }

  for (const [name, entry] of Object.entries(config.spacing.scale)) {
    lines.push(`  --spacing-${name}: ${entry.clamp};`)
  }

  lines.push('}')
  return lines.join('\n')
}

export default taktTailwindPlugin
