import {
	Fraunces as frauncesFont,
	Host_Grotesk as hostGroteskFont,
	Martian_Mono as martianMonoFont,
} from 'next/font/google'

/** Distinctive wordmark for the Takt logo — soft optical serif, not UI sans. */
export const TaktWordmark = frauncesFont({
	subsets: ['latin'],
	variable: '--font-takt-wordmark',
	display: 'swap',
	weight: ['600', '700'],
})

export const HostGrotesk = hostGroteskFont({
	subsets: ['latin'],
	variable: '--font-host-grotesk',
	display: 'swap',
	weight: ['400', '500', '600', '700'],
})

export const MartianMono = martianMonoFont({
	subsets: ['latin'],
	variable: '--font-martian-mono',
	display: 'swap',
	weight: ['400', '500', '600', '700'],
})
