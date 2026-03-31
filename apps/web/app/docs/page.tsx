import { DocsPage } from '@/components/docs/DocsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Documentation — takt',
	description:
		'Learn how @takt/core turns font metrics into line-height, letter-spacing, type scale, spacing tokens, and exportable CSS, Tailwind, and design tokens.',
	openGraph: {
		title: 'Documentation — takt',
		description: 'Type-and-space system from font metrics — concepts, API, and output formats.',
		url: 'https://takt.style/docs',
	},
}

export default function DocsRoute() {
	return <DocsPage />
}
