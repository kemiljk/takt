'use client'
import { useCallback, useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
	code: string
	language: 'css' | 'json' | 'typescript' | 'tsx'
	title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
	const [html, setHtml] = useState('')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		codeToHtml(code, {
			lang: language,
			theme: 'solarized-dark',
		}).then(setHtml)
	}, [code, language])

	const copy = useCallback(async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}, [code])

	return (
		<div className="code-block">
			{title && <div className="code-block__title">{title}</div>}
			<button
				type="button"
				className="code-block__copy"
				onClick={copy}
				aria-label={copied ? 'Copied' : 'Copy code'}
			>
				{copied ? 'Copied' : 'Copy'}
			</button>
			<div className="code-block__content" dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}
