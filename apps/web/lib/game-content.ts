export type ContentType = 'article' | 'pullquote' | 'card' | 'caption' | 'navigation'

export interface GameContent {
  type: ContentType
  label: string
  text: string
  secondaryText?: string
}

// Viewport widths for game rounds (mobile to desktop)
export const GAME_VIEWPORTS = [320, 480, 640, 768, 1024, 1200]

export const GAME_CONTENTS: GameContent[] = [
  // Articles: 3-4 sentence paragraphs about design/typography
  {
    type: 'article',
    label: 'Article: Typography Hierarchy',
    text: 'The foundation of effective typography lies in establishing a clear hierarchy that guides the reader\'s eye through content with intention. By carefully calibrating font sizes, weights, and spacing, designers create visual pathways that make information digestible and engaging. This isn\'t merely about aesthetics—it\'s about respecting the reader\'s cognitive load and time. A well-structured typographic system becomes invisible, allowing content to shine while supporting understanding.'
  },
  {
    type: 'article',
    label: 'Article: Typeface Selection',
    text: 'Choosing the right typeface is one of the most consequential decisions in design, yet it\'s often overlooked. Each font carries historical weight, cultural associations, and technical characteristics that profoundly influence how content is perceived. A serif typeface evokes tradition and authority, while a geometric sans-serif suggests modernity and clarity. The key is alignment: selecting a typeface whose personality and performance match the project\'s goals and audience expectations.'
  },
  {
    type: 'article',
    label: 'Article: Micro Typography',
    text: 'Beyond the macro decisions of typeface and size lies the realm of micro typography—the subtle adjustments that separate competent design from exceptional work. Letter spacing, line height, and text alignment create texture and readability at the pixel level. These adjustments compound: a 10% adjustment to line height might seem negligible, but across thousands of words, it transforms reading comfort and visual cohesion. Master these details and your typography transcends decoration to become pure function.'
  },
  {
    type: 'article',
    label: 'Article: Web Typography',
    text: 'The shift from print to digital presents unique typographic challenges that require new thinking. Screen resolution, rendering differences, and variable viewing distances demand fonts optimized for legibility rather than ink flow. Variable fonts have emerged as powerful tools, allowing a single file to serve multiple weights and widths without performance penalties. Modern CSS gives designers precision previously reserved for print, while responsive design demands typeface systems that scale elegantly across devices.'
  },
  {
    type: 'article',
    label: 'Article: Contrast and Readability',
    text: 'Contrast is the enemy of ambiguity in typography. Whether through weight, size, color, or spacing, creating distinct visual differences between typographic elements ensures clarity of intent and hierarchy. High contrast ratios benefit not just accessibility—they sharpen the entire design system, making it more scannable and digestible. The strongest designs often employ dramatic contrast: a whisper-thin display face paired with robust body text, or monochromatic color schemes punctuated by a single bold accent.'
  },
  {
    type: 'article',
    label: 'Article: Rhythm and Flow',
    text: 'Typography creates rhythm through consistent spacing and proportional relationships. A modular scale—where each size relates mathematically to others—creates visual harmony that feels intentional without announcing itself. This rhythmic quality extends beyond individual typefaces to entire systems: consistent line heights across different sizes, proportional margins, and aligned baselines create an invisible grid that unifies a design. When readers feel rhythm without consciously noticing it, typography has succeeded.'
  },
  {
    type: 'article',
    label: 'Article: Type Pairing',
    text: 'The art of pairing typefaces is about creating dialogue between distinct voices while maintaining visual cohesion. Traditional pairings—serif with sans-serif, display with body—work because they provide contrast without chaos. Modern pairing embraces subtlety: two sans-serifs with different x-heights and proportions can create tension and distinction while feeling unified. The best pairings amplify each other\'s strengths, creating a system greater than the sum of its parts.'
  },
  {
    type: 'article',
    label: 'Article: Cultural Typography',
    text: 'Typography carries cultural weight that extends beyond mere letterforms. Character design reflects the values and aesthetics of its era and origin, from the structured geometry of Swiss design to the expressive warmth of humanist typefaces. Understanding this context enriches design choices: selecting a typeface becomes not just a functional decision but a cultural statement. As digital design becomes increasingly global, appreciating diverse typographic traditions becomes essential to creating truly inclusive experiences.'
  },
  {
    type: 'article',
    label: 'Article: Performance and Variables',
    text: 'Variable fonts represent a paradigm shift in how we deliver typography across the web. Instead of multiple font files for different weights and widths, a single variable font provides infinite gradations along defined axes. This reduces bandwidth, improves performance, and enables dynamic typography that responds to context—lighter weights on small screens, bolder weights at larger sizes. The technical elegance matches the design sophistication: fewer files, faster loads, more possibilities.'
  },

  // Pullquotes: Single impactful sentences
  {
    type: 'pullquote',
    label: 'Quote: Typography as Communication',
    text: 'Typography is invisible when it works well and screams when it doesn\'t.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Typeface Personality',
    text: 'A typeface is a carrier of personality and voice—choose wisely.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Simplicity in Design',
    text: 'The best typography is so clear and logical that its presence goes unnoticed.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Detail Obsession',
    text: 'Perfection is not just about big moves; it\'s about endless attention to small ones.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Reader First',
    text: 'Every typographic decision should serve the reader, not the designer\'s ego.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Consistency',
    text: 'A consistent system creates trust; inconsistency breeds confusion.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Type and Emotion',
    text: 'The right typeface doesn\'t just display words—it shapes how they\'re felt.'
  },
  {
    type: 'pullquote',
    label: 'Quote: Accessibility',
    text: 'Accessible typography isn\'t a constraint—it\'s good design discipline.'
  },

  // Cards: heading + short body
  {
    type: 'card',
    label: 'Card: Font Weight Impact',
    text: 'Weight Control',
    secondaryText: 'Font weight transforms the visual impact of letterforms without changing their character. Light weights suggest elegance and refinement, while bold weights command attention and authority.'
  },
  {
    type: 'card',
    label: 'Card: Baseline Alignment',
    text: 'Baseline Grid',
    secondaryText: 'Aligning text to a consistent baseline grid creates visual order and improves readability by establishing predictable rhythm across vertical space.'
  },
  {
    type: 'card',
    label: 'Card: X-Height Considerations',
    text: 'Optical Balance',
    secondaryText: 'X-height relative to cap height affects how large type appears. High x-height typefaces appear larger and more legible at small sizes.'
  },
  {
    type: 'card',
    label: 'Card: Letter Spacing Fine-Tuning',
    text: 'Tracking Precision',
    secondaryText: 'Subtle letter spacing adjustments, called tracking, can tighten headlines or open up body text for improved visual texture and readability.'
  },
  {
    type: 'card',
    label: 'Card: Line Height Science',
    text: 'Rhythm and Comfort',
    secondaryText: 'Optimal line height depends on measure length and typeface metrics, but typically ranges from 1.4 to 1.8 for body text to ensure comfortable reading.'
  },
  {
    type: 'card',
    label: 'Card: Measure and Readability',
    text: 'Column Width Matters',
    secondaryText: 'The width of text, or measure, affects comprehension. Too narrow creates excessive hyphenation; too wide causes eye strain and loses place when wrapping.'
  },
  {
    type: 'card',
    label: 'Card: Contrast Ratios',
    text: 'Visibility Standards',
    secondaryText: 'WCAG standards recommend at least 4.5:1 contrast ratio for normal text to ensure legibility for users with low vision or color blindness.'
  },
  {
    type: 'card',
    label: 'Card: Variable Fonts Advantage',
    text: 'Fluid Typography',
    secondaryText: 'Variable fonts allow infinite gradations between defined axes, enabling responsive typography that adapts gracefully to different screen sizes and contexts.'
  },
  {
    type: 'card',
    label: 'Card: Decorative Type',
    text: 'Accent with Purpose',
    secondaryText: 'Display and decorative typefaces add personality and visual distinction when used deliberately, but should be reserved for headlines and special moments.'
  },
  {
    type: 'card',
    label: 'Card: Type Performance',
    text: 'Loading Optimization',
    secondaryText: 'Optimize typography performance through font subsetting, choosing web-optimized formats, and limiting typeface variations to essential styles.'
  },

  // Captions: 1-2 sentences
  {
    type: 'caption',
    label: 'Caption: Serif Warmth',
    text: 'Serif typefaces connect to centuries of typographic tradition, creating familiarity and authority in editorial contexts.'
  },
  {
    type: 'caption',
    label: 'Caption: Sans Clarity',
    text: 'Sans-serif typefaces prioritize clarity and modernity, making them ideal for digital interfaces where legibility is paramount.'
  },
  {
    type: 'caption',
    label: 'Caption: Mono Precision',
    text: 'Monospace fonts align characters to equal widths, essential for code and technical content where character relationships matter.'
  },
  {
    type: 'caption',
    label: 'Caption: Scale Harmony',
    text: 'Using a typographic scale—proportional size relationships—creates visual harmony and makes spacing decisions feel intentional and unified.'
  },
  {
    type: 'caption',
    label: 'Caption: Color Strategy',
    text: 'Typography color extends beyond black and white; strategic use of color can emphasize hierarchy, create focus, and guide user attention.'
  },
  {
    type: 'caption',
    label: 'Caption: Responsive Design',
    text: 'Modern typography must adapt: smaller sizes and adjusted line heights on mobile, larger sizes and generous spacing on desktop.'
  },
  {
    type: 'caption',
    label: 'Caption: Font Loading',
    text: 'Web fonts can impact performance significantly; strategic font loading, subsetting, and format selection are crucial for fast-loading pages.'
  },
  {
    type: 'caption',
    label: 'Caption: Type Testing',
    text: 'Always test typography across devices, browsers, and lighting conditions to ensure the intended experience reaches all users reliably.'
  },

  // Navigation: 5-7 menu items as newline-separated text
  {
    type: 'navigation',
    label: 'Navigation: Design Fundamentals',
    text: 'Typography\nColor & Contrast\nLayout & Grid\nWhitespace\nAccessibility\nResponsive Design'
  },
  {
    type: 'navigation',
    label: 'Navigation: Type Categories',
    text: 'Sans-Serif\nSerif\nSlab Serif\nMonospace\nDisplay\nDecorative\nHandwriting'
  },
  {
    type: 'navigation',
    label: 'Navigation: Tools & Resources',
    text: 'Font Libraries\nTypeface Pairers\nMetrics Calculators\nDesign Systems\nCSS Frameworks\nVariable Font Editors'
  },
  {
    type: 'navigation',
    label: 'Navigation: Best Practices',
    text: 'Type Pairing\nHierarchy Creation\nAccessibility Standards\nPerformance Optimization\nBrand Consistency\nResponsive Scaling'
  },
  {
    type: 'navigation',
    label: 'Navigation: Learning Path',
    text: 'Type History\nFont Anatomy\nSelection Criteria\nImplementation\nAdvanced Techniques\nCase Studies'
  },
  {
    type: 'navigation',
    label: 'Navigation: Development',
    text: 'Web Typography\nCSS Variables\nFont Stacks\nWebfont Strategies\nPerformance Metrics\nTesting Methods'
  },
  {
    type: 'navigation',
    label: 'Navigation: Communities',
    text: 'Type Designers\nDesign Studios\nOpen Source Projects\nEducational Resources\nConferences & Events\nOnline Forums'
  },
  {
    type: 'navigation',
    label: 'Navigation: Advanced Topics',
    text: 'Variable Fonts\nOptical Sizing\nCultural Typography\nScriptural Systems\nAnimated Type\nData Visualization'
  },
  {
    type: 'navigation',
    label: 'Navigation: Quick Links',
    text: 'Google Fonts\nAdobe Fonts\nFont Bureau\nDJ Type\nExit Font\nFontfamily'
  },
  {
    type: 'navigation',
    label: 'Navigation: Getting Started',
    text: 'Choose Your Typeface\nSet Base Size\nEstablish Scale\nOptimize Spacing\nTest Accessibility\nDeploy & Monitor'
  }
]
