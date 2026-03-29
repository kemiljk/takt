import type { TaktConfig } from '../types'

export function generateJSON(config: TaktConfig, pretty: boolean = true): string {
  return JSON.stringify(config, null, pretty ? 2 : undefined)
}
