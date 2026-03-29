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
        <h1 className="game-intro__title">Takt Test</h1>
        <p className="game-intro__subtitle">How good is your typographic eye?</p>
        <p className="game-intro__description">
          Set the ideal font size and line-height for randomised content.
          Takt will score how close you get to the mathematically optimal values
          derived from each font's metrics.
        </p>
        <p className="game-intro__rounds">5 rounds · 2 sliders · 1 score</p>
        <motion.button
          className="game-intro__start"
          onClick={onStart}
          whileTap={{ scale: 0.96 }}
        >
          Start test
        </motion.button>
      </motion.div>
      <div className="game-intro__attribution">
        Made by <a href="https://designengineer.xyz">d×e</a>
      </div>
    </div>
  )
}
