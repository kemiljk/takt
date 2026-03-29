import type { FontMetrics, NormalisedFontMetrics } from './types'

export function normaliseMetrics(metrics: FontMetrics, familyName = 'Unknown'): NormalisedFontMetrics {
  const { unitsPerEm, ascent, descent, xHeight, capHeight, xWidthAvg } = metrics

  return {
    ...metrics,
    familyName,
    xHeightRatio: xHeight / unitsPerEm,
    capHeightRatio: capHeight / unitsPerEm,
    ascentRatio: ascent / unitsPerEm,
    descentRatio: descent / unitsPerEm,
    avgCharWidthRatio: xWidthAvg / unitsPerEm,
  }
}

export async function unpackFont(source: string): Promise<FontMetrics> {
  const { fromUrl } = await import('@capsizecss/unpack')
  const metrics = await fromUrl(source)

  if (!metrics) {
    throw new Error(`Failed to unpack font metrics from source: ${source}`)
  }

  return {
    unitsPerEm: metrics.unitsPerEm,
    ascent: metrics.ascent,
    descent: metrics.descent,
    lineGap: metrics.lineGap,
    capHeight: metrics.capHeight,
    xHeight: metrics.xHeight,
    xWidthAvg: metrics.xWidthAvg,
  }
}
