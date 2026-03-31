'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { useShowcaseConfig } from '@/components/showcase/useShowcaseConfig'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import styles from '../showcase.module.css'

import type { ReactNode } from 'react'

const FEATURES: { title: string; desc: string; icon: ReactNode }[] = [
	{
		title: 'Sub-50 ms sync',
		desc: 'Real-time updates keep everyone in the same moment, across the hall or the Atlantic.',
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
		),
	},
	{
		title: 'Role templates',
		desc: 'Permissions that map to how your org actually works — not how a dropdown thinks it should.',
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
		),
	},
	{
		title: 'Clean exports',
		desc: 'CSV, API, or webhooks — same schema every time. Your data pipeline will thank you.',
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
		),
	},
	{
		title: 'Version history',
		desc: 'Every change logged, every snapshot restorable. Roll back an hour or a quarter.',
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><polyline points="12 7 12 12 15 15"/></svg>
		),
	},
	{
		title: 'Automations',
		desc: 'Wire triggers and actions together in minutes. No Zapier tax, no hidden rate limits.',
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><path d="M13 8h4"/><path d="M13 12h4"/><path d="M13 16h4"/></svg>
		),
	},
	{
		title: 'SOC 2 by default',
		desc: 'Encryption, audit logs, SSO — the compliance box is already ticked.',
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
		),
	},
]

const METRICS = [
	{ value: '1.2M', label: 'tasks / day' },
	{ value: '99.98%', label: 'uptime (365d)' },
	{ value: '<50ms', label: 'p95 latency' },
	{ value: '4,200+', label: 'teams' },
]

const TESTIMONIALS = [
	{
		quote: 'Pulse replaced three tools for us overnight. Velocity jumped 40 % in the first sprint.',
		name: 'Kaiya Hernández',
		role: 'VP Eng, Archway',
		avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
	},
	{
		quote: 'The permissions model actually mirrors our team structure. That never happens.',
		name: 'Sam Okonkwo',
		role: 'Head of Ops, Lattice',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
	},
]

export function SaasExample({ takt }: { takt: boolean }) {
	const font = useMemo(() => CURATED_FONTS.find((f) => f.name === 'Geist')!, [])
	const { takt: taktVars, naive } = useShowcaseConfig(font)
	const vars = takt ? taktVars : naive
	const ff = curatedFontFamilyCss('Geist')

	return (
		<div
			className={`${styles['showcase-ex']} ${styles['showcase-ex--saas']}`}
			data-takt={takt}
			style={{ ...vars, fontFamily: ff } as CSSProperties}
		>
			<header className={styles['saas-header']}>
				<span className={styles['saas-logo']}>Pulse</span>
				<nav className={styles['saas-nav']} aria-label="Product">
					<span>Product</span>
					<span>Pricing</span>
					<span>Changelog</span>
					<span>Docs</span>
				</nav>
				<div className={styles['saas-header-actions']}>
					<button
						type="button"
						className={`${styles['saas-btn']} ${styles['saas-btn--ghost']} ${styles['saas-btn--sm']}`}
					>
						Log in
					</button>
					<button
						type="button"
						className={`${styles['saas-btn']} ${styles['saas-btn--primary']} ${styles['saas-btn--sm']}`}
					>
						Start trial
					</button>
				</div>
			</header>

			<section className={styles['saas-hero']}>
				<p className={styles['saas-badge']}>New — Real-time sync</p>
				<h1 className={styles['saas-h1']}>Ship faster with a single source of truth</h1>
				<p className={styles['saas-lead']}>
					Connect your team, automate handoffs, and watch throughput climb — without another tool to babysit.
				</p>
				<div className={styles['saas-hero-actions']}>
					<button type="button" className={`${styles['saas-btn']} ${styles['saas-btn--primary']}`}>
						Get started — free
					</button>
					<button type="button" className={`${styles['saas-btn']} ${styles['saas-btn--ghost']}`}>
						Watch demo
					</button>
				</div>
			</section>

			<section className={styles['saas-logos']}>
				<div className={styles['saas-logos-row']}>
					{['Vercel', 'Linear', 'Figma', 'Stripe', 'Notion'].map((name) => (
						<span key={name} className={styles['saas-logos-item']}>
							{name}
						</span>
					))}
				</div>
			</section>

			<section className={styles['saas-metrics']}>
				{METRICS.map((m) => (
					<div key={m.label} className={styles['saas-metric']}>
						<span className={styles['saas-metric-value']}>{m.value}</span>
						<span className={styles['saas-metric-label']}>{m.label}</span>
					</div>
				))}
			</section>

			<section className={styles['saas-features']}>
				<div className={styles['saas-features-header']}>
					<h2 className={styles['saas-h2']}>Everything you need, nothing you don't</h2>
					<p className={styles['saas-body']}>Built for teams of 5 to 5,000 who value speed over ceremony.</p>
				</div>
				<div className={styles['saas-features-grid']}>
					{FEATURES.map((f) => (
						<div key={f.title} className={styles['saas-feature']}>
							<div className={styles['saas-feature-icon']} aria-hidden>
								{f.icon}
							</div>
							<h3 className={styles['saas-feature-title']}>{f.title}</h3>
							<p className={styles['saas-feature-desc']}>{f.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className={styles['saas-testimonials']}>
				{TESTIMONIALS.map((t) => (
					<blockquote key={t.name} className={styles['saas-testimonial']}>
						<p className={styles['saas-testimonial-quote']}>"{t.quote}"</p>
						<footer className={styles['saas-testimonial-footer']}>
							<img className={styles['saas-testimonial-avatar']} src={t.avatar} alt={t.name} loading="lazy" />
							<div>
								<p className={styles['saas-testimonial-name']}>{t.name}</p>
								<p className={styles['saas-testimonial-role']}>{t.role}</p>
							</div>
						</footer>
					</blockquote>
				))}
			</section>

			<section className={styles['saas-cta-section']}>
				<h2 className={styles['saas-h2']}>Ready to move faster?</h2>
				<p className={styles['saas-body']}>Free for up to 10 users. No credit card required.</p>
				<button type="button" className={`${styles['saas-btn']} ${styles['saas-btn--primary']}`}>
					Start your free trial
				</button>
			</section>

			<footer className={styles['saas-footer']}>
				<span className={styles['saas-footer-logo']}>Pulse</span>
				<nav className={styles['saas-footer-nav']}>
					<span>Privacy</span>
					<span>Terms</span>
					<span>Status</span>
				</nav>
			</footer>
		</div>
	)
}
