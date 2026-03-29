'use client'
import { useState, useCallback } from 'react'
import type { CuratedFont } from '@/lib/fonts-metrics'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { GAME_CONTENTS, GAME_VIEWPORTS } from '@/lib/game-content'
import type { GameContent } from '@/lib/game-content'
import { IntroScreen } from './IntroScreen'
import { GameRound } from './GameRound'
import { ResultsScreen } from './ResultsScreen'
import './game.css'

type GamePhase = 'intro' | 'playing' | 'results'

export interface RoundSetup {
  font: CuratedFont
  content: GameContent
  viewport: number
}

export interface RoundResult {
  setup: RoundSetup
  playerFontSize: number
  playerLineHeight: number
  optimalFontSize: number
  optimalLineHeight: number
  fontSizeScore: number
  lineHeightScore: number
  totalScore: number
}

function generateRounds(): RoundSetup[] {
  const shuffledFonts = [...CURATED_FONTS].sort(() => Math.random() - 0.5)
  const shuffledContents = [...GAME_CONTENTS].sort(() => Math.random() - 0.5)
  
  // Ensure content type variety: try to pick different types
  const contentTypes = ['article', 'pullquote', 'card', 'caption', 'navigation'] as const
  const pickedContents: GameContent[] = []
  for (const type of contentTypes) {
    const match = shuffledContents.find(c => c.type === type && !pickedContents.includes(c))
    if (match) pickedContents.push(match)
  }
  // Fill remaining with random
  while (pickedContents.length < 5) {
    const next = shuffledContents.find(c => !pickedContents.includes(c))
    if (next) pickedContents.push(next)
    else break
  }

  const shuffledViewports = [...GAME_VIEWPORTS].sort(() => Math.random() - 0.5)

  return Array.from({ length: 5 }, (_, i) => ({
    font: shuffledFonts[i]!,
    content: pickedContents[i]!,
    viewport: shuffledViewports[i % shuffledViewports.length]!,
  }))
}

// Bell curve scoring: closer = higher score
function scoreValue(player: number, optimal: number, tolerance: number): number {
  const delta = Math.abs(player - optimal)
  // Gaussian-ish curve: score = 100 * e^(-(delta/tolerance)^2)
  const score = 100 * Math.exp(-Math.pow(delta / tolerance, 2))
  return Math.round(score)
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

  const submitRound = useCallback((playerFontSize: number, playerLineHeight: number, optimalFontSize: number, optimalLineHeight: number) => {
    const fontSizeScore = scoreValue(playerFontSize, optimalFontSize, 3) // ±3px tolerance
    const lineHeightScore = scoreValue(playerLineHeight, optimalLineHeight, 0.1) // ±0.1 tolerance

    const result: RoundResult = {
      setup: rounds[currentRound]!,
      playerFontSize,
      playerLineHeight,
      optimalFontSize,
      optimalLineHeight,
      fontSizeScore,
      lineHeightScore,
      totalScore: Math.round((fontSizeScore + lineHeightScore) / 2),
    }

    const newResults = [...results, result]
    setResults(newResults)

    if (currentRound < 4) {
      // Short delay then next round
      setTimeout(() => setCurrentRound(c => c + 1), 2000)
    } else {
      // Game over
      setTimeout(() => setPhase('results'), 2500)
    }
  }, [rounds, currentRound, results])

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
}
