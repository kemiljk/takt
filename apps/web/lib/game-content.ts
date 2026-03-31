export interface GameComposition {
	heading: string
	body: string
	caption?: string
}

export const GAME_COMPOSITIONS: GameComposition[] = [
	{
		heading: 'Rhythm and hierarchy',
		body:
			'Typography creates rhythm through consistent spacing and proportional relationships. A modular scale—where each size relates mathematically to others—creates visual harmony that feels intentional without announcing itself. Readers sense order before they can name it.\n\n' +
			'Hierarchy is not only about making the headline bigger. It is about sequencing attention: what you read first, what supports it, and what recedes. Weight, color, and spacing work together so the page breathes. When every level has a clear role, the design disappears and the content leads.\n\n' +
			'Small inconsistencies compound. A heading that sits a few pixels off the baseline grid, a list that uses a different line height than the paragraphs beside it—these fractures add cognitive load. A disciplined system turns those details into a single, steady pulse.',
		caption: 'Editorial excerpt',
	},
	{
		heading: 'Reading comfort',
		body:
			'The foundation of effective typography lies in establishing a clear hierarchy that guides the reader’s eye through content with intention. By carefully calibrating font sizes, weights, and spacing, designers create visual pathways that make information digestible rather than overwhelming.\n\n' +
			'Comfort is not softness; it is predictability. When line length, line height, and paragraph spacing align with how people scan and rest, reading feels effortless. When they fight each other—lines too long, leading too tight, blocks too dense—fatigue arrives quickly, even if the words are excellent.\n\n' +
			'On screens, comfort also means resilience: type that stays legible at arm’s length, in sunlight, and when users bump up text size. Designing for that range is part of respecting the reader’s context, not only the brand’s grid.',
		caption: 'Design notes',
	},
	{
		heading: 'Type pairing',
		body:
			'The art of pairing typefaces is about creating dialogue between distinct voices while maintaining visual cohesion. Traditional pairings—serif with sans, display with body—work because they provide contrast without chaos. The eye needs difference to navigate, but not so much that the page feels like a collage of unrelated moods.\n\n' +
			'Modern pairing often stays within one family or uses two sans-serifs with different proportions. The tension comes from x-height, stroke contrast, and how each face occupies space. Two geometric sans can look flat together; a humanist sans beside a grotesque can feel lively if their scales align.\n\n' +
			'Whatever the pair, shared rhythm matters. If body text uses a generous line height, headings and captions should echo that spacing logic so blocks lock into a shared vertical tempo.',
		caption: 'From the studio',
	},
	{
		heading: 'Micro typography',
		body:
			'Beyond the macro decisions of typeface and size lies the realm of micro typography—the subtle adjustments that separate competent design from exceptional work. Letter spacing, line height, and alignment create texture at the pixel level. They are the difference between text that looks “set” and text that looks merely placed.\n\n' +
			'Tracking and kerning respond to size: display lines often need tighter or looser spacing than body copy. Small caps, figures, and punctuation have their own rhythms; ignoring them produces uneven gray and broken flow. None of this announces itself to casual viewers, but it accumulates into a sense of care—or neglect.\n\n' +
			'Micro typography is also where accessibility meets craft. Slightly more open leading, careful hyphenation, and consistent baselines help low-vision readers and those using screen magnification. The same details that polish a layout also widen who can use it comfortably.',
	},
	{
		heading: 'Contrast and clarity',
		body:
			'Contrast is the enemy of ambiguity in typography. Whether through weight, size, color, or spacing, creating distinct visual differences between elements ensures clarity of intent and hierarchy. High contrast ratios benefit not only accessibility—they sharpen the entire design system and make scanning faster.\n\n' +
			'Weak contrast is a common failure mode: gray body text on off-white, mid-weight labels beside mid-weight body, buttons that look like paragraphs. Users should never wonder what is interactive, what is primary, or what is decorative. Intentional contrast answers those questions before they arise.\n\n' +
			'Contrast also operates across the page. A whisper-thin display face can pair with robust body text if their roles are unmistakable. Monochrome palettes rely almost entirely on scale and weight; colorful interfaces need disciplined neutrals so emphasis does not dissolve into noise.',
		caption: 'Accessibility matters',
	},
	{
		heading: 'Digital type',
		body:
			'The shift from print to digital presents unique typographic challenges. Screen resolution, rendering differences, and variable viewing distances demand fonts optimized for legibility rather than ink flow. Hinting, subpixel rendering, and variable axes all influence how a face behaves when users cannot control the paper or the press.\n\n' +
			'Modern CSS gives designers precision previously reserved for print: fluid type, custom properties, and features like `font-optical-sizing` help type adapt across breakpoints without hand-drawing every size. The cost is decision surface: more variables to tune, more chances for inconsistency if the system is not documented.\n\n' +
			'Performance is part of the craft. Every weight and width shipped is a budget line. Subsetting, preload, and format choices (WOFF2 first) keep typography from becoming the reason a page feels sluggish. Fast type loading is as much a user experience concern as line length and leading.',
	},
	{
		heading: 'Consistency builds trust',
		body:
			'A consistent system creates trust; inconsistency breeds confusion. When headings, lists, and captions share a clear scale and spacing language, the product feels intentional. When each screen invents its own margins and sizes, users sense fragility—even if they cannot articulate why.\n\n' +
			'Consistency does not mean monotony. Tokens and components exist so teams can repeat patterns without copying pixels. A strong system leaves room for emphasis and exception, but those exceptions should be rare and documented, not one-off tweaks in every pull request.\n\n' +
			'When readers feel rhythm without consciously noticing it, typography has succeeded. That invisibility is the goal: type that supports the message so well that attention stays on ideas, not on the interface wrestling for it.',
		caption: 'Systems thinking',
	},
	{
		heading: 'Measure and flow',
		body:
			'The width of text, or measure, affects comprehension. Too narrow creates excessive hyphenation and a staccato rhythm; too wide causes eye strain and makes it easy to lose place when lines wrap. Editorial tradition often lands between forty-five and seventy-five characters per line for continuous reading.\n\n' +
			'Measure and line height interact. A wide column can tolerate slightly tighter leading if the line length helps the eye find the next line; a narrow column may need more air so the block does not feel like a tight corridor. Neither rule is universal—context and typeface matter.\n\n' +
			'Flow is what happens between paragraphs and sections. Space should signal relationship: closer paragraphs belong together; larger gaps signal a new idea. When vertical spacing is arbitrary, the narrative structure blurs and readers work harder to reconstruct the author’s intent.',
	},
	{
		heading: 'Variable fonts',
		body:
			'Variable fonts represent a paradigm shift: a single file provides infinite gradations along defined axes. Fewer files, faster loads, and typography that can respond to context—lighter weights on small screens, bolder weights in large display settings—without maintaining a separate asset per step.\n\n' +
			'The design opportunity is real-time adaptation: width and weight can track container size or user preferences. The engineering cost is discipline. Without clear rules, teams interpolate casually and produce mushy mid-weights that undermine the family’s character.\n\n' +
			'Used well, variable fonts align performance and expression. Used casually, they become another way to ship five megabytes of unused masters. Treat axes like any other token: name them, limit them, and test rendering where your audience actually reads.',
		caption: 'Performance',
	},
	{
		heading: 'Cultural weight',
		body:
			'Typography carries cultural weight beyond letterforms. Character design reflects the values and aesthetics of its era and origin, from the structured geometry of mid-century modernism to the warm irregularity of vernacular lettering. Choosing a typeface is never only a technical decision.\n\n' +
			'Global products must consider scripts, not just Latin. Mixing writing systems demands harmonized proportions and shared rhythm so no community feels like an afterthought. Fallback stacks and language-specific tuning are part of inclusive design, not polish at the end.\n\n' +
			'As digital design reaches more people in more contexts, understanding typographic history becomes a practical skill. The right face can signal authority, playfulness, urgency, or calm; the wrong one undermines content before a word is read. Culture and craft meet in every glyph.',
	},
]
