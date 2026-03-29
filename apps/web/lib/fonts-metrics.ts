import type { FontMetrics } from '@takt/core'

export interface CuratedFont {
  name: string
  family: string  // Google Fonts family name
  category: 'sans' | 'serif' | 'slab' | 'mono'
  style: string   // e.g. "geometric sans, high x-height"
  metrics: FontMetrics
}

export const CURATED_FONTS: CuratedFont[] = [
  {
    name: 'Inter',
    family: 'Inter',
    category: 'sans',
    style: 'geometric sans, high x-height',
    metrics: { unitsPerEm: 2048, ascent: 1984, descent: -494, lineGap: 0, capHeight: 1490, xHeight: 1118, xWidthAvg: 930 }
  },
  {
    name: 'Instrument Sans',
    family: 'Instrument Sans',
    category: 'sans',
    style: 'humanist sans, warm',
    metrics: { unitsPerEm: 1000, ascent: 1050, descent: -350, lineGap: 0, capHeight: 700, xHeight: 498, xWidthAvg: 480 }
  },
  {
    name: 'Geist',
    family: 'Geist',
    category: 'sans',
    style: 'geometric sans, minimal',
    metrics: { unitsPerEm: 1000, ascent: 1050, descent: -300, lineGap: 0, capHeight: 720, xHeight: 520, xWidthAvg: 510 }
  },
  {
    name: 'Host Grotesk',
    family: 'Host Grotesk',
    category: 'sans',
    style: 'humanist sans, friendly',
    metrics: { unitsPerEm: 1000, ascent: 1000, descent: -300, lineGap: 0, capHeight: 680, xHeight: 490, xWidthAvg: 475 }
  },
  {
    name: 'IBM Plex Sans',
    family: 'IBM Plex Sans',
    category: 'sans',
    style: 'neo-grotesque, technical',
    metrics: { unitsPerEm: 1000, ascent: 1025, descent: -275, lineGap: 0, capHeight: 698, xHeight: 517, xWidthAvg: 487 }
  },
  {
    name: 'Source Serif 4',
    family: 'Source Serif 4',
    category: 'serif',
    style: 'transitional serif, balanced',
    metrics: { unitsPerEm: 1000, ascent: 918, descent: -335, lineGap: 0, capHeight: 660, xHeight: 475, xWidthAvg: 502 }
  },
  {
    name: 'Literata',
    family: 'Literata',
    category: 'serif',
    style: 'contemporary serif, high x-height',
    metrics: { unitsPerEm: 1000, ascent: 1050, descent: -400, lineGap: 0, capHeight: 685, xHeight: 530, xWidthAvg: 495 }
  },
  {
    name: 'Newsreader',
    family: 'Newsreader',
    category: 'serif',
    style: 'old-style serif, editorial',
    metrics: { unitsPerEm: 1000, ascent: 1060, descent: -380, lineGap: 0, capHeight: 680, xHeight: 440, xWidthAvg: 460 }
  },
  {
    name: 'Fraunces',
    family: 'Fraunces',
    category: 'serif',
    style: 'old-style, variable optical size',
    metrics: { unitsPerEm: 1000, ascent: 1000, descent: -350, lineGap: 0, capHeight: 670, xHeight: 465, xWidthAvg: 510 }
  },
  {
    name: 'Lora',
    family: 'Lora',
    category: 'serif',
    style: 'calligraphic serif, expressive',
    metrics: { unitsPerEm: 1000, ascent: 1021, descent: -300, lineGap: 0, capHeight: 683, xHeight: 487, xWidthAvg: 470 }
  },
  {
    name: 'Roboto Slab',
    family: 'Roboto Slab',
    category: 'slab',
    style: 'geometric slab, bold',
    metrics: { unitsPerEm: 2048, ascent: 1900, descent: -500, lineGap: 0, capHeight: 1456, xHeight: 1082, xWidthAvg: 1000 }
  },
  {
    name: 'Zilla Slab',
    family: 'Zilla Slab',
    category: 'slab',
    style: 'humanist slab, friendly',
    metrics: { unitsPerEm: 1000, ascent: 1056, descent: -290, lineGap: 0, capHeight: 700, xHeight: 512, xWidthAvg: 530 }
  },
  {
    name: 'JetBrains Mono',
    family: 'JetBrains Mono',
    category: 'mono',
    style: 'monospace, code-focused',
    metrics: { unitsPerEm: 1000, ascent: 1020, descent: -300, lineGap: 0, capHeight: 730, xHeight: 536, xWidthAvg: 600 }
  },
  {
    name: 'Martian Mono',
    family: 'Martian Mono',
    category: 'mono',
    style: 'monospace, geometric',
    metrics: { unitsPerEm: 1000, ascent: 1035, descent: -315, lineGap: 0, capHeight: 700, xHeight: 500, xWidthAvg: 600 }
  },
  {
    name: 'Space Grotesk',
    family: 'Space Grotesk',
    category: 'sans',
    style: 'geometric sans, tabular figures',
    metrics: { unitsPerEm: 1000, ascent: 1100, descent: -350, lineGap: 0, capHeight: 700, xHeight: 486, xWidthAvg: 490 }
  },
  {
    name: 'DM Sans',
    family: 'DM Sans',
    category: 'sans',
    style: 'geometric sans, high x-height',
    metrics: { unitsPerEm: 1000, ascent: 1000, descent: -250, lineGap: 0, capHeight: 700, xHeight: 546, xWidthAvg: 510 }
  },
  {
    name: 'Outfit',
    family: 'Outfit',
    category: 'sans',
    style: 'geometric sans, modern',
    metrics: { unitsPerEm: 1000, ascent: 1000, descent: -250, lineGap: 0, capHeight: 720, xHeight: 514, xWidthAvg: 500 }
  },
  {
    name: 'Crimson Pro',
    family: 'Crimson Pro',
    category: 'serif',
    style: 'old-style serif, tall ascenders',
    metrics: { unitsPerEm: 1000, ascent: 1040, descent: -370, lineGap: 0, capHeight: 640, xHeight: 420, xWidthAvg: 445 }
  },
  {
    name: 'Libre Baskerville',
    family: 'Libre Baskerville',
    category: 'serif',
    style: 'transitional serif, elegant',
    metrics: { unitsPerEm: 1000, ascent: 983, descent: -300, lineGap: 0, capHeight: 680, xHeight: 460, xWidthAvg: 490 }
  },
  {
    name: 'Atkinson Hyperlegible Next',
    family: 'Atkinson Hyperlegible Next',
    category: 'sans',
    style: 'accessibility-focused, legible',
    metrics: { unitsPerEm: 1000, ascent: 1050, descent: -350, lineGap: 0, capHeight: 700, xHeight: 520, xWidthAvg: 505 }
  }
]
