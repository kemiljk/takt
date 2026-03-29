import {
	Crimson_Pro,
	DM_Sans,
	Fraunces,
	Geist,
	IBM_Plex_Sans,
	Instrument_Sans,
	Inter,
	JetBrains_Mono,
	Libre_Baskerville,
	Literata,
	Lora,
	Newsreader,
	Outfit,
	Roboto_Slab,
	Source_Serif_4,
	Space_Grotesk,
	Zilla_Slab,
} from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-inter',
	weight: ['400', '500', '600', '700'],
})

const instrumentSans = Instrument_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-instrument-sans',
	weight: ['400', '500', '600', '700'],
})

const geist = Geist({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-geist',
	weight: ['400', '500', '600', '700'],
})

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-ibm-plex-sans',
	weight: ['400', '500', '600', '700'],
})

const sourceSerif4 = Source_Serif_4({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-source-serif-4',
	weight: ['400', '500', '600', '700'],
})

const literata = Literata({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-literata',
	weight: ['400', '500', '600', '700'],
})

const newsreader = Newsreader({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-newsreader',
	weight: ['400', '500', '600', '700'],
})

const fraunces = Fraunces({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-fraunces',
	weight: ['400', '500', '600', '700'],
})

const lora = Lora({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-lora',
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
})

const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-roboto-slab',
	weight: ['400', '500', '600', '700'],
})

const zillaSlab = Zilla_Slab({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-zilla-slab',
	weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-jetbrains-mono',
	weight: ['400', '500', '600', '700'],
})

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-space-grotesk',
	weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-dm-sans',
	weight: ['400', '500', '600', '700'],
})

const outfit = Outfit({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-outfit',
	weight: ['400', '500', '600', '700'],
})

const crimsonPro = Crimson_Pro({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-crimson-pro',
	weight: ['400', '500', '600', '700'],
})

const libreBaskerville = Libre_Baskerville({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-curated-libre-baskerville',
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
})

export const curatedPlaygroundFontVariableClasses = [
	inter.variable,
	instrumentSans.variable,
	geist.variable,
	ibmPlexSans.variable,
	sourceSerif4.variable,
	literata.variable,
	newsreader.variable,
	fraunces.variable,
	lora.variable,
	robotoSlab.variable,
	zillaSlab.variable,
	jetbrainsMono.variable,
	spaceGrotesk.variable,
	dmSans.variable,
	outfit.variable,
	crimsonPro.variable,
	libreBaskerville.variable,
].join(' ')

const CURATED_FONT_FAMILY_CSS = {
	Inter: 'var(--font-curated-inter)',
	'Instrument Sans': 'var(--font-curated-instrument-sans)',
	Geist: 'var(--font-curated-geist)',
	'Host Grotesk': 'var(--font-host-grotesk)',
	'IBM Plex Sans': 'var(--font-curated-ibm-plex-sans)',
	'Source Serif 4': 'var(--font-curated-source-serif-4)',
	Literata: 'var(--font-curated-literata)',
	Newsreader: 'var(--font-curated-newsreader)',
	Fraunces: 'var(--font-curated-fraunces)',
	Lora: 'var(--font-curated-lora)',
	'Roboto Slab': 'var(--font-curated-roboto-slab)',
	'Zilla Slab': 'var(--font-curated-zilla-slab)',
	'JetBrains Mono': 'var(--font-curated-jetbrains-mono)',
	'Martian Mono': 'var(--font-martian-mono)',
	'Space Grotesk': 'var(--font-curated-space-grotesk)',
	'DM Sans': 'var(--font-curated-dm-sans)',
	Outfit: 'var(--font-curated-outfit)',
	'Crimson Pro': 'var(--font-curated-crimson-pro)',
	'Libre Baskerville': 'var(--font-curated-libre-baskerville)',
	// Loaded via Google Fonts stylesheet in app/layout.tsx (next/font has no fallback metrics for this family).
	'Atkinson Hyperlegible Next': '"Atkinson Hyperlegible Next", system-ui, sans-serif',
} as const

export function curatedFontFamilyCss(fontName: string): string {
	return (
		CURATED_FONT_FAMILY_CSS[fontName as keyof typeof CURATED_FONT_FAMILY_CSS] ??
		'var(--font-curated-inter)'
	)
}
