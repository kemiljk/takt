'use client'
import { curatedFontFamilyCss } from '@/lib/curated-google-fonts'
import type { CuratedFont } from '@/lib/fonts-metrics'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

interface FontSelectorProps {
	fonts: CuratedFont[]
	selected: CuratedFont
	onSelect: (font: CuratedFont) => void
}

export function FontSelector({ fonts, selected, onSelect }: FontSelectorProps) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const ref = useRef<HTMLDivElement>(null)

	const filtered = useMemo(() => {
		if (!search) return fonts
		const q = search.toLowerCase()
		return fonts.filter(
			(f) =>
				f.name.toLowerCase().includes(q) ||
				f.style.toLowerCase().includes(q) ||
				f.category.toLowerCase().includes(q),
		)
	}, [fonts, search])

	useEffect(() => {
		if (!open) return
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [open])

	return (
		<div className="font-selector" ref={ref}>
			<button
				type="button"
				className="font-selector__trigger"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-haspopup="listbox"
				style={{ fontFamily: curatedFontFamilyCss(selected.name) }}
			>
				<span className="font-selector__label">
					<span className="font-selector__name">{selected.name}</span>
					<span className="font-selector__category">{selected.style}</span>
				</span>
				<span className="font-selector__chevron" aria-hidden="true">
					<svg
						className="font-selector__chevron-icon"
						width={20}
						height={20}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</span>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						className="font-selector__dropdown"
						initial={{ opacity: 0, scale: 0.96, y: -6 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.98, y: -4 }}
						transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
					>
						<input
							className="font-selector__search"
							type="search"
							placeholder="Search fonts..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className="font-selector__list">
							{filtered.map((font) => (
								<button
									key={font.name}
									type="button"
									className={`font-selector__option ${font.name === selected.name ? 'font-selector__option--selected' : ''}`}
									aria-pressed={font.name === selected.name}
									style={{ fontFamily: curatedFontFamilyCss(font.name) }}
									onClick={() => {
										onSelect(font)
										setOpen(false)
										setSearch('')
									}}
								>
									<span className="font-selector__option-name">{font.name}</span>
									<span className="font-selector__option-style">{font.style}</span>
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
