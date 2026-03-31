import { createTaktConfig } from '@takt/core'
import type { TaktConfig } from '@takt/core'
import type { CuratedFont } from '@/lib/fonts-metrics'

const DEFAULT_TAKT_INPUT = {
	baseSize: 16,
	ratio: 1.25,
	stepsUp: 5,
	stepsDown: 2,
	viewportMin: 320,
	viewportMax: 1440,
	trim: true,
	textBoxTrim: false,
} as const

function step(config: TaktConfig, name: string) {
	const s = config.steps.find((x) => x.name === name)
	if (!s) throw new Error(`showcase-tokens: missing step "${name}"`)
	return s
}

function gap(scale: TaktConfig['spacing']['scale'], key: string): string {
	const g = scale[key]
	return g ? g.clamp : '1rem'
}

function buildTaktVars(config: TaktConfig): Record<string, string> {
	const hero = step(config, '4xl')
	const title = step(config, 'xl')
	const sub = step(config, 'lg')
	const body = step(config, 'base')
	const small = step(config, 'sm')
	const sc = config.spacing.scale

	return {
		'--demo-fs-hero': hero.fontSize.clamp,
		'--demo-lh-hero': hero.lineHeight.computed,
		'--demo-ls-hero': hero.letterSpacing.css,
		'--demo-fs-title': title.fontSize.clamp,
		'--demo-lh-title': title.lineHeight.computed,
		'--demo-ls-title': title.letterSpacing.css,
		'--demo-fs-sub': sub.fontSize.clamp,
		'--demo-lh-sub': sub.lineHeight.computed,
		'--demo-ls-sub': sub.letterSpacing.css,
		'--demo-fs-body': body.fontSize.clamp,
		'--demo-lh-body': body.lineHeight.computed,
		'--demo-ls-body': body.letterSpacing.css,
		'--demo-fs-small': small.fontSize.clamp,
		'--demo-lh-small': small.lineHeight.computed,
		'--demo-ls-small': small.letterSpacing.css,
		'--demo-space-xs': gap(sc, 'xs'),
		'--demo-space-s': gap(sc, 's'),
		'--demo-space-m': gap(sc, 'm'),
		'--demo-space-base': gap(sc, 'base'),
		'--demo-space-l': gap(sc, 'l'),
		'--demo-space-xl': gap(sc, 'xl'),
		'--demo-space-2xl': gap(sc, '2xl'),
	}
}

const NAIVE: Record<string, string> = {
	'--demo-fs-hero': 'clamp(2.25rem, 5vw, 3rem)',
	'--demo-lh-hero': '1.5',
	'--demo-ls-hero': 'normal',
	'--demo-fs-title': '1.5rem',
	'--demo-lh-title': '1.5',
	'--demo-ls-title': 'normal',
	'--demo-fs-sub': '1.125rem',
	'--demo-lh-sub': '1.5',
	'--demo-ls-sub': 'normal',
	'--demo-fs-body': '1rem',
	'--demo-lh-body': '1.5',
	'--demo-ls-body': 'normal',
	'--demo-fs-small': '0.875rem',
	'--demo-lh-small': '1.5',
	'--demo-ls-small': 'normal',
	'--demo-space-xs': '0.5rem',
	'--demo-space-s': '0.75rem',
	'--demo-space-m': '1rem',
	'--demo-space-base': '1.25rem',
	'--demo-space-l': '1.75rem',
	'--demo-space-xl': '2.5rem',
	'--demo-space-2xl': '3.5rem',
}

export function buildShowcaseTokenMaps(font: CuratedFont): {
	takt: Record<string, string>
	naive: Record<string, string>
	config: TaktConfig
} {
	const config = createTaktConfig({
		font: font.metrics,
		...DEFAULT_TAKT_INPUT,
	})
	return {
		takt: buildTaktVars(config),
		naive: NAIVE,
		config,
	}
}

export function buildDualShowcaseTokenMaps(
	displayFont: CuratedFont,
	bodyFont: CuratedFont,
): {
	takt: Record<string, string>
	naive: Record<string, string>
} {
	const displayCfg = createTaktConfig({ font: displayFont.metrics, ...DEFAULT_TAKT_INPUT })
	const bodyCfg = createTaktConfig({ font: bodyFont.metrics, ...DEFAULT_TAKT_INPUT })

	const dHero = step(displayCfg, '4xl')
	const dTitle = step(displayCfg, 'xl')
	const dSub = step(displayCfg, 'lg')
	const bBody = step(bodyCfg, 'base')
	const bSmall = step(bodyCfg, 'sm')
	const sc = bodyCfg.spacing.scale

	const takt: Record<string, string> = {
		...buildTaktVars(bodyCfg),
		'--demo-fs-hero': dHero.fontSize.clamp,
		'--demo-lh-hero': dHero.lineHeight.computed,
		'--demo-ls-hero': dHero.letterSpacing.css,
		'--demo-fs-title': dTitle.fontSize.clamp,
		'--demo-lh-title': dTitle.lineHeight.computed,
		'--demo-ls-title': dTitle.letterSpacing.css,
		'--demo-fs-sub': dSub.fontSize.clamp,
		'--demo-lh-sub': dSub.lineHeight.computed,
		'--demo-ls-sub': dSub.letterSpacing.css,
		'--demo-fs-body': bBody.fontSize.clamp,
		'--demo-lh-body': bBody.lineHeight.computed,
		'--demo-ls-body': bBody.letterSpacing.css,
		'--demo-fs-small': bSmall.fontSize.clamp,
		'--demo-lh-small': bSmall.lineHeight.computed,
		'--demo-ls-small': bSmall.letterSpacing.css,
		'--demo-space-xs': gap(sc, 'xs'),
		'--demo-space-s': gap(sc, 's'),
		'--demo-space-m': gap(sc, 'm'),
		'--demo-space-base': gap(sc, 'base'),
		'--demo-space-l': gap(sc, 'l'),
		'--demo-space-xl': gap(sc, 'xl'),
		'--demo-space-2xl': gap(sc, '2xl'),
	}

	return { takt, naive: NAIVE }
}
