'use client'
import type { CuratedFont } from '@/lib/fonts-metrics'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { GAME_COMPOSITIONS, type GameComposition } from '@/lib/game-content'
import { computeLetterSpacing, computeLineHeight, normaliseMetrics } from '@takt/core'
import { useCallback, useState } from 'react'
import { GameRound } from './GameRound'
import { IntroScreen } from './IntroScreen'
import { ResultsScreen } from './ResultsScreen'
import '@/components/shared/slider.css'
import './game.css'

export type ChallengeKind = 'line-height' | 'letter-spacing' | 'font-size' | 'spacing'

type GamePhase = 'intro' | 'playing' | 'results'

const TOLERANCES: Record<ChallengeKind, number> = {
	'line-height': 0.08,
	'letter-spacing': 0.006,
	'font-size': 2.5,
	spacing: 4,
}

export interface RoundSetup {
	font: CuratedFont
	challenge: ChallengeKind
	composition: GameComposition
	baseFontSize: number
	headingFontSize: number
	targetValue: number
	sliderMin: number
	sliderMax: number
	sliderStep: number
	unit: string
	tolerance: number
	lockedLineHeight: number
	headingLineHeight: number
}

export interface RoundResult {
	setup: RoundSetup
	playerValue: number
	score: number
}

function shuffle<T>(array: T[]): T[] {
	const a = [...array]
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const ai = a[i]
		const aj = a[j]
		if (ai === undefined || aj === undefined) continue
		a[i] = aj
		a[j] = ai
	}
	return a
}

function generateChallengeSequence(): ChallengeKind[] {
	const kinds: ChallengeKind[] = ['line-height', 'letter-spacing', 'font-size', 'spacing']
	const firstFour = shuffle([...kinds])
	const pick = Math.floor(Math.random() * kinds.length)
	const fifth = kinds[pick] ?? 'spacing'
	return shuffle([...firstFour, fifth])
}

function buildRoundSetup(
	font: CuratedFont,
	composition: GameComposition,
	challenge: ChallengeKind,
): RoundSetup {
	const metrics = normaliseMetrics(font.metrics, font.name)
	const baseFontSize = Math.round(15 + Math.random() * 4)
	const headingFontSize = Math.round(28 + Math.random() * 12)

	const lineHeightBody = computeLineHeight(baseFontSize, metrics).value
	const lineHeightHeading = computeLineHeight(headingFontSize, metrics).value
	const letterSpacingHeading = computeLetterSpacing(headingFontSize, metrics).value
	const rhythmUnit = baseFontSize * lineHeightBody

	switch (challenge) {
		case 'line-height':
			return {
				font,
				challenge,
				composition,
				baseFontSize,
				headingFontSize,
				targetValue: lineHeightBody,
				sliderMin: 1.0,
				sliderMax: 2.0,
				sliderStep: 0.01,
				unit: '',
				tolerance: TOLERANCES['line-height'],
				lockedLineHeight: lineHeightBody,
				headingLineHeight: lineHeightHeading,
			}
		case 'letter-spacing':
			return {
				font,
				challenge,
				composition,
				baseFontSize,
				headingFontSize,
				targetValue: letterSpacingHeading,
				sliderMin: -0.06,
				sliderMax: 0.04,
				sliderStep: 0.001,
				unit: 'em',
				tolerance: TOLERANCES['letter-spacing'],
				lockedLineHeight: lineHeightBody,
				headingLineHeight: lineHeightHeading,
			}
		case 'font-size':
			return {
				font,
				challenge,
				composition,
				baseFontSize,
				headingFontSize,
				targetValue: baseFontSize,
				sliderMin: 10,
				sliderMax: 32,
				sliderStep: 0.5,
				unit: 'px',
				tolerance: TOLERANCES['font-size'],
				lockedLineHeight: lineHeightBody,
				headingLineHeight: lineHeightHeading,
			}
		case 'spacing':
			return {
				font,
				challenge,
				composition,
				baseFontSize,
				headingFontSize,
				targetValue: rhythmUnit,
				sliderMin: 4,
				sliderMax: 64,
				sliderStep: 1,
				unit: 'px',
				tolerance: TOLERANCES.spacing,
				lockedLineHeight: lineHeightBody,
				headingLineHeight: lineHeightHeading,
			}
	}
}

function generateRounds(): RoundSetup[] {
	const fonts = shuffle([...CURATED_FONTS]).slice(0, 5)
	const compositions = shuffle([...GAME_COMPOSITIONS])
	const challenges = generateChallengeSequence()

	return Array.from({ length: 5 }, (_, i) => {
		const font = fonts[i]
		const composition = compositions[i]
		const challenge = challenges[i]
		if (!font || !composition || !challenge) {
			throw new Error('generateRounds: missing font, composition, or challenge')
		}
		return buildRoundSetup(font, composition, challenge)
	})
}

function scoreValue(player: number, optimal: number, tolerance: number): number {
	const delta = Math.abs(player - optimal)
	return Math.round(100 * Math.exp(-((delta / tolerance) ** 2)))
}

export function GameClient() {
	const [phase, setPhase] = useState<GamePhase>('intro')
	const [rounds, setRounds] = useState<RoundSetup[]>([])
	const [results, setResults] = useState<RoundResult[]>([])
	const [currentRound, setCurrentRound] = useState(0)

	const startGame = useCallback(() => {
		setRounds(generateRounds())
		setResults([])
		setCurrentRound(0)
		setPhase('playing')
	}, [])

	const submitRound = useCallback(
		(playerValue: number) => {
			const setup = rounds[currentRound]
			if (!setup) return
			const score = scoreValue(playerValue, setup.targetValue, setup.tolerance)
			const result: RoundResult = { setup, playerValue, score }
			setResults((prev) => [...prev, result])

			if (currentRound < 4) {
				setTimeout(() => setCurrentRound((c) => c + 1), 2000)
			} else {
				setTimeout(() => setPhase('results'), 2500)
			}
		},
		[rounds, currentRound],
	)

	const content = (() => {
		if (phase === 'intro') return <IntroScreen onStart={startGame} />
		if (phase === 'results') return <ResultsScreen results={results} onPlayAgain={startGame} />
		const setup = rounds[currentRound]
		if (!setup) return null
		return (
			<GameRound
				key={currentRound}
				round={currentRound + 1}
				totalRounds={5}
				setup={setup}
				onSubmit={submitRound}
			/>
		)
	})()

	return <>{content}</>
}
