import { GameClient } from '@/components/game/GameClient'

export const metadata = {
	title: 'takt test — How well do you know your type?',
	description:
		"Five rounds, one slider each at a time. Line-height, letter-spacing, font size, or spacing — scored against takt's metric-driven optima.",
}

export default function GamePage() {
	return <GameClient />
}
