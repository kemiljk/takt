'use client'
import type { NormalisedFontMetrics } from '@takt/core'

interface MetricsVisualiserProps {
  metrics: NormalisedFontMetrics
  fontFamily?: string
}

export function MetricsVisualiser({ metrics, fontFamily }: MetricsVisualiserProps) {
  // Draw an SVG showing "Hg" with horizontal lines for:
  // - Ascent line (top)
  // - Cap height line
  // - X-height line
  // - Baseline
  // - Descent line (bottom)
  // Each line is labelled and colour-coded
  // The letter "Hg" is rendered in the actual font if fontFamily is provided

  const totalHeight = 200
  const scale = totalHeight / (metrics.ascentRatio - metrics.descentRatio)

  // Calculate Y positions (0 = top of viewBox)
  const ascentY = 20
  const baselineY = ascentY + metrics.ascentRatio * scale
  const capHeightY = baselineY - metrics.capHeightRatio * scale
  const xHeightY = baselineY - metrics.xHeightRatio * scale
  const descentY = baselineY - metrics.descentRatio * scale  // descent is negative

  // Lines config
  const lines = [
    { y: ascentY, label: 'Ascent', color: 'oklch(0.7 0.15 30)' },
    { y: capHeightY, label: 'Cap height', color: 'oklch(0.65 0.15 150)' },
    { y: xHeightY, label: 'x-height', color: 'oklch(0.65 0.1 190)' },
    { y: baselineY, label: 'Baseline', color: 'oklch(0.5 0 0)' },
    { y: descentY, label: 'Descent', color: 'oklch(0.7 0.15 280)' },
  ]

  const lineEndX = 268
  const labelX = 396

  return (
    <div className="metrics-vis">
      <svg viewBox="0 0 400 260" className="metrics-vis__svg">
        {/* Letter "Hg" — start-aligned so glyphs stay clear of right-side labels */}
        <text
          x="8"
          y={baselineY}
          textAnchor="start"
          className="metrics-vis__text"
          style={{ fontFamily: fontFamily || 'inherit', fontSize: `${metrics.capHeightRatio * scale * 1.4}px` }}
        >
          Hg
        </text>

        {/* Metric lines */}
        {lines.map(line => (
          <g key={line.label}>
            <line
              x1="0"
              x2={lineEndX}
              y1={line.y}
              y2={line.y}
              stroke={line.color}
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
            <text
              x={labelX}
              y={line.y - 4}
              textAnchor="end"
              fill={line.color}
              className="metrics-vis__label"
            >
              {line.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
