'use client'
import { buildShowcaseTokenMaps } from '@/lib/showcase-tokens'
import type { CuratedFont } from '@/lib/fonts-metrics'
import { useMemo } from 'react'

export function useShowcaseConfig(font: CuratedFont) {
	return useMemo(() => buildShowcaseTokenMaps(font), [font])
}
