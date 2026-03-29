'use client'
import { motion, AnimatePresence } from 'motion/react'

interface RhythmOverlayProps {
  rhythmUnit: number  // px
  visible: boolean
}

export function RhythmOverlay({ rhythmUnit, visible }: RhythmOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="rhythm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            '--rhythm-unit': `${rhythmUnit}px`,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}
