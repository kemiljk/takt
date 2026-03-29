'use client'
import { RhythmOverlay } from '@/components/shared/RhythmOverlay'
import { Slider } from '@/components/shared/Slider'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { computeLineHeight, normaliseMetrics } from '@takt/core'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import type { RoundSetup } from './GameClient'

interface GameRoundProps {
	round: number
	totalRounds: number
	setup: RoundSetup
	onSubmit: (
		playerFontSize: number,
		playerLineHeight: number,
		optimalFontSize: number,
		optimalLineHeight: number,
	) => void
}

export function GameRound({ round, totalRounds, setup, onSubmit }: GameRoundProps) {
	const metrics = useMemo(() => normaliseMetrics(setup.font.metrics, setup.font.name), [setup.font])

	// Compute optimal values
	const optimalFontSize = useMemo(() => {
		const type = setup.content.type
		const vw = setup.viewport
		if (type === 'caption') return Math.round(12 + (vw - 320) * 0.004)
		if (type === 'pullquote') return Math.round(20 + (vw - 320) * 0.012)
		if (type === 'navigation') return Math.round(14 + (vw - 320) * 0.004)
		if (type === 'card') return Math.round(15 + (vw - 320) * 0.005)
		// article
		return Math.round(15 + (vw - 320) * 0.006)
	}, [setup])

	const optimalLineHeight = useMemo(() => {
		return computeLineHeight(optimalFontSize, metrics).value
	}, [optimalFontSize, metrics])

	// Start at deliberately wrong values
	const [fontSize, setFontSize] = useState(() => {
		const offset = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 4)
		return Math.round(Math.max(10, Math.min(48, optimalFontSize + offset)))
	})
	const [lineHeight, setLineHeight] = useState(() => {
		const offset = (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.15)
		return Math.round(Math.max(0.9, Math.min(2.2, optimalLineHeight + offset)) * 100) / 100
	})

	const [locked, setLocked] = useState(false)

	const handleLock = () => {
		setLocked(true)
		onSubmit(fontSize, lineHeight, optimalFontSize, optimalLineHeight)
	}

	const rhythmUnit = optimalFontSize * optimalLineHeight

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
				<span className="game-round__type">{setup.content.label}</span>
			</div>

			{/* Browser chrome hint */}
			<div className="game-round__browser">
				<div className="game-round__url-bar">
					<span className="game-round__viewport-badge">{setup.viewport}px</span>
				</div>
				<div
					className="game-round__preview"
					style={{
						maxInlineSize: `${setup.viewport}px`,
						fontSize: `${fontSize}px`,
						lineHeight: lineHeight,
						fontFamily: `${curatedFontFamilyCss(setup.font.name)}, system-ui, serif`,
						position: 'relative',
					}}
				>
					<RhythmOverlay rhythmUnit={rhythmUnit} visible={locked} />

					{setup.content.type === 'card' && setup.content.secondaryText ? (
						<div>
							<strong>{setup.content.text}</strong>
							<p>{setup.content.secondaryText}</p>
						</div>
					) : (
						<p>{setup.content.text}</p>
					)}
				</div>
			</div>

			{/* Controls */}
			<div className="game-round__controls">
				<Slider
					label="Font size"
					value={fontSize}
					min={10}
					max={48}
					step={1}
					onChange={setFontSize}
					unit="px"
					targetValue={locked ? optimalFontSize : undefined}
				/>
				<Slider
					label="Line height"
					value={lineHeight}
					min={0.9}
					max={2.2}
					step={0.01}
					onChange={setLineHeight}
					targetValue={locked ? optimalLineHeight : undefined}
				/>
			</div>

			{!locked ? (
				<motion.button className="game-round__lock" onClick={handleLock} whileTap={{ scale: 0.96 }}>
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
								Takt optimal: {optimalFontSize}px / {optimalLineHeight.toFixed(2)}
							</span>
							<span>
								Your pick: {fontSize}px / {lineHeight.toFixed(2)}
							</span>
						</div>
						<p className="game-round__reasoning">
							{setup.font.name} has a{' '}
							{metrics.xHeightRatio > 0.75
								? 'high'
								: metrics.xHeightRatio < 0.65
									? 'low'
									: 'moderate'}{' '}
							x-height ratio ({metrics.xHeightRatio.toFixed(3)}). At {optimalFontSize}px, Takt
							computes a line-height of {optimalLineHeight.toFixed(2)} to balance readability with
							visual density.
						</p>
					</motion.div>
				</AnimatePresence>
			)}
		</motion.div>
	)
}
