'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { useShowcaseConfig } from '@/components/showcase/useShowcaseConfig'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import styles from '../showcase.module.css'

const SNIPPET_1 = `import { createTaktConfig } from '@takt/core'
import { unpackFont } from '@takt/core/metrics'

const metrics = await unpackFont('/fonts/Inter.woff2')
const config = createTaktConfig({
  font: metrics,
  baseSize: 16,
  ratio: 1.25,
})`

const SNIPPET_2 = `const step = config.steps.find(s => s.name === 'base')
// step.fontSize.clamp  → "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
// step.lineHeight.computed → "1.55"
// step.letterSpacing.css  → "-0.011em"`

const PARAMS = [
	{ name: 'font', type: 'FontMetrics', required: true, desc: 'Resolved font metrics object' },
	{ name: 'baseSize', type: 'number', required: true, desc: 'Root font size in pixels' },
	{ name: 'ratio', type: 'number', required: true, desc: 'Type scale ratio (e.g. 1.25 for Major Third)' },
	{ name: 'stepsUp', type: 'number', required: false, desc: 'Number of steps above base (default: 5)' },
	{ name: 'stepsDown', type: 'number', required: false, desc: 'Number of steps below base (default: 2)' },
	{ name: 'trim', type: 'boolean', required: false, desc: 'Apply leading-trim values (default: true)' },
]

export function DocsExample({ takt }: { takt: boolean }) {
	const font = useMemo(() => CURATED_FONTS.find((f) => f.name === 'Atkinson Hyperlegible Next')!, [])
	const { takt: taktVars, naive } = useShowcaseConfig(font)
	const vars = takt ? taktVars : naive
	const ff = curatedFontFamilyCss('Atkinson Hyperlegible Next')
	const style: CSSProperties = { ...vars, fontFamily: ff }

	return (
		<div className={`${styles['showcase-ex']} ${styles['showcase-ex--docs']}`} data-takt={takt} style={style}>
			<aside className={styles['docs-toc']} aria-label="On this page">
				<p className={styles['docs-toc-title']}>On this page</p>
				<ul className={styles['docs-toc-list']}>
					<li className={`${styles['docs-toc-item']} ${styles['docs-toc-item--active']}`}>Overview</li>
					<li className={styles['docs-toc-item']}>Installation</li>
					<li className={styles['docs-toc-item']}>Configuration</li>
					<li className={styles['docs-toc-item']}>Parameters</li>
					<li className={styles['docs-toc-item']}>Output format</li>
					<li className={styles['docs-toc-item']}>Spacing scale</li>
					<li className={styles['docs-toc-item']}>Recipes</li>
				</ul>
			</aside>

			<article className={styles['docs-article']}>
				<nav className={styles['docs-breadcrumb']} aria-label="Breadcrumb">
					<span>Docs</span>
					<span className={styles['docs-breadcrumb-sep']}>/</span>
					<span>API</span>
					<span className={styles['docs-breadcrumb-sep']}>/</span>
					<span>createTaktConfig</span>
				</nav>

				<h1 className={styles['docs-h1']}>createTaktConfig</h1>
				<p className={styles['docs-lead']}>
					Pass resolved font metrics to <code className={styles['docs-code']}>createTaktConfig</code>. The engine
					returns a full type scale and spacing map derived from your typeface — no magic numbers, no guesswork.
				</p>

				<h2 className={styles['docs-h2']}>Installation</h2>
				<pre className={styles['docs-pre']}>
					<code>npm install @takt/core</code>
				</pre>

				<h2 className={styles['docs-h2']}>Quick start</h2>
				<p className={styles['docs-body']}>
					Start with base size and ratio. Takt computes line-height and letter-spacing per step using the font's
					x-height and cap height.
				</p>
				<pre className={styles['docs-pre']}>
					<code>{SNIPPET_1}</code>
				</pre>

				<h2 className={styles['docs-h2']}>Parameters</h2>
				<table className={styles['docs-params-table']}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Required</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{PARAMS.map((p) => (
							<tr key={p.name}>
								<td>
									<code className={styles['docs-code']}>{p.name}</code>
								</td>
								<td>
									<code className={`${styles['docs-code']} ${styles['docs-code--type']}`}>{p.type}</code>
								</td>
								<td>{p.required ? 'Yes' : 'No'}</td>
								<td>{p.desc}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2 className={styles['docs-h2']}>Output format</h2>
				<p className={styles['docs-body']}>
					Each step in the returned config contains fluid <code className={styles['docs-code']}>fontSize</code>,
					computed <code className={styles['docs-code']}>lineHeight</code>, and CSS-ready{' '}
					<code className={styles['docs-code']}>letterSpacing</code> values.
				</p>
				<pre className={styles['docs-pre']}>
					<code>{SNIPPET_2}</code>
				</pre>

				<div className={styles['docs-callout']}>
					<strong>Tip:</strong> For async font loading in the browser, resolve metrics with{' '}
					<code className={styles['docs-code']}>unpackFont</code> before calling{' '}
					<code className={styles['docs-code']}>createTaktConfig</code>. The metrics are stable once resolved and safe
					to cache.
				</div>

				<div className={styles['docs-nav-footer']}>
					<div className={styles['docs-nav-prev']}>
						<span className={styles['docs-nav-dir']}>Previous</span>
						<span className={styles['docs-nav-link']}>Getting started</span>
					</div>
					<div className={styles['docs-nav-next']}>
						<span className={styles['docs-nav-dir']}>Next</span>
						<span className={styles['docs-nav-link']}>Spacing scale</span>
					</div>
				</div>
			</article>
		</div>
	)
}
