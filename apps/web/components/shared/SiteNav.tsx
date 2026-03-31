'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGroup, motion } from 'motion/react'

type NavItem = { href: string; label: string; external?: boolean }

const NAV_ITEMS: NavItem[] = [
	{ href: '/', label: 'Playground' },
	{ href: '/showcase', label: 'Showcase' },
	{ href: '/game', label: 'takt test' },
	{ href: '/docs', label: 'Docs' },
]

export function SiteNav() {
	const pathname = usePathname()

	const isActive = (href: string) =>
		href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

	return (
		<div className="site-nav-shell" data-site-nav>
			<nav className="site-nav" aria-label="Site navigation">
				<Link href="/" className="site-nav__wordmark">
					takt
				</Link>
				<LayoutGroup id="site-nav-links">
					<ul className="site-nav__links">
						{NAV_ITEMS.map((item) => {
							const active = !item.external && isActive(item.href)
							return (
								<li key={item.href} className="site-nav__item">
									{item.external ? (
										<a
											href={item.href}
											className="site-nav__link"
											target="_blank"
											rel="noopener noreferrer"
										>
											{item.label}
											<span aria-hidden="true" className="site-nav__external-icon">
												↗
											</span>
										</a>
									) : (
										<Link
											href={item.href}
											className={`site-nav__link ${active ? 'site-nav__link--active' : ''}`}
										>
											{active && (
												<motion.span
													className="site-nav__link-indicator"
													layoutId="site-nav-active-pill"
													transition={{ type: 'spring', stiffness: 440, damping: 34 }}
												/>
											)}
											<span className="site-nav__link-text">{item.label}</span>
										</Link>
									)}
								</li>
							)
						})}
					</ul>
				</LayoutGroup>
			</nav>
		</div>
	)
}
