'use client'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const stored = localStorage.getItem('takt-theme') as 'light' | 'dark' | null
    setTheme(stored || preferred)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('takt-theme', theme)
  }, [theme])

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'light' ? '◐' : '◑'}
      </span>
    </button>
  )
}
