'use client'
import { FontSelector } from '@/components/shared/FontSelector'
import { MetricsVisualiser } from '@/components/shared/MetricsVisualiser'
import { Slider } from '@/components/shared/Slider'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import type { CuratedFont } from '@/lib/fonts-metrics'
import type { ScalePreset } from '@/lib/scale-presets'
import type { NormalisedFontMetrics } from '@takt/core'
import { LayoutGroup, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

const PRESET_PREVIEW_COUNT = 4

interface ConfigPanelProps {
	fonts: CuratedFont[]
	selectedFont: CuratedFont
	onFontChange: (font: CuratedFont) => void
	baseSize: number
	onBaseSizeChange: (value: number) => void
	ratio: number
	onRatioChange: (value: number) => void
	presets: ScalePreset[]
	stepsUp: number
	onStepsUpChange: (value: number) => void
	stepsDown: number
	onStepsDownChange: (value: number) => void
	vpMin: number
	onVpMinChange: (value: number) => void
	vpMax: number
	onVpMaxChange: (value: number) => void
	trim: boolean
	onTrimChange: (value: boolean) => void
	textBoxTrim: boolean
	onTextBoxTrimChange: (value: boolean) => void
	metrics: NormalisedFontMetrics
}

export function ConfigPanel({
	fonts,
	selectedFont,
	onFontChange,
	baseSize,
	onBaseSizeChange,
	ratio,
	onRatioChange,
	presets,
	stepsUp,
	onStepsUpChange,
	stepsDown,
	onStepsDownChange,
	vpMin,
	onVpMinChange,
	vpMax,
	onVpMaxChange,
	trim,
	onTrimChange,
	textBoxTrim,
	onTextBoxTrimChange,
	metrics,
}: ConfigPanelProps) {
	const [showAllPresets, setShowAllPresets] = useState(false)

	const bestPreset = useMemo(() => {
		return presets.reduce((closest, preset) =>
			Math.abs(preset.ratio - ratio) < Math.abs(closest.ratio - ratio) ? preset : closest,
		)
	}, [ratio, presets])

	useEffect(() => {
		const inPreview = presets.slice(0, PRESET_PREVIEW_COUNT).some((p) => p.name === bestPreset.name)
		if (!inPreview) setShowAllPresets(true)
	}, [bestPreset.name, presets])

	const visiblePresets = showAllPresets ? presets : presets.slice(0, PRESET_PREVIEW_COUNT)

	return (
		<div className="config-panel">
			<section className="config-section config-section--stagger">
				<h2 className="config-section__title">Font</h2>
				<FontSelector fonts={fonts} selected={selectedFont} onSelect={onFontChange} />
				<MetricsVisualiser metrics={metrics} fontFamily={curatedFontFamilyCss(selectedFont.name)} />
			</section>

			<section className="config-section config-section--stagger">
				<h2 className="config-section__title">Base size</h2>
				<Slider
					label="Font size at base"
					value={baseSize}
					min={12}
					max={24}
					step={0.5}
					onChange={onBaseSizeChange}
					formatValue={(v) => v.toFixed(1)}
					unit="px"
				/>
			</section>

			<section className="config-section config-section--stagger">
				<h2 className="config-section__title">Scale ratio</h2>
				<LayoutGroup id="preset-pills">
					<div className="config-preset-buttons">
						{visiblePresets.map((preset) => {
							const isActive = preset.name === bestPreset.name
							return (
								<button
									key={preset.name}
									type="button"
									className={`config-preset-btn ${isActive ? 'config-preset-btn--active' : ''}`}
									onClick={() => onRatioChange(preset.ratio)}
									title={preset.description}
								>
									{isActive && (
										<motion.span
											className="config-preset-btn__indicator"
											layoutId="preset-active-indicator"
											transition={{ type: 'spring', stiffness: 420, damping: 34 }}
										/>
									)}
									<span className="config-preset-btn__name">{preset.name}</span>
									<span className="config-preset-btn__ratio">{preset.ratio.toFixed(3)}</span>
								</button>
							)
						})}
					</div>
				</LayoutGroup>
				{presets.length > PRESET_PREVIEW_COUNT && (
					<button
						type="button"
						className="config-preset-more"
						onClick={() => setShowAllPresets((v) => !v)}
						aria-expanded={showAllPresets}
					>
						{showAllPresets ? 'Show fewer ratios' : 'More ratios'}
					</button>
				)}
				<Slider
					label="Custom ratio"
					value={ratio}
					min={1.01}
					max={2}
					step={0.01}
					onChange={onRatioChange}
					formatValue={(v) => v.toFixed(2)}
				/>
			</section>

			<details className="config-advanced">
				<summary className="config-advanced__summary">
					<span>Advanced</span>
					<span className="config-advanced__chevron" aria-hidden />
				</summary>
				<div className="config-advanced__body">
					<section className="config-section">
						<h2 className="config-section__title">Steps</h2>
						<Slider
							label="Steps up"
							value={stepsUp}
							min={1}
							max={8}
							step={1}
							onChange={onStepsUpChange}
						/>
						<Slider
							label="Steps down"
							value={stepsDown}
							min={1}
							max={4}
							step={1}
							onChange={onStepsDownChange}
						/>
					</section>

					<section className="config-section">
						<h2 className="config-section__title">Viewport range</h2>
						<Slider
							label="Minimum viewport"
							value={vpMin}
							min={320}
							max={800}
							step={10}
							onChange={onVpMinChange}
							formatValue={(v) => v.toFixed(0)}
							unit="px"
						/>
						<Slider
							label="Maximum viewport"
							value={vpMax}
							min={800}
							max={2560}
							step={10}
							onChange={onVpMaxChange}
							formatValue={(v) => v.toFixed(0)}
							unit="px"
						/>
					</section>

					<section className="config-section">
						<h2 className="config-section__title">Trimming</h2>
						<div className="config-toggle">
							<input
								type="checkbox"
								id="trim"
								checked={trim}
								onChange={(e) => onTrimChange(e.target.checked)}
								className="config-toggle__input"
							/>
							<label htmlFor="trim" className="config-toggle__label">
								Include text-trim
							</label>
						</div>
						<div className="config-toggle">
							<input
								type="checkbox"
								id="textboxtrim"
								checked={textBoxTrim}
								onChange={(e) => onTextBoxTrimChange(e.target.checked)}
								className="config-toggle__input"
							/>
							<label htmlFor="textboxtrim" className="config-toggle__label">
								Text-box-trim <span className="config-toggle__badge">experimental</span>
							</label>
						</div>
					</section>
				</div>
			</details>
		</div>
	)
}
