'use client'
import { RhythmOverlay } from '@/components/shared/RhythmOverlay'
import type { TaktConfig } from '@takt/core'
import { motion } from 'motion/react'
import type { CSSProperties } from 'react'

interface PreviewPanelProps {
	config: TaktConfig
	fontFamily: string
	showRhythm: boolean
	onToggleRhythm: () => void
	rhythmMode: 'takt' | 'arbitrary'
	onRhythmModeChange: (mode: 'takt' | 'arbitrary') => void
}

export function PreviewPanel({
	config,
	fontFamily,
	showRhythm,
	onToggleRhythm,
	rhythmMode,
	onRhythmModeChange,
}: PreviewPanelProps) {
	return (
		<div className="preview">
			<div className="preview__specimen">
				<div className="preview__steps">
					{config.steps.map((step, index) => (
						<motion.div
							key={step.name}
							className="preview__step"
							layout="position"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								opacity: { duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] },
								y: { duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] },
								layout: { type: 'spring', stiffness: 380, damping: 32 },
							}}
							style={{ fontFamily }}
						>
							<motion.div
								className="preview__step-body"
								layout
								style={{
									fontSize: step.fontSize.clamp,
									lineHeight: step.lineHeight.computed,
									letterSpacing: step.letterSpacing.css,
								}}
								transition={{ type: 'spring', stiffness: 420, damping: 34 }}
							>
								<span className="preview__step-name">{step.name}</span>
								<span className="preview__step-sample">The quick brown fox</span>
								<span className="preview__step-values">
									{step.fontSize.max.toFixed(2)}px · {step.lineHeight.computed} ·{' '}
									{step.letterSpacing.css}
								</span>
							</motion.div>
						</motion.div>
					))}
				</div>

				<div className="preview__article-wrap">
					<article className="preview__article">
						<div className="preview__article-toolbar">
							<div className="preview__toolbar-cluster">
								<span className="preview__toolbar-label" id="preview-rhythm-label">
									Rhythm grid
								</span>
								<div
									className="preview__segmented"
									role="group"
									aria-labelledby="preview-rhythm-label"
								>
									<button
										type="button"
										className={`preview__segment-btn ${!showRhythm ? 'preview__segment-btn--active' : ''}`}
										aria-pressed={!showRhythm}
										onClick={() => {
											if (showRhythm) onToggleRhythm()
										}}
									>
										Off
									</button>
									<button
										type="button"
										className={`preview__segment-btn ${showRhythm ? 'preview__segment-btn--active' : ''}`}
										aria-pressed={showRhythm}
										onClick={() => {
											if (!showRhythm) onToggleRhythm()
										}}
									>
										On
									</button>
								</div>
							</div>
							<div className="preview__toolbar-cluster">
								<span className="preview__toolbar-label" id="preview-spacing-label">
									Sample spacing
								</span>
								<div
									className="preview__segmented"
									role="radiogroup"
									aria-labelledby="preview-spacing-label"
								>
									<button
										type="button"
										role="radio"
										aria-checked={rhythmMode === 'takt'}
										className={`preview__segment-btn ${rhythmMode === 'takt' ? 'preview__segment-btn--active' : ''}`}
										onClick={() => onRhythmModeChange('takt')}
									>
										Takt
									</button>
									<button
										type="button"
										role="radio"
										aria-checked={rhythmMode === 'arbitrary'}
										className={`preview__segment-btn ${rhythmMode === 'arbitrary' ? 'preview__segment-btn--active' : ''}`}
										onClick={() => onRhythmModeChange('arbitrary')}
									>
										Arbitrary
									</button>
								</div>
							</div>
						</div>

						<div className="preview__article-body">
							<RhythmOverlay rhythmUnit={config.spacing.rhythmUnit} visible={showRhythm} />
							<motion.div
								key={fontFamily}
								className="preview__article-inner"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
								style={{ fontFamily }}
							>
								<SampleArticle config={config} rhythmMode={rhythmMode} />
							</motion.div>
						</div>
					</article>
				</div>
			</div>
		</div>
	)
}

