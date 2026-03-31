'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { useShowcaseConfig } from '@/components/showcase/useShowcaseConfig'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import styles from '../showcase.module.css'

export function EditorialExample({ takt }: { takt: boolean }) {
	const font = useMemo(() => CURATED_FONTS.find((f) => f.name === 'Newsreader')!, [])
	const { takt: taktVars, naive } = useShowcaseConfig(font)
	const vars = takt ? taktVars : naive
	const ff = curatedFontFamilyCss('Newsreader')

	return (
		<div
			className={`${styles['showcase-ex']} ${styles['showcase-ex--editorial']}`}
			data-takt={takt}
			style={{ ...vars, fontFamily: ff } as CSSProperties}
		>
			<header className={styles['ed-masthead']}>
				<span className={styles['ed-masthead-name']}>The Kerning Review</span>
				<nav className={styles['ed-masthead-nav']} aria-label="Sections">
					<span>Essays</span>
					<span>Interviews</span>
					<span>Archive</span>
				</nav>
			</header>

			<div className={styles['ed-divider']} aria-hidden />

			<article className={styles['ed-article']}>
				<header className={styles['ed-article-header']}>
					<p className={styles['ed-kicker']}>Essay · 12 min read</p>
					<h1 className={styles['ed-h1']}>The quiet cost of neutral type</h1>
					<p className={styles['ed-standfirst']}>
						When every interface defaults to the same geometric sans, we train readers to skim. Editorial rhythm
						— not just size — is what holds attention across paragraphs.
					</p>
					<div className={styles['ed-meta']}>
						<img
							className={styles['ed-avatar']}
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
							alt=""
							loading="lazy"
						/>
						<div>
							<p className={styles['ed-byline']}>Mira Chen</p>
							<p className={styles['ed-date']}>31 March 2026 · London</p>
						</div>
					</div>
				</header>

				<img
					className={styles['ed-hero-image']}
					src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=400&fit=crop"
					alt="Open book with visible typography"
					loading="lazy"
				/>

				<div className={styles['ed-body-wrap']}>
					<p className={styles['ed-drop']}>
						Design systems often treat body copy as filler between components — a grey slab of 16 px text between
						the hero and the footer. But long-form reading depends on line length, micro-contrast between weights,
						and spacing that follows the typeface's own proportions.
					</p>

					<p className={styles['ed-body']}>
						Metrics-first tooling closes the gap between what the font wants and what the layout demands. Rather
						than guessing a line-height or borrowing a spacing token from another project, you derive every value
						from the face itself: its x-height, cap height, ascent, and average character width.
					</p>

					<blockquote className={styles['ed-quote']}>
						"Typography is the detail that tells users whether you respect their time."
					</blockquote>

					<h2 className={styles['ed-h2']}>Rhythm is not a grid</h2>

					<p className={styles['ed-body']}>
						Vertical rhythm is often reduced to a baseline grid overlay. But rhythm is subtler than that. It is the
						relationship between paragraph spacing and line-height, between heading scale and body weight, between
						the space above a pull quote and the space below it.
					</p>

					<aside className={styles['ed-aside']}>
						<p className={styles['ed-aside-label']}>Related</p>
						<p className={styles['ed-aside-title']}>Why variable fonts change the spacing equation</p>
						<p className={styles['ed-aside-desc']}>
							Optical sizes shift metrics at every weight. Your spacing should follow.
						</p>
					</aside>

					<h2 className={styles['ed-h2']}>The reader's contract</h2>

					<p className={styles['ed-body']}>
						Every publication makes an implicit promise: stay, and you will be rewarded. The promise is kept
						through pacing — sentence length, paragraph breaks, the proportion of whitespace to ink. None of these
						are decoration. They are the interface of reading itself.
					</p>
				</div>

				<footer className={styles['ed-footer']}>
					<div className={styles['ed-tags']}>
						<span className={styles['ed-tag']}>Typography</span>
						<span className={styles['ed-tag']}>Design Systems</span>
						<span className={styles['ed-tag']}>Editorial</span>
					</div>
				</footer>
			</article>
		</div>
	)
}
