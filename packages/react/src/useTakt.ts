'use client'
import { use } from 'react'
import { TaktContext } from './TaktProvider'

export function useTakt() {
  const config = use(TaktContext)
  if (!config) throw new Error('useTakt must be used within a TaktProvider')
  return config
}
