'use client'
import { RhythmOverlay } from '@/components/shared/RhythmOverlay'
import { Slider } from '@/components/shared/Slider'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { computeLetterSpacing, computeLineHeight, normaliseMetrics } from '@takt/core'
import { AnimatePresence, animate, motion } from 'motion/react'
import { type CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import type { ChallengeKind, RoundSetup } from './GameClient'

interface GameRoundProps {
	round: number
	totalRounds: number
	setup: RoundSetup
	onSubmit: (playerValue: number) => void
}

function clamp(n: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, n))
}

function initialPlayerValue(setup: RoundSetup): number {
	const t = setup.targetValue
	const sign = Math.random() > 0.5 ? 1 : -1
	switch (setup.challenge) {
		case 'line-height':
			return clamp(t + sign * (0.15 + Math.random() * 0.15), setup.sliderMin, setup.sliderMax)
		case 'letter-spacing':
			return clamp(t + sign * (0.01 + Math.random() * 0.015), setup.sliderMin, setup.sliderMax)
		case 'font-size':
			return clamp(t + sign * (4 + Math.random() * 4), setup.sliderMin, setup.sliderMax)
		case 'spacing':
			return clamp(t + sign * (8 + Math.random() * 10), setup.sliderMin, setup.sliderMax)
	}
}

function challengeLabel(kind: ChallengeKind): string {
	switch (kind) {
		case 'line-height':
			return 'Line height'
		case 'letter-spacing':
			return 'Letter spacing'
		case 'font-size':
			return 'Font size'
		case 'spacing':
			return 'Spacing'
	}
}

function sliderLabel(kind: ChallengeKind): string {
	switch (kind) {
		case 'line-height':
			return 'Line height'
		case 'letter-spacing':
			return 'Letter spacing'
		case 'font-size':
			return 'Body size'
		case 'spacing':
			return 'Gap (heading → body)'
	}
}

function formatSliderValue(kind: ChallengeKind, value: number): string {
	switch (kind) {
		case 'line-height':
			return value.toFixed(2)
		case 'letter-spacing':
			return value.toFixed(3)
		case 'font-size':
			return value % 1 === 0 ? String(value) : value.toFixed(1)
		case 'spacing':
			return String(Math.round(value))
	}
}

/** What to show under “Adjust …” — never state the target value for the thing being guessed. */
function roundMetaHint(setup: RoundSetup): string {
	const { challenge, baseFontSize, headingFontSize } = setup
	switch (challenge) {
		case 'line-height':
			return `Body at ${baseFontSize}px · heading ${headingFontSize}px (context)`
		case 'letter-spacing':
			return `Heading at ${headingFontSize}px · body is dimmed context`
		case 'font-size':
			return `Line-height is fixed · heading ${headingFontSize}px for scale — find the body size`
		case 'spacing':
			return 'Tune the vertical gap between heading and body'
	}
}

function buildReasoning(setup: RoundSetup, metrics: ReturnType<typeof normaliseMetrics>): string {
	const { font, challenge, baseFontSize, headingFontSize, targetValue } = setup
	const name = font.name
	const x = metrics.xHeightRatio
	const xDesc = x > 0.75 ? 'high' : x < 0.65 ? 'low' : 'moderate'
	const w = metrics.avgCharWidthRatio
	const wDesc = w > 0.55 ? 'wide' : w < 0.45 ? 'narrow' : 'moderate'

	switch (challenge) {
		case 'line-height': {
			const lh = computeLineHeight(baseFontSize, metrics).value
			return `${name} has a ${xDesc} x-height ratio (${x.toFixed(3)}). At ${baseFontSize}px, takt computes ${lh.toFixed(2)} for balanced readability.`
		}
		case 'letter-spacing': {
			const ls = computeLetterSpacing(headingFontSize, metrics).value
			const sign = ls > 0 ? 'positive' : ls < 0 ? 'negative' : 'neutral'
			return `${name} at ${headingFontSize}px benefits from ${sign} tracking (${ls.toFixed(3)}em) given its ${wDesc} average character width (${w.toFixed(3)}).`
		}
		case 'font-size':
			return `Line-height ${setup.lockedLineHeight.toFixed(2)} was computed for ${targetValue}px. Off-size body text fights that leading—too small feels airy, too large feels cramped.`
		case 'spacing': {
			const lh = computeLineHeight(baseFontSize, metrics).value
			return `The rhythm unit (${baseFontSize}px × ${lh.toFixed(2)} ≈ ${targetValue.toFixed(1)}px) ties vertical spacing to one line of body text.`
		}
	}
}

