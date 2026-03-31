'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { SCALE_PRESETS } from '@/lib/scale-presets'
import {
	createTaktConfig,
	generateCSS,
	generateJSON,
	generateTailwind,
	generateTokens,
} from '@takt/core'
import type { TaktConfig } from '@takt/core'
import { parseAsBoolean, parseAsFloat, parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { ConfigPanel } from './ConfigPanel'
import { ExportPanel } from './ExportPanel'
import { PreviewPanel } from './PreviewPanel'
import './playground.css'

export function Playground() {
	const [fontName, setFontName] = useQueryState('font', parseAsString.withDefault('Inter'))
	const [baseSize, setBaseSize] = useQueryState('base', parseAsFloat.withDefault(16))
	const [ratio, setRatio] = useQueryState('ratio', parseAsFloat.withDefault(1.25))
	const [stepsUp, setStepsUp] = useQueryState('up', parseAsInteger.withDefault(5))
	const [stepsDown, setStepsDown] = useQueryState('down', parseAsInteger.withDefault(2))
	const [vpMin, setVpMin] = useQueryState('vpmin', parseAsInteger.withDefault(320))
	const [vpMax, setVpMax] = useQueryState('vpmax', parseAsInteger.withDefault(1440))
	const [trim, setTrim] = useQueryState('trim', parseAsBoolean.withDefault(true))
	const [textBoxTrim, setTextBoxTrim] = useQueryState('tbt', parseAsBoolean.withDefault(false))
	const [showRhythm, setShowRhythm] = useState(false)
	const [rhythmMode, setRhythmMode] = useState<'takt' | 'arbitrary'>('takt')

	const selectedFont = useMemo(() => {
		const match = CURATED_FONTS.find((f) => f.name === fontName) ?? CURATED_FONTS[0]
		if (!match) {
			throw new Error('CURATED_FONTS must not be empty')
		}
		return match
	}, [fontName])

	const config = useMemo<TaktConfig>(
		() =>
			createTaktConfig({
				font: selectedFont.metrics,
				familyName: selectedFont.name,
				baseSize,
				ratio,
				stepsUp,
				stepsDown,
				viewportMin: vpMin,
				viewportMax: vpMax,
				trim,
				textBoxTrim,
			}),
		[selectedFont, baseSize, ratio, stepsUp, stepsDown, vpMin, vpMax, trim, textBoxTrim],
	)

	const outputs = useMemo(
		() => ({
			css: generateCSS(config),
			tailwind: JSON.stringify(generateTailwind(config), null, 2),
			tokens: JSON.stringify(generateTokens(config), null, 2),
			json: generateJSON(config),
		}),
		[config],
	)

	return (
		<div className="playground">
			<div className="playground__layout">
				<aside className="playground__config">
					<div className="playground__config-scroll">
						<ConfigPanel
							fonts={CURATED_FONTS}
							selectedFont={selectedFont}
							onFontChange={(f) => setFontName(f.name)}
							baseSize={baseSize}
							onBaseSizeChange={setBaseSize}
							ratio={ratio}
							onRatioChange={setRatio}
							presets={SCALE_PRESETS}
							stepsUp={stepsUp}
							onStepsUpChange={setStepsUp}
							stepsDown={stepsDown}
							onStepsDownChange={setStepsDown}
							vpMin={vpMin}
							onVpMinChange={setVpMin}
							vpMax={vpMax}
							onVpMaxChange={setVpMax}
							trim={trim}
							onTrimChange={setTrim}
							textBoxTrim={textBoxTrim}
							onTextBoxTrimChange={setTextBoxTrim}
							metrics={config.font}
						/>
					</div>

					<footer className="playground__attribution">
						<p>
							<a href="https://karlkoch.me">Karl Koch</a>
							{' · '}
							<a href="https://designengineer.xyz">d×e</a>
						</p>
					</footer>
				</aside>

				<main className="playground__preview">
					<PreviewPanel
						config={config}
						fontFamily={curatedFontFamilyCss(selectedFont.name)}
						showRhythm={showRhythm}
						onToggleRhythm={() => setShowRhythm((v) => !v)}
						rhythmMode={rhythmMode}
						onRhythmModeChange={setRhythmMode}
					/>
				</main>
			</div>

			<section className="playground__export">
				<ExportPanel outputs={outputs} />
			</section>
		</div>
	)
}
