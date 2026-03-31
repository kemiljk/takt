'use client'
import { motion } from 'motion/react'
import type { ChallengeKind, RoundResult } from './GameClient'

interface ResultsScreenProps {
	results: RoundResult[]
	onPlayAgain: () => void
}

function getRank(score: number): { label: string; emoji: string } {
	if (score >= 450) return { label: 'takt meister', emoji: '◆' }
	if (score >= 350) return { label: 'Master typographer', emoji: '◇' }
	if (score >= 200) return { label: 'Journeyman', emoji: '○' }
	return { label: 'Apprentice typographer', emoji: '·' }
}

function challengeShort(kind: ChallengeKind): string {
	switch (kind) {
		case 'line-height':
			return 'Leading'
		case 'letter-spacing':
			return 'Tracking'
		case 'font-size':
			return 'Size'
		case 'spacing':
			return 'Spacing'
	}
}

function formatComparison(r: RoundResult): string {
	const { playerValue, setup } = r
	const o = setup.targetValue
	switch (setup.challenge) {
		case 'line-height':
			return `${playerValue.toFixed(2)} → ${o.toFixed(2)}`
		case 'letter-spacing':
			return `${playerValue.toFixed(3)}em → ${o.toFixed(3)}em`
		case 'font-size': {
			const pf = playerValue % 1 === 0 ? String(playerValue) : playerValue.toFixed(1)
			const of = o % 1 === 0 ? String(o) : o.toFixed(1)
			return `${pf}px → ${of}px`
		}
		case 'spacing':
			return `${Math.round(playerValue)}px → ${Math.round(o)}px`
	}
}

export function ResultsScreen({ results, onPlayAgain }: ResultsScreenProps) {
	const totalScore = results.reduce((sum, r) => sum + r.score, 0)
	const rank = getRank(totalScore)

	const shareText = `I scored ${totalScore}/500 on the takt test — takt.style/game`
	const shareUrl = 'https://takt.style/game'

	const shareToX = () => {
		window.open(
			`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
			'_blank',
		)
	}

	const shareToLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
			'_blank',
		)
	}

	const copyLink = async () => {
		await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
	}

	return (
		<div className="game-results">
			<motion.div
				className="game-results__score-card"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: 'spring', stiffness: 300, damping: 24 }}
			>
				<div className="game-results__rank-icon">{rank.emoji}</div>
				<h1 className="game-results__score">
					{totalScore}
					<span>/500</span>
				</h1>
				<p className="game-results__rank">{rank.label}</p>
			</motion.div>

			<div className="game-results__breakdown">
				<h2>Round breakdown</h2>
				{results.map((r, i) => (
					<motion.div
						key={`${r.setup.font.name}-${r.setup.challenge}-${i}`}
						className="game-results__round"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 300, damping: 24 }}
					>
						<div className="game-results__round-header">
							<span className="game-results__round-num">Round {i + 1}</span>
							<span className="game-results__round-challenge">
								{challengeShort(r.setup.challenge)}
							</span>
							<span className="game-results__round-font">{r.setup.font.name}</span>
							<span className="game-results__round-score">{r.score}</span>
						</div>
						<div className="game-results__round-detail">
							<span>{formatComparison(r)}</span>
						</div>
					</motion.div>
				))}
			</div>

			<div className="game-results__share">
				<h2>Share your score</h2>
				<div className="game-results__share-buttons">
					<button type="button" onClick={shareToX} className="game-results__share-btn">
						Share on X
					</button>
					<button type="button" onClick={shareToLinkedIn} className="game-results__share-btn">
						Share on LinkedIn
					</button>
					<button type="button" onClick={copyLink} className="game-results__share-btn">
						Copy link
					</button>
				</div>
			</div>

			<div className="game-results__cta">
				<p>Want to develop your typographic eye?</p>
				<a href="https://designengineer.xyz" className="game-results__cta-link">
					Check out the d×e course at designengineer.xyz
				</a>
			</div>

			<div className="game-results__actions">
				<motion.button
					className="game-results__play-again"
					onClick={onPlayAgain}
					whileTap={{ scale: 0.96 }}
					type="button"
				>
					Play again
				</motion.button>
			</div>

			<footer className="game-results__footer">
				<p>
					Made by <a href="https://karlkoch.me">Karl Koch</a> ·{' '}
					<a href="https://designengineer.xyz">d×e</a>
				</p>
			</footer>
		</div>
	)
}
