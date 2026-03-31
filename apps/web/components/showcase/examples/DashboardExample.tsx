'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import { CURATED_FONTS } from '@/lib/fonts-metrics'
import { useShowcaseConfig } from '@/components/showcase/useShowcaseConfig'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import styles from '../showcase.module.css'

const activityDotByType = {
	deploy: styles['dash-activity-dot--deploy'],
	incident: styles['dash-activity-dot--incident'],
	alert: styles['dash-activity-dot--alert'],
	maintenance: styles['dash-activity-dot--maintenance'],
} as const

const SERVICES = [
	{ name: 'api-gateway', owner: 'infra', status: 'Healthy', p95: '42 ms', req: '312K' },
	{ name: 'checkout-svc', owner: 'commerce', status: 'Degraded', p95: '210 ms', req: '89K' },
	{ name: 'search-index', owner: 'discovery', status: 'Healthy', p95: '18 ms', req: '1.4M' },
	{ name: 'auth-provider', owner: 'platform', status: 'Healthy', p95: '31 ms', req: '520K' },
	{ name: 'notification-svc', owner: 'engagement', status: 'Healthy', p95: '55 ms', req: '201K' },
]

const ACTIVITY = [
	{ time: '14:32', event: 'Deploy checkout-svc v2.18.3 completed', type: 'deploy' as const },
	{ time: '14:18', event: 'Incident #1247 auto-resolved — search-index p95 recovered', type: 'incident' as const },
	{ time: '13:45', event: 'Alert: checkout-svc error rate exceeded 0.5% threshold', type: 'alert' as const },
	{ time: '12:01', event: 'Scheduled maintenance window closed', type: 'maintenance' as const },
]

export function DashboardExample({ takt }: { takt: boolean }) {
	const font = useMemo(() => CURATED_FONTS.find((f) => f.name === 'IBM Plex Sans')!, [])
	const { takt: taktVars, naive } = useShowcaseConfig(font)
	const vars = takt ? taktVars : naive
	const ff = curatedFontFamilyCss('IBM Plex Sans')
	const style: CSSProperties = { ...vars, fontFamily: ff }

	return (
		<div className={`${styles['showcase-ex']} ${styles['showcase-ex--dash']}`} data-takt={takt} style={style}>
			<aside className={styles['dash-side']} aria-label="Sections">
				<span className={styles['dash-logo']}>Ops</span>
				<nav className={styles['dash-nav']}>
					<span className={`${styles['dash-nav-item']} ${styles['dash-nav-item--active']}`}>
						<span className={styles['dash-nav-dot']} aria-hidden />
						Overview
					</span>
					<span className={styles['dash-nav-item']}>Services</span>
					<span className={styles['dash-nav-item']}>Incidents</span>
					<span className={styles['dash-nav-item']}>Deploys</span>
					<span className={styles['dash-nav-item']}>Settings</span>
				</nav>
				<div className={styles['dash-side-footer']}>
					<img className={styles['dash-side-avatar']} src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" alt="K. Tanaka" loading="lazy" />
					<span className={styles['dash-side-user']}>K. Tanaka</span>
				</div>
			</aside>

			<div className={styles['dash-main']}>
				<header className={styles['dash-top']}>
					<div>
						<h1 className={styles['dash-h1']}>Production</h1>
						<p className={styles['dash-sub']}>Last 24 hours · UTC · 5 services monitored</p>
					</div>
					<button type="button" className={styles['dash-action-btn']}>
						Export report
					</button>
				</header>

				<section className={styles['dash-metrics']}>
					{[
						{ label: 'Requests', value: '2.6M', delta: '+12%', accent: 'var(--dash-teal)' },
						{ label: 'Error rate', value: '0.08%', delta: '-0.03%', accent: 'var(--dash-amber)' },
						{ label: 'Saturation', value: '64%', delta: '+2%', accent: 'var(--dash-rose)' },
						{ label: 'Avg latency', value: '38 ms', delta: '-4 ms', accent: 'var(--dash-teal)' },
					].map((m) => (
						<div key={m.label} className={styles['dash-card']} style={{ '--dash-accent': m.accent } as CSSProperties}>
							<p className={styles['dash-card-label']}>{m.label}</p>
							<div className={styles['dash-card-row']}>
								<p className={styles['dash-card-value']}>{m.value}</p>
								<span className={styles['dash-card-delta']}>{m.delta}</span>
							</div>
							<div className={styles['dash-card-spark']} aria-label="Sparkline placeholder" />
						</div>
					))}
				</section>

				<section className={styles['dash-table-wrap']}>
					<h2 className={styles['dash-h2']}>Services</h2>
					<table className={styles['dash-table']}>
						<thead>
							<tr>
								<th>Service</th>
								<th>Team</th>
								<th>Status</th>
								<th>p95</th>
								<th>Req / 24h</th>
							</tr>
						</thead>
						<tbody>
							{SERVICES.map((r) => (
								<tr key={r.name}>
									<td className={styles['dash-cell-mono']}>{r.name}</td>
									<td>{r.owner}</td>
									<td>
										<span
											className={`${styles['dash-badge']} ${r.status === 'Degraded' ? styles['dash-badge--warn'] : ''}`}
										>
											{r.status}
										</span>
									</td>
									<td className={styles['dash-cell-mono']}>{r.p95}</td>
									<td className={styles['dash-cell-mono']}>{r.req}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>

				<section className={styles['dash-activity']}>
					<h2 className={styles['dash-h2']}>Activity</h2>
					<div className={styles['dash-activity-list']}>
						{ACTIVITY.map((a) => (
							<div key={a.time + a.event} className={styles['dash-activity-item']}>
								<span className={`${styles['dash-activity-dot']} ${activityDotByType[a.type]}`} aria-hidden />
								<span className={styles['dash-activity-time']}>{a.time}</span>
								<span className={styles['dash-activity-event']}>{a.event}</span>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
