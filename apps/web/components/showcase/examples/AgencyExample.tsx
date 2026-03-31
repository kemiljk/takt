'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { buildDualShowcaseTokenMaps } from '@/lib/showcase-tokens'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import styles from '../showcase.module.css'

const SERVICES = [
	{ title: 'Brand strategy', desc: 'Positioning, naming, and verbal identity that gives teams a shared language.' },
	{ title: 'Visual identity', desc: 'Logo systems, type selection, colour, and motion — codified for scale.' },
	{ title: 'Digital product', desc: 'Design systems, prototypes, and production code for web and native.' },
	{ title: 'Launch campaigns', desc: 'Landing pages, paid creative, and go-to-market design that converts.' },
]

const CASES = [
	{
		client: 'Meridian Health',
		work: 'Brand identity + design system',
		year: '2026',
		img: '/showcase-assets/agency-3.png',
	},
	{
		client: 'Crypt',
		work: 'Product design + launch site',
		year: '2025',
		img: '/showcase-assets/agency-1.png',
	},
	{
		client: 'Niva',
		work: 'Visual identity + campaign',
		year: '2025',
		img: '/showcase-assets/agency-2.png',
	},
]

const CLIENT_LOGOS = [
	{ name: 'Meridian', style: { fontWeight: 700, letterSpacing: '-0.05em', textTransform: 'lowercase' } },
	{ name: 'CRYPT', style: { fontWeight: 900, letterSpacing: '0.1em', fontFamily: 'var(--font-martian-mono, monospace)' } },
	{ name: 'Niva', style: { fontStyle: 'italic', fontWeight: 400, fontSize: '1.2em', letterSpacing: '0.02em' } },
	{ name: 'SKYLINE', style: { fontWeight: 300, letterSpacing: '0.2em' } },
	{ name: 'ember', style: { fontWeight: 600, letterSpacing: '-0.02em', fontStyle: 'italic', fontSize: '1.1em' } },
] as const

export function AgencyExample({ takt }: { takt: boolean }) {
	const fraunces = useMemo(() => CURATED_FONTS.find((f) => f.name === 'Fraunces')!, [])
	const dmSans = useMemo(() => CURATED_FONTS.find((f) => f.name === 'DM Sans')!, [])
	const { takt: taktVars, naive } = useMemo(
		() => buildDualShowcaseTokenMaps(fraunces, dmSans),
		[fraunces, dmSans],
	)
	const vars = takt ? taktVars : naive
	const displayFf = curatedFontFamilyCss('Nabla')
	const bodyFf = curatedFontFamilyCss('DM Sans')

	return (
		<div
			className={`${styles['showcase-ex']} ${styles['showcase-ex--agency']}`}
			data-takt={takt}
			style={vars as CSSProperties}
		>
			<header className={styles['ag-header']} style={{ fontFamily: bodyFf }}>
				<span className={styles['ag-logo']} style={{ fontFamily: displayFf }}>
					Atelier
				</span>
				<nav className={styles['ag-nav']} aria-label="Studio">
					<span>Work</span>
					<span>Services</span>
					<span>Studio</span>
					<span>Contact</span>
				</nav>
			</header>

			<section className={styles['ag-hero']}>
				<p className={styles['ag-label']} style={{ fontFamily: bodyFf }}>
					Studio · Amsterdam
				</p>
				<h1 className={styles['ag-h1']} style={{ fontFamily: displayFf }}>
					We shape brands people remember
				</h1>
				<p className={styles['ag-lead']} style={{ fontFamily: bodyFf }}>
					Strategy, identity, and digital craft for teams who are done looking like everyone else.
				</p>
				<button type="button" className={`${styles['ag-btn']} ${styles['ag-btn--primary']}`} style={{ fontFamily: bodyFf }}>
					Start a project
				</button>
			</section>

			<section className={styles['ag-clients']} style={{ fontFamily: bodyFf }}>
				<div className={styles['ag-clients-row']}>
					{CLIENT_LOGOS.map((c) => (
						<span key={c.name} className={styles['ag-clients-item']} style={c.style as CSSProperties}>
							{c.name}
						</span>
					))}
				</div>
			</section>

			<section className={styles['ag-services']} style={{ fontFamily: bodyFf }}>
				<h2 className={styles['ag-h2']} style={{ fontFamily: displayFf }}>
					What we do
				</h2>
				<div className={styles['ag-services-grid']}>
					{SERVICES.map((s) => (
						<div key={s.title} className={styles['ag-service']}>
							<h3 className={styles['ag-service-title']}>{s.title}</h3>
							<p className={styles['ag-service-desc']}>{s.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className={styles['ag-cases']} style={{ fontFamily: bodyFf }}>
				<h2 className={styles['ag-h2']} style={{ fontFamily: displayFf }}>
					Recent work
				</h2>
				<div className={styles['ag-cases-list']}>
					{CASES.map((c) => (
						<div key={c.client} className={styles['ag-case']}>
							<div className={styles['ag-case-image-wrap']}>
								<img className={styles['ag-case-image']} src={c.img} alt={c.client} loading="lazy" />
							</div>
							<div className={styles['ag-case-info']}>
								<p className={styles['ag-case-client']}>{c.client}</p>
								<p className={styles['ag-case-work']}>{c.work}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className={styles['ag-cta']} style={{ fontFamily: bodyFf }}>
				<h2 className={styles['ag-cta-title']} style={{ fontFamily: displayFf }}>
					Tell us about your next chapter.
				</h2>
				<button type="button" className={`${styles['ag-btn']} ${styles['ag-btn--primary']}`}>
					Book a call
				</button>
			</section>

			<footer className={styles['ag-footer']} style={{ fontFamily: bodyFf }}>
				<span className={styles['ag-footer-logo']} style={{ fontFamily: displayFf }}>
					Atelier
				</span>
				<span className={styles['ag-footer-copy']}>Amsterdam · © 2026</span>
			</footer>
		</div>
	)
}
