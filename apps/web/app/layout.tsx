import { curatedPlaygroundFontVariableClasses } from '@/lib/curated-google-fonts'
import { HostGrotesk, MartianMono, TaktWordmark } from '@/lib/fonts'
import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
	title: 'Takt — A type-and-space system from font metrics',
	description:
		'Generate a complete, harmonious type-and-space system from font metrics. The first tool to close the loop between how a font is shaped and how space should behave around it.',
	keywords: [
		'typography',
		'type scale',
		'design system',
		'spacing',
		'vertical rhythm',
		'font metrics',
	],
	authors: [{ name: 'Karl Koch', url: 'https://karlkoch.me' }],
	openGraph: {
		title: 'Takt — A type-and-space system from font metrics',
		description: 'Generate a complete, harmonious type-and-space system from font metrics.',
		url: 'https://takt.style',
		siteName: 'Takt',
		type: 'website',
	},
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={`${TaktWordmark.variable} ${HostGrotesk.variable} ${MartianMono.variable} ${curatedPlaygroundFontVariableClasses}`}
		>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	)
}
