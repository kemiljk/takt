'use client'
import { AgencyExample } from '@/components/showcase/examples/AgencyExample'
import { DashboardExample } from '@/components/showcase/examples/DashboardExample'
import { DocsExample } from '@/components/showcase/examples/DocsExample'
import { EditorialExample } from '@/components/showcase/examples/EditorialExample'
import { PortfolioExample } from '@/components/showcase/examples/PortfolioExample'
import { SaasExample } from '@/components/showcase/examples/SaasExample'
import { ShowcaseToggle } from '@/components/showcase/ShowcaseToggle'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import styles from './showcase.module.css'

const CATEGORIES = [
	{ id: 'saas', label: 'SaaS Product', Component: SaasExample },
	{ id: 'editorial', label: 'Editorial', Component: EditorialExample },
	{ id: 'agency', label: 'Agency', Component: AgencyExample },
	{ id: 'dashboard', label: 'Dashboard', Component: DashboardExample },
	{ id: 'docs', label: 'Documentation', Component: DocsExample },
	{ id: 'portfolio', label: 'Portfolio', Component: PortfolioExample },
] as const

type CategoryId = (typeof CATEGORIES)[number]['id']

export function ShowcasePage() {
	const [active, setActive] = useState<CategoryId>('saas')
	const [taktOn, setTaktOn] = useState(true)

	const activeMeta = CATEGORIES.find((c) => c.id === active)
	const Example = activeMeta?.Component ?? SaasExample

	return (
		<div className={styles['showcase-page']}>
			<header className={styles['showcase-page__intro']}>
				<h1 className={styles['showcase-page__title']}>Showcase</h1>
				<p className={styles['showcase-page__lede']}>
					Six one-page mocks in different site genres. Toggle Takt typography to compare metric-driven type and
					spacing with generic defaults — each mock uses its own palette, independent of the takt.app chrome.
				</p>
			</header>

			<LayoutGroup id="showcase-categories">
				<div className={styles['showcase-page__picker']} role="tablist" aria-label="Example category">
					{CATEGORIES.map((cat) => {
						const isActive = active === cat.id
						return (
							<button
								key={cat.id}
								type="button"
								role="tab"
								aria-selected={isActive}
								className={`${styles['showcase-page__pill']} ${isActive ? styles['showcase-page__pill--active'] : ''}`}
								onClick={() => setActive(cat.id)}
							>
								{isActive && (
									<motion.span
										className={styles['showcase-page__pill-indicator']}
										layoutId="showcase-category-pill"
										transition={{ type: 'spring', stiffness: 420, damping: 34 }}
									/>
								)}
								<span className={styles['showcase-page__pill-text']}>{cat.label}</span>
							</button>
						)
					})}
				</div>
			</LayoutGroup>

			<div className={styles['showcase-page__viewport']}>
				<div className={styles['showcase-page__viewport-inner']}>
					<AnimatePresence mode="wait">
						<motion.div
							className={styles['showcase-page__motion-wrap']}
							key={active}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
						>
							<Example takt={taktOn} />
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			<ShowcaseToggle taktOn={taktOn} onTaktChange={setTaktOn} />
		</div>
	)
}
