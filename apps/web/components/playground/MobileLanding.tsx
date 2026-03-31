'use client'
import Link from 'next/link'
import { motion } from 'motion/react'

const SPECIMEN_STEPS = [
	{
		name: '4xl',
		sample: 'Type drives space',
		size: '39.06px',
		lineHeight: '1.18',
		letterSpacing: '-0.022em',
		fontSizePx: 39.06,
	},
	{
		name: 'xl',
		sample: 'Metrics shape rhythm',
		size: '25px',
		lineHeight: '1.28',
		letterSpacing: '-0.012em',
		fontSizePx: 25,
	},
	{
		name: 'base',
		sample: 'Every font carries an internal logic — proportions encoded in its metrics that hint at the ideal space around it.',
		size: '16px',
		lineHeight: '1.45',
		letterSpacing: '-0.011em',
		fontSizePx: 16,
	},
	{
		name: 'sm',
		sample: 'Caption · 12.80px',
		size: '12.80px',
		lineHeight: '1.50',
		letterSpacing: '0.002em',
		fontSizePx: 12.8,
	},
] as const

const NAV_CARDS = [
	{
		href: '/game',
		title: 'takt test',
		description: 'Test your typographic eye',
	},
	{
		href: '/docs',
		title: 'Docs',
		description: 'Read the documentation',
	},
] as const

const stagger = (i: number) => ({
	initial: { opacity: 0, y: 6 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] as const },
})

export function MobileLanding() {
	return (
		<div className="mobile-landing">
			<header className="mobile-landing__hero">
				<motion.h1 className="mobile-landing__wordmark" {...stagger(0)}>
					takt
				</motion.h1>
				<motion.p className="mobile-landing__tagline" {...stagger(1)}>
					A type-and-space system from font metrics
				</motion.p>
			</header>

			<motion.section className="mobile-landing__about" {...stagger(2)}>
				<p className="mobile-landing__description">
					takt extracts a font&rsquo;s internal proportions and generates a
					complete type scale, line-heights, letter-spacing, and spacing tokens
					— all from metrics, not guesswork.
				</p>
			</motion.section>

			<motion.section className="mobile-landing__specimen" {...stagger(3)}>
				<h2 className="mobile-landing__section-title">Specimen · Inter</h2>
				<div className="mobile-landing__specimen-card">
					{SPECIMEN_STEPS.map((step, i) => (
						<motion.div
							key={step.name}
							className="mobile-landing__specimen-step"
							{...stagger(4 + i)}
						>
							<span className="mobile-landing__step-name">{step.name}</span>
							<span
								className="mobile-landing__step-sample"
								style={{
									fontSize: step.fontSizePx,
									lineHeight: step.lineHeight,
									letterSpacing: step.letterSpacing,
									fontFamily:
										'var(--font-curated-inter), system-ui, sans-serif',
								}}
							>
								{step.sample}
							</span>
							<span className="mobile-landing__step-values">
								{step.size} · {step.lineHeight} · {step.letterSpacing}
							</span>
						</motion.div>
					))}
				</div>
			</motion.section>

			<motion.section className="mobile-landing__desktop-cta" {...stagger(8)}>
				<p>
					The playground needs a wider screen for precise control.
					<br />
					<strong>Open takt on desktop</strong> for the full experience.
				</p>
			</motion.section>

			<motion.nav className="mobile-landing__nav" {...stagger(9)}>
				<h2 className="mobile-landing__section-title">Explore</h2>
				<div className="mobile-landing__nav-cards">
					{NAV_CARDS.map((card, i) => (
						<motion.div key={card.href} {...stagger(10 + i)}>
							<Link
								href={card.href}
								className="mobile-landing__nav-card"
							>
								<span className="mobile-landing__nav-card-title">
									{card.title}
								</span>
								<span className="mobile-landing__nav-card-desc">
									{card.description}
								</span>
							</Link>
						</motion.div>
					))}
				</div>
			</motion.nav>

			<footer className="mobile-landing__footer">
				<p>
					<a href="https://karlkoch.me">Karl Koch</a>
					{' · '}
					<a href="https://designengineer.xyz">d×e</a>
				</p>
			</footer>
		</div>
	)
}