export function GameRound({ round, totalRounds, setup, onSubmit }: GameRoundProps) {
	const metrics = useMemo(() => normaliseMetrics(setup.font.metrics, setup.font.name), [setup.font])
	const fontFamily = `${curatedFontFamilyCss(setup.font.name)}, system-ui, sans-serif`

	const [value, setValue] = useState(() => initialPlayerValue(setup))
	const [locked, setLocked] = useState(false)
	const [displayValue, setDisplayValue] = useState(() => initialPlayerValue(setup))

	useEffect(() => {
		if (!locked) setDisplayValue(value)
	}, [value, locked])

	const bodyFontSize = setup.challenge === 'font-size' ? displayValue : setup.baseFontSize
	const captionSize = Math.max(11, Math.round(bodyFontSize * 0.72))
	const captionLineHeight = computeLineHeight(captionSize, metrics).value
	const captionLetterSpacing = computeLetterSpacing(captionSize, metrics).value

	const bodyLineHeight = setup.challenge === 'line-height' ? displayValue : setup.lockedLineHeight
	const bodyLetterSpacing = computeLetterSpacing(bodyFontSize, metrics).value

	const headingLetterSpacingEm =
		setup.challenge === 'letter-spacing'
			? displayValue
			: computeLetterSpacing(setup.headingFontSize, metrics).value

	const gapPx = setup.challenge === 'spacing' ? displayValue : undefined

	const rhythmUnit = bodyFontSize * bodyLineHeight

	const handleLock = useCallback(() => {
		if (locked) return
		setLocked(true)
		onSubmit(value)
		animate(value, setup.targetValue, {
			duration: 0.65,
			ease: [0.23, 1, 0.32, 1],
			onUpdate: (v) => setDisplayValue(v),
		})
	}, [locked, onSubmit, setup.targetValue, value])

	const reasoning = useMemo(() => buildReasoning(setup, metrics), [setup, metrics])

	const showRhythm = locked && setup.challenge !== 'spacing'

	return (
		<motion.div
			className="game-round"
			initial={{ opacity: 0, x: 40 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
		>
			<div className="game-round__header">
				<span className="game-round__count">
					Round {round} of {totalRounds}
				</span>
				<span className="game-round__font">{setup.font.name}</span>
				<span className="game-round__challenge-badge">{challengeLabel(setup.challenge)}</span>
			</div>

			<div className="game-round__browser">
				<div
					className="game-round__preview-card"
					data-challenge={setup.challenge}
					style={{ '--rhythm-unit': `${rhythmUnit}px` } as CSSProperties}
				>
					<div className="game-round__preview-toolbar">
						<span className="game-round__challenge-pill">{challengeLabel(setup.challenge)}</span>
					</div>
					<div
						className="game-round__preview-body"
						style={{
							fontFamily,
							color: 'var(--c-fg)',
						}}
					>
						{showRhythm && <RhythmOverlay rhythmUnit={rhythmUnit} visible />}
						<div className="game-round__preview-body-inner">
							{setup.challenge === 'spacing' ? (
								<div className="game-round__composition game-round__composition--spacing">
									<h2
										className="game-round__composition-heading game-round__context"
										style={{
											fontSize: `${setup.headingFontSize}px`,
											lineHeight: setup.headingLineHeight,
											letterSpacing: `${computeLetterSpacing(setup.headingFontSize, metrics).value}em`,
											fontWeight: 600,
											margin: 0,
										}}
									>
										{setup.composition.heading}
									</h2>
									<div
										className="game-round__spacing-gap"
										style={{ height: `${gapPx}px` }}
										aria-hidden
									/>
									<p
										className="game-round__composition-body game-round__context"
										style={{
											fontSize: `${setup.baseFontSize}px`,
											lineHeight: setup.lockedLineHeight,
											letterSpacing: `${bodyLetterSpacing}em`,
											margin: 0,
										}}
									>
										{setup.composition.body}
									</p>
									{setup.composition.caption ? (
										<p
											className="game-round__composition-caption game-round__context"
											style={{
												fontSize: `${captionSize}px`,
												lineHeight: captionLineHeight,
												letterSpacing: `${captionLetterSpacing}em`,
												marginBlockStart: '0.75rem',
											}}
										>
											{setup.composition.caption}
										</p>
									) : null}
								</div>
							) : (
								<div className="game-round__composition">
									<h2
										className={`game-round__composition-heading ${setup.challenge === 'letter-spacing' ? 'game-round__active' : 'game-round__context'}`}
										style={{
											fontSize: `${setup.headingFontSize}px`,
											lineHeight: setup.headingLineHeight,
											letterSpacing: `${headingLetterSpacingEm}em`,
											fontWeight: 600,
											margin: 0,
											marginBlockEnd: '0.5rem',
										}}
									>
										{setup.composition.heading}
									</h2>
									<p
										className={`game-round__composition-body ${setup.challenge === 'line-height' || setup.challenge === 'font-size' ? 'game-round__active' : 'game-round__context'}`}
										style={{
											fontSize: `${bodyFontSize}px`,
											lineHeight: bodyLineHeight,
											letterSpacing: `${bodyLetterSpacing}em`,
											margin: 0,
										}}
									>
										{setup.composition.body}
									</p>
									{setup.composition.caption ? (
										<p
											className="game-round__composition-caption game-round__context"
											style={{
												fontSize: `${captionSize}px`,
												lineHeight: captionLineHeight,
												letterSpacing: `${captionLetterSpacing}em`,
												marginBlockStart: '0.75rem',
											}}
										>
											{setup.composition.caption}
										</p>
									) : null}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="game-round__side">
				<div className="game-round__meta">
					<p className="game-round__meta-line">
						<span className="game-round__meta-key">Adjust</span>{' '}
						<strong>{challengeLabel(setup.challenge)}</strong>
					</p>
					<p className="game-round__meta-line game-round__meta-mono">{roundMetaHint(setup)}</p>
				</div>
				<div className="game-round__controls">
					<Slider
						label={sliderLabel(setup.challenge)}
						value={value}
						min={setup.sliderMin}
						max={setup.sliderMax}
						step={setup.sliderStep}
						onChange={setValue}
						unit={setup.unit}
						formatValue={(v) => formatSliderValue(setup.challenge, v)}
						targetValue={locked ? setup.targetValue : undefined}
					/>
				</div>

				{!locked ? (
					<motion.button
						className="game-round__lock"
						onClick={handleLock}
						whileTap={{ scale: 0.96 }}
						type="button"
					>
						Lock in
					</motion.button>
				) : (
					<AnimatePresence>
						<motion.div
							className="game-round__reveal"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: 'spring', stiffness: 300, damping: 24 }}
						>
							<div className="game-round__optimal">
								<span>
									<span>takt optimal</span>
									<span>
										{formatSliderValue(setup.challenge, setup.targetValue)}
										{setup.unit}
									</span>
								</span>
								<span>
									<span>Your pick</span>
									<span>
										{formatSliderValue(setup.challenge, value)}
										{setup.unit}
									</span>
								</span>
							</div>
							<p className="game-round__reasoning">{reasoning}</p>
						</motion.div>
					</AnimatePresence>
				)}
			</div>
		</motion.div>
	)
}
