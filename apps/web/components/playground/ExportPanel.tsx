'use client'
import { CodeBlock } from '@/components/shared/CodeBlock'
import { LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'

interface ExportPanelProps {
	outputs: {
		css: string
		tailwind: string
		tokens: string
		json: string
	}
}

const TABS = [
	{ key: 'css', label: 'CSS', language: 'css' as const },
	{ key: 'tailwind', label: 'Tailwind v4', language: 'json' as const },
	{ key: 'tokens', label: 'Design Tokens', language: 'json' as const },
	{ key: 'json', label: 'JSON', language: 'json' as const },
]

export function ExportPanel({ outputs }: ExportPanelProps) {
	const [activeTab, setActiveTab] = useState('css')
	const defaultTab = TABS[0]
	if (!defaultTab) {
		throw new Error('ExportPanel: TABS must not be empty')
	}
	const activeTabMeta = TABS.find((t) => t.key === activeTab) ?? defaultTab

	return (
		<div className="export">
			<LayoutGroup id="export-tabs">
				<div className="export__tabs" role="tablist">
					{TABS.map((tab) => (
						<button
							key={tab.key}
							type="button"
							role="tab"
							aria-selected={activeTab === tab.key}
							className={`export__tab ${activeTab === tab.key ? 'export__tab--active' : ''}`}
							onClick={() => setActiveTab(tab.key)}
						>
							<span className="export__tab-label">{tab.label}</span>
							{activeTab === tab.key && (
								<motion.span
									className="export__tab-indicator"
									layoutId="export-tab-indicator"
									transition={{ type: 'spring', stiffness: 440, damping: 34 }}
								/>
							)}
						</button>
					))}
				</div>
			</LayoutGroup>
			<div className="export__content" role="tabpanel">
				<CodeBlock
					code={outputs[activeTab as keyof typeof outputs]}
					language={activeTabMeta.language}
				/>
			</div>
		</div>
	)
}
