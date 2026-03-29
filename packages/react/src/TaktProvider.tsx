'use client'
import { createContext, type ReactNode } from 'react'
import type { TaktConfig } from '@takt/core'

export const TaktContext = createContext<TaktConfig | null>(null)

interface TaktProviderProps {
  config: TaktConfig
  children: ReactNode
}

export function TaktProvider({ config, children }: TaktProviderProps) {
  return <TaktContext value={config}>{children}</TaktContext>
}
