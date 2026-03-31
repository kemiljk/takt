'use client'
import { LayoutGroup, motion } from 'motion/react'
import styles from './showcase.module.css'

interface ShowcaseToggleProps {
	taktOn: boolean
	onTaktChange: (value: boolean) => void
}

export function ShowcaseToggle({ taktOn, onTaktChange }: ShowcaseToggleProps) {
	return (
		<div className={styles['showcase-toggle']} role="group" aria-label="Typography mode">
			<div className={styles['showcase-toggle__inner']}>
				<span className={styles['showcase-toggle__label']}>Takt styles</span>
				<LayoutGroup id="showcase-takt-toggle">
					<div className={styles['showcase-toggle__seg']}>
						<button
							type="button"
							className={`${styles['showcase-toggle__btn']} ${!taktOn ? styles['showcase-toggle__btn--active'] : ''}`}
							onClick={() => onTaktChange(false)}
							aria-pressed={!taktOn}
						>
							{!taktOn && (
								<motion.span
									className={styles['showcase-toggle__btn-indicator']}
									layoutId="showcase-takt-pill"
									transition={{ type: 'spring', stiffness: 440, damping: 34 }}
								/>
							)}
							<span className={styles['showcase-toggle__btn-text']}>Off</span>
						</button>
						<button
							type="button"
							className={`${styles['showcase-toggle__btn']} ${taktOn ? styles['showcase-toggle__btn--active'] : ''}`}
							onClick={() => onTaktChange(true)}
							aria-pressed={taktOn}
						>
							{taktOn && (
								<motion.span
									className={styles['showcase-toggle__btn-indicator']}
									layoutId="showcase-takt-pill"
									transition={{ type: 'spring', stiffness: 440, damping: 34 }}
								/>
							)}
							<span className={styles['showcase-toggle__btn-text']}>On</span>
						</button>
					</div>
				</LayoutGroup>
			</div>
		</div>
	)
}
