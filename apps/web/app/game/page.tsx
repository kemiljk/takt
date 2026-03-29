import { GameClient } from '@/components/game/GameClient'

export const metadata = {
  title: 'Takt Test — How good is your typographic eye?',
  description: 'Test your typographic instincts in 5 rounds. Set the ideal type size and line-height, then see how close you are to the mathematically optimal values.',
}

export default function GamePage() {
  return <GameClient />
}