function SampleArticle({
	config,
	rhythmMode,
}: { config: TaktConfig; rhythmMode: 'takt' | 'arbitrary' }) {
	const isTakt = rhythmMode === 'takt'
	const scale = config.spacing.scale

	const taktGap = (key: string): string => {
		const entry = scale[key]
		return entry ? entry.clamp : '1rem'
	}

	const arbitraryGap: Record<string, string> = {
		xl: '52px',
		l: '35px',
		base: '18px',
		m: '11px',
		s: '6px',
	}

	const gap = (key: string): string => (isTakt ? taktGap(key) : (arbitraryGap[key] ?? '16px'))

	const getStep = (name: string) => config.steps.find((s) => s.name === name)
	const step0 = config.steps[0]
	if (!step0) return null
	const last = config.steps[config.steps.length - 1] ?? step0
	const body = getStep('base') ?? step0
	const heading = getStep('4xl') ?? getStep('3xl') ?? last
	const subheading = getStep('xl') ?? getStep('lg') ?? body
	const caption = getStep('xs') ?? getStep('sm') ?? step0

	const sectionStyle = (token: string): CSSProperties => ({
		paddingBlockStart: gap(token),
		borderBlockStart: isTakt ? 'none' : '1px dashed var(--c-border-subtle)',
	})

	return (
		<div className="sample-article" data-mode={rhythmMode}>
			<h2
				style={{
					fontSize: heading.fontSize.clamp,
					lineHeight: heading.lineHeight.computed,
					letterSpacing: heading.letterSpacing.css,
					marginBlockEnd: gap('m'),
				}}
			>
				Space is not emptiness
			</h2>
			<h3
				style={{
					fontSize: subheading.fontSize.clamp,
					lineHeight: subheading.lineHeight.computed,
					letterSpacing: subheading.letterSpacing.css,
					color: 'var(--c-fg-muted)',
					marginBlockEnd: gap('l'),
				}}
			>
				It is the structure that gives typography meaning
			</h3>
			<p
				style={{
					fontSize: body.fontSize.clamp,
					lineHeight: body.lineHeight.computed,
					letterSpacing: body.letterSpacing.css,
					maxInlineSize: '65ch',
					marginBlockEnd: gap('base'),
					...sectionStyle('base'),
				}}
			>
				When we talk about typographic systems, we often focus on the visible: typeface selection,
				font sizes, weights. But the invisible — the space between and around elements — is what
				transforms a collection of styled text into a coherent visual language. Takt derives this
				space from the font itself.
			</p>
			<blockquote
				style={{
					fontSize: subheading.fontSize.clamp,
					lineHeight: subheading.lineHeight.computed,
					letterSpacing: subheading.letterSpacing.css,
					borderInlineStart: '2px solid var(--c-accent)',
					paddingInlineStart: gap('base'),
					marginBlockEnd: gap('l'),
				}}
			>
				"Typography is the craft of endowing human language with a durable visual form."
			</blockquote>
			<p
				style={{
					fontSize: body.fontSize.clamp,
					lineHeight: body.lineHeight.computed,
					letterSpacing: body.letterSpacing.css,
					maxInlineSize: '65ch',
					marginBlockEnd: gap('base'),
					...sectionStyle('base'),
				}}
			>
				The rhythm unit — body font-size multiplied by body line-height — becomes the atomic unit of
				space. Every margin, every padding, every gap in the layout is a rational fraction or
				multiple of this unit. Change the font, and the entire spatial system recalibrates.
			</p>
			<p
				style={{
					fontSize: caption.fontSize.clamp,
					lineHeight: caption.lineHeight.computed,
					letterSpacing: caption.letterSpacing.css,
					color: 'var(--c-fg-muted)',
					...sectionStyle('s'),
				}}
			>
				Fig 1. A typographic system derived from {config.font.familyName} at{' '}
				{body.fontSize.max.toFixed(2)}px with a rhythm unit of {config.spacing.rhythmUnit}px.
			</p>
		</div>
	)
}
