'use client'
import { useId, type CSSProperties } from 'react'
import { motion } from 'motion/react'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
  targetValue?: number  // For game reveal — shows a marker at the target
  unit?: string
}

export function Slider({ label, value, min, max, step, onChange, formatValue, targetValue, unit }: SliderProps) {
  const id = useId()
  const percent = ((value - min) / (max - min)) * 100
  const targetPercent = targetValue !== undefined ? ((targetValue - min) / (max - min)) * 100 : undefined

  return (
    <div className="takt-slider">
      <div className="takt-slider__header">
        <label htmlFor={id} className="takt-slider__label">{label}</label>
        <output className="takt-slider__value" aria-live="polite">
          {formatValue ? formatValue(value) : value}{unit}
        </output>
      </div>
      <div className="takt-slider__track-wrapper">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="takt-slider__input"
          style={{ '--slider-percent': `${percent}%` } as CSSProperties}
        />
        {targetPercent !== undefined && (
          <motion.div
            className="takt-slider__target"
            style={{ insetInlineStart: `${targetPercent}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        )}
      </div>
    </div>
  )
}
