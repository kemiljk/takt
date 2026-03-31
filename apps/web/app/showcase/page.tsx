import { ShowcasePage } from '@/components/showcase/ShowcasePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Showcase — takt',
	description:
		'Explore one-page site mocks in different genres with Takt typography on or off — SaaS, editorial, agency, dashboard, docs, and portfolio.',
	openGraph: {
		title: 'Showcase — takt',
		description: 'Six site-style previews with metric-driven typography.',
		url: 'https://takt.style/showcase',
	},
}

export default function ShowcaseRoute() {
	return <ShowcasePage />
}
