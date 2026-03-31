'use client'
import { motion } from 'motion/react'

interface IntroScreenProps {
	onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
	return (
		<div className="game-intro">
			<motion.div
				className="game-intro__content"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			>
				<h1 className="game-intro__title">takt test</h1>
				<p className="game-intro__subtitle">How well do you know your type?</p>
				<p className="game-intro__description">
					Each round, one typographic value is yours to set—line-height, letter-spacing, font size,
					or spacing. takt scores you against the optimal values derived from each font&apos;s
					metrics.
				</p>
				<div className="game-intro__actions">
					<p className="game-intro__rounds">5 rounds · 1 slider · 1 score</p>
					<motion.button
						className="game-intro__start"
						onClick={onStart}
						whileTap={{ scale: 0.96 }}
						type="button"
					>
						Start test
					</motion.button>
				</div>
			</motion.div>
			<div className="game-intro__attribution">
				Made by <a href="https://designengineer.xyz">d×e</a>
			</div>
		</div>
	)
}
