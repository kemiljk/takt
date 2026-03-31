'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { useShowcaseConfig } from '@/components/showcase/useShowcaseConfig'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import styles from '../showcase.module.css'

const PROJECTS = [
	{
		title: 'Lumen Journal',
		category: 'Brand identity',
		year: '2025',
		desc: 'Visual identity and editorial system for a literary quarterly.',
		img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=520&h=340&fit=crop',
	},
	{
		title: 'Northwind Atlas',
		category: 'Wayfinding',
		year: '2025',
		desc: 'Signage system and map typography for national parks.',
		img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=520&h=340&fit=crop',
	},
	{
		title: 'Studio Verdant',
		category: 'Web + identity',
		year: '2024',
		desc: 'Portfolio site and word mark for an architecture practice.',
		img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=520&h=340&fit=crop',
	},
	{
		title: 'Riviera Sound',
		category: 'Album art',
		year: '2024',
		desc: 'Cover series and merch type system for an indie label.',
		img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=520&h=340&fit=crop',
	},
]

export function PortfolioExample({ takt }: { takt: boolean }) {
	const font = useMemo(() => CURATED_FONTS.find((f) => f.name === 'Host Grotesk')!, [])
	const { takt: taktVars, naive } = useShowcaseConfig(font)
	const vars = takt ? taktVars : naive
	const bodyFf = curatedFontFamilyCss('Host Grotesk')
	const headlineFf = curatedFontFamilyCss('Michroma')
	const style: CSSProperties = { ...vars, fontFamily: bodyFf }
	const headlineStyle: CSSProperties = { fontFamily: headlineFf }

	return (
		<div className={`${styles['showcase-ex']} ${styles['showcase-ex--portfolio']}`} data-takt={takt} style={style}>
			<header className={styles['port-header']}>
				<div>
					<span className={styles['port-name']}>Elena Voss</span>
					<span className={styles['port-role']}>Art direction · Typography</span>
				</div>
				<nav className={styles['port-nav']} aria-label="Portfolio">
					<span>Work</span>
					<span>About</span>
					<span>Contact</span>
				</nav>
			</header>

			<section className={styles['port-hero']}>
				<h1 className={styles['port-h1']} style={headlineStyle}>
					Clarity is a feeling
				</h1>
				<p className={styles['port-lead']}>
					I help cultural institutions and product teams express voice through type — from identity systems to
					launch campaigns.
				</p>
			</section>

			<section className={styles['port-bento']} aria-label="Featured images">
				<img
					className={`${styles['port-bento__item']} ${styles['port-bento__item--a']}`}
					src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&h=400&fit=crop"
					alt="Abstract composition"
					loading="lazy"
				/>
				<img
					className={`${styles['port-bento__item']} ${styles['port-bento__item--b']}`}
					src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=520&fit=crop"
					alt="Typography detail"
					loading="lazy"
				/>
				<img
					className={`${styles['port-bento__item']} ${styles['port-bento__item--c']}`}
					src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop"
					alt="Design texture"
					loading="lazy"
				/>
				<img
					className={`${styles['port-bento__item']} ${styles['port-bento__item--d']}`}
					src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=240&fit=crop"
					alt="Colour study"
					loading="lazy"
				/>
			</section>

			<section className={styles['port-work']}>
				<h2 className={styles['port-h2']} style={headlineStyle}>
					Selected work
				</h2>
				<div className={styles['port-grid']}>
					{PROJECTS.map((p) => (
						<div key={p.title} className={styles['port-card']}>
							<img className={styles['port-card-image']} src={p.img} alt={p.title} loading="lazy" />
							<div className={styles['port-card-info']}>
								<div className={styles['port-card-header']}>
									<h3 className={styles['port-card-title']} style={headlineStyle}>
										{p.title}
									</h3>
									<span className={styles['port-card-year']}>{p.year}</span>
								</div>
								<p className={styles['port-card-category']}>{p.category}</p>
								<p className={styles['port-card-desc']}>{p.desc}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className={styles['port-contact']}>
				<h2 className={styles['port-h2']} style={headlineStyle}>
					Let&apos;s work together
				</h2>
				<p className={styles['port-body']}>
					I take on 3–4 projects at a time. If you have a brief (or even just an idea), I'd love to hear it.
				</p>
				<div className={styles['port-contact-row']}>
					<span className={styles['port-contact-link']}>elena@voss.studio</span>
					<span className={styles['port-contact-link']}>Instagram</span>
					<span className={styles['port-contact-link']}>Are.na</span>
				</div>
			</section>

			<footer className={styles['port-footer']}>
				<span>© 2026 Elena Voss</span>
				<span>London · Berlin</span>
			</footer>
		</div>
	)
}
