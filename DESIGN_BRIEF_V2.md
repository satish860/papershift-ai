# Design Brief v2: OCR API for AI Workflows

## Document Purpose
This design brief translates the GTM strategy into concrete frontend design specifications. Use this document to build the landing page, demo interface, and signup flow.

---

## Brand Positioning (Context for Design)

**Target User:** AI/ML Engineers building RAG systems, AI agents, document pipelines
**Core Message:** "Clean OCR for AI Workflows"
**Key Insight:** Bad OCR breaks AI systems - we fix the foundation layer

**Tone:**
- Developer-first (technical, no fluff)
- Problem-solver (empathetic to pain points)
- Modern (dark mode, code-centric aesthetic)
- Trustworthy (show real examples, no marketing BS)

---

## Visual Design System

### Color Palette

**Primary Colors:**
- `#0A0A0A` - Background (deep black)
- `#1A1A1A` - Cards / Panels (subtle gray)
- `#FFFFFF` - Primary text
- `#A0A0A0` - Secondary text
- `#3B82F6` - Primary accent (blue - for CTAs, links)
- `#8B5CF6` - Secondary accent (purple - for highlights)

**Semantic Colors (Bounding Box Labels):**
- `#3B82F6` - Title (blue)
- `#6B7280` - Text (gray)
- `#10B981` - Table (green)
- `#8B5CF6` - Image (purple)
- `#F59E0B` - Header (amber)

**Status Colors:**
- `#10B981` - Success (green)
- `#EF4444` - Error (red)
- `#F59E0B` - Warning (amber)
- `#3B82F6` - Info (blue)

### Typography

**Font Stack:**
- **Primary:** Inter (clean, modern, readable)
- **Code:** JetBrains Mono (for code snippets, API examples)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

**Scale:**
- H1: 48px / 600 weight (hero headlines)
- H2: 36px / 600 weight (section headers)
- H3: 24px / 600 weight (subsections)
- Body: 16px / 400 weight (paragraphs)
- Small: 14px / 400 weight (captions, labels)
- Code: 14px / 400 weight (monospace)

**Line Height:** 1.6 (readable, spacious)

### Spacing System (8px Grid)
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px
- 3xl: 96px

### Border Radius
- sm: 4px (buttons, inputs)
- md: 8px (cards, modals)
- lg: 12px (large panels)
- full: 9999px (pills, badges)

### Shadows
- sm: `0 1px 2px rgba(0, 0, 0, 0.05)`
- md: `0 4px 6px rgba(0, 0, 0, 0.1)`
- lg: `0 10px 15px rgba(0, 0, 0, 0.2)`
- glow: `0 0 20px rgba(59, 130, 246, 0.3)` (for interactive elements)

---

## Landing Page Structure

### Layout (Desktop 1440px)

```
┌──────────────────────────────────────────────────────────────┐
│  NAVIGATION (80px height, fixed top)                         │
│  [Logo] ────────────────────── [Docs][Pricing][Sign In]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO SECTION (100vh - nav height)                           │
│                                                              │
│              Clean OCR for AI Workflows                      │
│         Stop letting bad OCR break your RAG systems          │
│                                                              │
│         [Try Demo ↗]    [View Docs →]                        │
│                                                              │
│  Code snippet preview (3 lines, syntax highlighted):         │
│  import requests                                             │
│  response = requests.post("https://api../ocr",              │
│      json={"url": "https://example.com/doc.pdf"})           │
│                                                              │
│  ↓ Scroll indicator ↓                                        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PROBLEM SECTION ("Why Clean OCR Matters")                   │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ RAG        │  │ AI Agents  │  │Multi-lingual│           │
│  │ Systems    │  │            │  │            │            │
│  │            │  │            │  │            │            │
│  │ Before→    │  │ Before→    │  │ Before→    │            │
│  │ After✓     │  │ After✓     │  │ After✓     │            │
│  │            │  │            │  │            │            │
│  │ 92% acc↑   │  │ 35% success│  │ 50+ langs  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  USE CASE TABS ("Built for AI Engineers")                    │
│                                                              │
│  ┌[RAG Pipeline]──[AI Agent]──[No-Code]──────────┐          │
│  │                                                │          │
│  │  Visual flow diagram                           │          │
│  │  PDF → OCR → Markdown → Vector DB → LLM       │          │
│  │                                                │          │
│  │  Code example (syntax highlighted):            │          │
│  │  # 1. OCR the document                        │          │
│  │  markdown = ocr_api.process(pdf_url)          │          │
│  │                                                │          │
│  │  # 2. Embed with LangChain                    │          │
│  │  chunks = splitter.split_text(markdown)       │          │
│  │  vectorstore = Chroma.from_texts(chunks)      │          │
│  │                                                │          │
│  └────────────────────────────────────────────────┘          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  INTERACTIVE DEMO                                            │
│                                                              │
│  Try It Now: Upload Your Document                            │
│                                                              │
│  ┌────────────────────────────────────────────┐             │
│  │  [Drag & Drop Area]                        │             │
│  │   or paste URL                             │             │
│  │                                            │             │
│  │  Try examples:                             │             │
│  │  [Hindi] [Arabic] [Japanese] [Financial]  │             │
│  └────────────────────────────────────────────┘             │
│                                                              │
│  (Expands to full-screen split view on upload)              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  INTEGRATION SECTION ("Works With Your Stack")               │
│                                                              │
│  [LangChain] [LlamaIndex] [Make.com] [Zapier]              │
│                                                              │
│  Tabbed code examples for each                              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PRICING                                                     │
│                                                              │
│  [Developer] [Startup] [Enterprise]                         │
│  Free         $99/mo    Custom                              │
│                                                              │
│  (See detailed pricing table below)                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ROADMAP ("What's Next")                                     │
│                                                              │
│  ✅ Launched: Markdown output, Multi-lingual, Streaming     │
│  🚧 Coming Soon: Structured extraction, LangChain module    │
│  🔮 Future: Self-hosted Docker, Custom models               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FINAL CTA                                                   │
│                                                              │
│  Ready to Build Better AI Workflows?                         │
│  [Start Free]  [Book Demo]                                  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FOOTER                                                      │
│  [Product] [Docs] [Community] [Company]                     │
│  © 2025 Your Company                                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Navigation Bar

**Dimensions:**
- Height: 80px
- Max width: 1200px (centered)
- Padding: 0 24px

**Layout:**
- Logo (left): 140px width
- Nav links (right): Docs | Pricing | Sign In
- CTA button (right): "Get API Key" (primary button)

**States:**
- Default: Translucent background (`rgba(10, 10, 10, 0.8)`)
- Scrolled: Solid background (`#0A0A0A`) with subtle shadow
- Backdrop blur: `blur(10px)`

**Mobile (< 768px):**
- Hamburger menu (right)
- Logo (left, smaller)
- Menu expands downward (full-width)

---

### 2. Hero Section

**Content:**
- Headline: "Clean OCR for AI Workflows" (H1, 48px, gradient text)
- Subheadline: "Stop letting bad OCR break your RAG systems" (18px, secondary text)
- Primary CTA: "Try Demo ↗" (large button, blue)
- Secondary CTA: "View Docs →" (ghost button, outlined)
- Code snippet: 3 lines, syntax highlighted, subtle background

**Layout:**
- Centered, max-width 800px
- Vertical spacing: 24px between elements
- Code snippet: 600px width, 16px padding

**Animation (on load):**
1. Headline fades in (300ms)
2. Subheadline fades in (150ms delay)
3. CTAs fade in (150ms delay)
4. Code snippet types in (character-by-character, 20ms per char)

**Scroll indicator:**
- Animated chevron (bounces subtly)
- Fades out on scroll

---

### 3. Problem Section ("Why Clean OCR Matters")

**Structure:** 3 cards in a row (desktop), stacked (mobile)

**Card Design:**
- Background: `#1A1A1A`
- Border radius: 12px
- Padding: 32px
- Width: 32% each (with gaps)
- Min-height: 400px

**Card Content:**
- Icon (top): 48px SVG icon
- Title: H3 (24px)
- Before/After: 2 lines with icons (✗ Before, ✓ After)
- Stat: Large number (36px) with label

**Example Card (RAG Systems):**
```
┌─────────────────────┐
│  🔍                 │
│  RAG Systems        │
│                     │
│  ✗ Garbage OCR      │
│    → Wrong answers  │
│                     │
│  ✓ Clean markdown   │
│    → Right answers  │
│                     │
│  92% accuracy ↑     │
└─────────────────────┘
```

**Hover state:**
- Scale: 1.02
- Shadow: Larger glow
- Transition: 200ms ease-out

---

### 4. Use Case Tabs

**Tab Navigation:**
- Horizontal tabs (desktop), dropdown (mobile)
- Active tab: Blue underline (3px), blue text
- Inactive tabs: Gray text, hover → lighter gray

**Tab Content:**
- Max width: 1000px (centered)
- Padding: 48px
- Background: `#1A1A1A`
- Border radius: 12px

**Layout (per tab):**
- Top: Visual flow diagram (SVG arrows, boxes)
- Middle: H3 heading + description
- Bottom: Code block (syntax highlighted)

**Code Block Design:**
- Background: `#0A0A0A` (darker than card)
- Border: 1px solid `#2A2A2A`
- Padding: 24px
- Font: JetBrains Mono, 14px
- Copy button (top-right): Hover → Blue
- Line numbers (left): Gray, 14px

**Animation (tab switch):**
- Fade out old content (150ms)
- Fade in new content (200ms, 50ms delay)

---

### 5. Interactive Demo

**Upload Area (Default State):**
```
┌────────────────────────────────────────┐
│                                        │
│         📄                             │
│                                        │
│    Drop file or paste URL              │
│                                        │
│    Try examples:                       │
│    [Hindi] [Arabic] [Japanese] [PDF]  │
│                                        │
└────────────────────────────────────────┘
```

**Styling:**
- Width: 600px (desktop), 100% (mobile)
- Height: 300px
- Border: 2px dashed `#2A2A2A`
- Border radius: 12px
- Background: `rgba(26, 26, 26, 0.5)`

**Hover State:**
- Border: 2px solid `#3B82F6` (blue glow)
- Background: `rgba(59, 130, 246, 0.05)`
- Scale: 1.01
- Cursor: pointer

**Drag Over State:**
- Border: 2px solid `#3B82F6`
- Background: `rgba(59, 130, 246, 0.1)`
- Text: "Drop to upload"

**Example Buttons:**
- Style: Small pills
- Background: `#2A2A2A`
- Hover: `#3A3A3A`
- Padding: 8px 16px
- Border radius: 20px

---

### 6. Processing View (Split Screen)

**Trigger:** User uploads document or clicks example

**Animation:** Landing page content fades out (300ms), split screen fades in (400ms)

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  ████████████████████ 45% • ETA: 8s ████                     │ ← Progress bar
├──────────────────────────────────────┬───────────────────────┤
│                                      │                       │
│    Document Viewer                   │   Markdown Output     │
│    (with bbox overlay)               │   (syntax highlight)  │
│                                      │                       │
│  ┌────────────────────────────────┐  │ # Invoice            │
│  │                                │  │                      │
│  │  [Document Image]              │  │ **Date:** 2024-01-15 │
│  │                                │  │                      │
│  │   Title (Blue box)             │  │ | Item | Price |    │
│  │   Text (Gray box)              │  │ |------|-------|    │
│  │   Table (Green box)            │  │ | Foo  | $100  |    │
│  │                                │  │                      │
│  └────────────────────────────────┘  │                      │
│                                      │  [Copy]  [Download]  │
│                                      │                      │
└──────────────────────────────────────┴───────────────────────┘
                ↑ Draggable divider (4px width)
```

**Progress Bar:**
- Height: 4px
- Background: `#2A2A2A`
- Fill: Gradient (`#3B82F6` → `#8B5CF6`)
- Leading edge: Subtle glow
- Text: "45% • ETA: 8s" (centered, 14px)

**Left Panel (Document Viewer):**
- Background: `#0A0A0A` (darkest)
- Document: Full width, centered
- Bbox overlay: Absolute positioned divs
- Zoom controls (bottom-right): `[−] [100%] [+]`

**Right Panel (Markdown Output):**
- Background: `#1A1A1A`
- Padding: 32px
- Markdown rendering: GitHub-style
- Syntax highlighting: VS Code Dark+ theme
- Buttons (top-right): Copy, Download

**Divider:**
- Width: 4px
- Background: `#2A2A2A`
- Hover: `#3B82F6` (blue)
- Cursor: `col-resize`
- Draggable range: 30%-70%

---

### 7. Bounding Box Overlay

**Default State:**
- Border: 2px solid (color by label)
- Fill: 10% opacity of border color
- Label: Top-left corner, small badge

**Label Badge:**
- Background: Solid border color
- Text: White, 12px, uppercase
- Padding: 4px 8px
- Border radius: 4px

**Hover State:**
- Border: 3px (thicker)
- Fill: 20% opacity (more visible)
- Z-index: Raise to top
- Corresponding markdown line highlights yellow

**Animation (on appear):**
- Fade in: Opacity 0→1 (300ms)
- Stagger: 100ms delay between each bbox
- Order: Top to bottom

**Interactive:**
- Click bbox → Zoom to that region + highlight markdown
- Click outside → Reset zoom + remove highlight

---

### 8. Pricing Section

**Layout:** 3 cards in a row (desktop), stacked (mobile)

**Card Design:**
- Width: 32% each
- Background: `#1A1A1A`
- Border: 1px solid `#2A2A2A`
- Border radius: 12px
- Padding: 32px
- Min-height: 500px

**Card Structure:**
```
┌─────────────────────┐
│ Developer           │ ← Badge (top-left)
│                     │
│ $0/month           │ ← Price (large)
│                     │
│ 100 docs/month     │ ← Main feature
│ All features       │
│ Community support  │
│                     │
│ [Try Free]         │ ← CTA button
│                     │
│ What's Included:   │ ← Features list
│ ✓ Feature 1        │
│ ✓ Feature 2        │
│ ✓ Feature 3        │
└─────────────────────┘
```

**Badge (Plan Name):**
- Font: 12px, uppercase
- Background: `#2A2A2A`
- Padding: 6px 12px
- Border radius: 20px

**Price:**
- Font: 48px, bold
- Color: White
- `/month` in smaller, gray text

**Popular Badge (Startup plan):**
- Background: `#3B82F6` (blue)
- Text: "POPULAR"
- Position: Top-right corner
- Absolute positioned

**CTA Button:**
- Full width within card
- Height: 48px
- Primary button style (blue)
- Or ghost button (Free plan)

**Features List:**
- Checkmark icon: Green `#10B981`
- Line height: 1.8 (spacious)
- Font: 14px

**Hover State (Entire Card):**
- Border: 1px solid `#3B82F6` (blue)
- Scale: 1.02
- Shadow: Larger glow
- Transition: 200ms

---

### 9. Roadmap Section

**Structure:** 3 columns (desktop), stacked (mobile)

**Column Design:**
- No heavy borders (lightweight feel)
- Icon + Status + Features list
- Clean, scannable

**Layout:**
```
┌──────────────┬──────────────┬──────────────┐
│ ✅ Launched  │ 🚧 Coming    │ 🔮 Future    │
│              │    Soon      │              │
│ • Markdown   │ • Structured │ • Self-hosted│
│   output     │   extraction │   Docker     │
│ • Multi-     │ • LangChain  │ • Custom     │
│   lingual    │   module     │   models     │
│ • Streaming  │ • Make.com   │ • Webhooks   │
│              │   native     │              │
└──────────────┴──────────────┴──────────────┘
```

**Status Icons:**
- ✅ Green checkmark (launched)
- 🚧 Amber construction (coming soon)
- 🔮 Purple crystal ball (future)

**Styling:**
- Font: 16px
- Line height: 1.8
- Bullet points: Simple dots
- Status text: Bold

**"Coming Soon" Note:**
- Below roadmap section
- Background: `rgba(59, 130, 246, 0.1)` (blue tint)
- Border: 1px solid `rgba(59, 130, 246, 0.3)`
- Border radius: 8px
- Padding: 16px
- Text: "🐳 Enterprise: Self-hosted Docker deployment available Q1 2025 • [Join waitlist]"
- Link: Underlined blue

---

### 10. Signup Flow (Modal)

**Trigger:** Click "Try Demo", "Get API Key", "Start Free"

**Modal Design:**
- Max width: 500px
- Background: `#1A1A1A`
- Border radius: 12px
- Padding: 40px
- Centered on screen
- Backdrop: `rgba(0, 0, 0, 0.8)` with blur

**Form Fields:**

**Email:**
- Label: "Email" (14px, gray)
- Input: Full width, 48px height
- Background: `#0A0A0A`
- Border: 1px solid `#2A2A2A`
- Focus: Border blue, subtle glow

**Name:**
- Same styling as email

**Use Case (Dropdown - CRITICAL):**
- Label: "What are you building?"
- Options:
  - RAG / Document Q&A System
  - AI Agent / Automation
  - Document Processing Pipeline
  - Research / Analysis Tool
  - No-Code Workflow (Make.com/Zapier)
  - Other
- If "Other" selected → Show text field below

**Company (Optional):**
- Label: "Company (optional)"
- Placeholder: "Which company are you building this for?"

**Submit Button:**
- Text: "Get API Key"
- Full width
- Height: 48px
- Primary button (blue)
- Loading state: Spinner + "Creating account..."

**Footer:**
- Small text: "By signing up, you agree to our [Terms] and [Privacy Policy]"
- Font: 12px, gray

---

## Button Styles

### Primary Button
- Background: `#3B82F6` (blue)
- Text: White, 16px, bold
- Padding: 12px 24px
- Border radius: 8px
- Hover: `#2563EB` (darker blue), slight lift
- Active: `#1D4ED8`, scale 0.98
- Shadow: `0 4px 12px rgba(59, 130, 246, 0.3)`

### Secondary Button (Ghost)
- Background: Transparent
- Border: 1px solid `#3B82F6`
- Text: `#3B82F6`, 16px, bold
- Padding: 12px 24px
- Border radius: 8px
- Hover: Background `rgba(59, 130, 246, 0.1)`

### Small Button (e.g., example tags)
- Background: `#2A2A2A`
- Text: White, 14px
- Padding: 8px 16px
- Border radius: 20px
- Hover: `#3A3A3A`

### Icon Button (e.g., Copy, Download)
- Background: `#2A2A2A`
- Size: 40px × 40px
- Border radius: 8px
- Icon: 20px, white
- Hover: `#3B82F6` (blue)

---

## Responsive Breakpoints

### Desktop (1440px+)
- Max content width: 1200px
- Split screen: 50/50
- Cards: 3 per row
- Code examples: Full width

### Laptop (1024px - 1439px)
- Max content width: 960px
- Split screen: 50/50
- Cards: 3 per row (slightly narrower)

### Tablet (768px - 1023px)
- Max content width: 100% (padding 24px)
- Split screen: 40/60 (document smaller)
- Cards: 2 per row
- Use case tabs: Stacked instead of tabs

### Mobile (< 768px)
- Padding: 16px
- Split screen: Tabbed view (Document tab / Markdown tab)
- Cards: 1 per row (full width)
- Navigation: Hamburger menu
- Font sizes: Scale down 10-20%

---

## Animation Guidelines

### Page Load
1. Navigation fades in (200ms)
2. Hero content appears (300ms, staggered)
3. Code snippet types in (character-by-character)
4. Scroll indicator bounces (infinite loop)

### Hover States
- Duration: 150-200ms
- Easing: ease-out
- Properties: Transform (scale, translateY), color, shadow
- Subtle (don't overdo it)

### Transitions
- Page sections: Fade + slide up (400ms)
- Tab content: Crossfade (300ms)
- Modal: Scale from 0.95→1 + fade (300ms)

### Processing Animation
1. Upload complete → Transition to split screen (400ms)
2. Progress bar animates smoothly (not jumpy)
3. Bounding boxes fade in with stagger (100ms each)
4. Markdown text appears line-by-line (fast, 50ms per line)
5. Success animation (checkmark, 500ms spring)

---

## Copy & Messaging

### Headlines (Clear, Benefit-Focused)
- ✅ "Clean OCR for AI Workflows"
- ✅ "Stop letting bad OCR break your RAG systems"
- ❌ "The Best OCR API in the World" (too generic)
- ❌ "Advanced Document Processing" (vague)

### Call-to-Actions
- ✅ "Try Demo ↗" (action-oriented)
- ✅ "Get API Key" (clear outcome)
- ✅ "Start Free" (no commitment)
- ❌ "Learn More" (weak)
- ❌ "Submit" (boring)

### Feature Descriptions (Problem → Solution)
- ✅ "Bad OCR output → Polluted embeddings → Wrong answers. We fix the foundation."
- ❌ "Our OCR uses advanced AI algorithms..." (who cares)

---

## Assets Needed

### From Designer:

**1. Landing Page Mockups:**
- Desktop (1440px): Full page
- Tablet (768px): Key sections
- Mobile (375px): Mobile flow

**2. Demo Interface Mockups:**
- Processing view (split screen)
- Bbox overlay examples (all label types)
- Progress states (0%, 50%, 100%)
- Interactive states (hover bbox, highlight markdown)

**3. Component Library:**
- Button variations (primary, secondary, small, icon)
- Input fields (default, focus, error)
- Cards (pricing, use case, problem)
- Code blocks (syntax highlighted examples)
- Modal (signup, survey)

**4. Icons:**
- Navigation icons (menu, close)
- Feature icons (search, bot, globe)
- Status icons (checkmark, loading, error)
- Action icons (copy, download, upload)

**5. Illustrations (Optional):**
- Flow diagrams (RAG pipeline, agent workflow)
- Before/after comparisons (bad OCR vs clean)

### From Content:

**1. Code Examples:**
- Python (LangChain integration)
- JavaScript/Node.js (API call)
- cURL (quick test)
- Make.com scenario JSON

**2. Sample Documents:**
- Hindi/English receipt (messy)
- Arabic form (stamps, signatures)
- Japanese invoice (handwritten notes)
- Financial PDF (10-K report, tables)

**3. Demo Results:**
- Pre-processed markdown for each example
- Bbox coordinates (for instant demo)

---

## Technical Implementation Notes

### Frontend Stack (Recommended)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + **shadcn/ui components**
- **UI Primitives:** Radix UI (via shadcn/ui)
- **Animations:** Framer Motion (for custom animations beyond shadcn)
- **Code Highlighting:** Shiki or react-syntax-highlighter
- **Icons:** Lucide Icons (shadcn's default icon library)
- **Forms:** React Hook Form + Zod validation (shadcn's recommended stack)
- **Analytics:** PostHog or Mixpanel

### Why shadcn/ui?
- ✅ **Dark mode native:** Built-in support, matches our aesthetic
- ✅ **Accessible:** Radix UI primitives (keyboard nav, ARIA, screen readers)
- ✅ **Customizable:** Copy-paste components, own the code
- ✅ **Developer-friendly:** TypeScript-first, works perfectly with Next.js
- ✅ **Production-ready:** Used by Vercel, Linear, Cal.com
- ✅ **Fast development:** 80% of UI components pre-built

### Quick Setup

```bash
# Initialize Next.js project
npx create-next-app@latest ocr-frontend --typescript --tailwind --app

# Initialize shadcn/ui
cd ocr-frontend
npx shadcn-ui@latest init

# Install needed components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add badge
```

### Theme Configuration (tailwind.config.ts)

```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(0 0% 16%)",        // #2A2A2A
        input: "hsl(0 0% 16%)",
        ring: "hsl(217 91% 60%)",       // #3B82F6

        background: "hsl(0 0% 4%)",     // #0A0A0A
        foreground: "hsl(0 0% 100%)",   // #FFFFFF

        primary: {
          DEFAULT: "hsl(217 91% 60%)",  // #3B82F6 - Blue
          foreground: "hsl(0 0% 100%)", // White
        },

        secondary: {
          DEFAULT: "hsl(263 70% 62%)",  // #8B5CF6 - Purple
          foreground: "hsl(0 0% 100%)",
        },

        muted: {
          DEFAULT: "hsl(0 0% 16%)",     // #2A2A2A
          foreground: "hsl(0 0% 63%)",  // #A0A0A0
        },

        accent: {
          DEFAULT: "hsl(217 91% 60%)",
          foreground: "hsl(0 0% 100%)",
        },

        card: {
          DEFAULT: "hsl(0 0% 10%)",     // #1A1A1A
          foreground: "hsl(0 0% 100%)",
        },

        popover: {
          DEFAULT: "hsl(0 0% 10%)",
          foreground: "hsl(0 0% 100%)",
        },

        // Custom colors for bbox labels
        "bbox-title": "hsl(217 91% 60%)",     // Blue
        "bbox-text": "hsl(220 9% 46%)",       // Gray
        "bbox-table": "hsl(142 71% 45%)",     // Green
        "bbox-image": "hsl(263 70% 62%)",     // Purple
        "bbox-header": "hsl(38 92% 50%)",     // Amber
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### Component Mapping: shadcn → Design Elements

| Design Element | shadcn Component | Custom Modifications |
|----------------|------------------|----------------------|
| Primary CTA Button | `Button` variant="default" | Add glow effect on hover |
| Secondary Button | `Button` variant="outline" | Custom blue outline |
| Hero Section | Custom layout | shadcn typography utilities |
| Problem Cards | `Card` + `CardHeader` + `CardContent` | Hover scale animation |
| Use Case Tabs | `Tabs` + `TabsList` + `TabsContent` | Custom tab styling |
| Upload Area | Custom with react-dropzone | Styled with Tailwind |
| Signup Modal | `Dialog` + `DialogContent` | Custom form layout |
| Form Inputs | `Input` + `Label` | Default styling works |
| Dropdown Select | `Select` + `SelectContent` + `SelectItem` | Default styling works |
| Progress Bar | `Progress` | Custom ETA text display |
| Pricing Cards | `Card` + `Badge` | Popular badge positioning |
| Code Blocks | Custom (react-syntax-highlighter) | Not in shadcn |
| Tooltips | `Tooltip` + `TooltipContent` | Default styling works |
| Document Viewer | **Custom Canvas/SVG** | Not in shadcn |
| Split Layout | **Custom or react-resizable-panels** | Not in shadcn |
| Bbox Overlay | **Custom SVG/Canvas** | Not in shadcn |
| Markdown Renderer | **Custom (react-markdown)** | Not in shadcn |

### shadcn Component Examples

#### 1. Primary CTA Button (Hero Section)

```tsx
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

<Button size="lg" className="group">
  Try Demo
  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</Button>
```

#### 2. Problem Cards (3-Column Grid)

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <Card className="border-border hover:border-primary transition-all hover:scale-105">
    <CardHeader>
      <Search className="h-12 w-12 text-primary mb-4" />
      <CardTitle>RAG Systems</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <p className="text-sm text-muted-foreground">
        ✗ Garbage OCR → Wrong answers
      </p>
      <p className="text-sm">
        ✓ Clean markdown → Right answers
      </p>
      <p className="text-2xl font-bold text-primary mt-4">
        92% accuracy ↑
      </p>
    </CardContent>
  </Card>

  {/* Repeat for AI Agents and Multi-lingual cards */}
</div>
```

#### 3. Use Case Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="rag" className="w-full max-w-4xl mx-auto">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="rag">RAG Pipeline</TabsTrigger>
    <TabsTrigger value="agent">AI Agent</TabsTrigger>
    <TabsTrigger value="nocode">No-Code</TabsTrigger>
  </TabsList>

  <TabsContent value="rag" className="mt-6 space-y-4">
    <div className="bg-card rounded-lg p-8">
      {/* Flow diagram */}
      <div className="flex items-center justify-between mb-6">
        <span>PDF</span>
        <span>→</span>
        <span>OCR</span>
        <span>→</span>
        <span>Vector DB</span>
        <span>→</span>
        <span>LLM</span>
      </div>

      {/* Code example */}
      <pre className="bg-background p-4 rounded-md overflow-x-auto">
        <code className="text-sm">
{`# 1. OCR the document
markdown = ocr_api.process(pdf_url)

# 2. Embed with LangChain
chunks = splitter.split_text(markdown)
vectorstore = Chroma.from_texts(chunks)`}
        </code>
      </pre>
    </div>
  </TabsContent>

  {/* Other tab contents */}
</Tabs>
```

#### 4. Signup Modal

```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button size="lg">Get API Key</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Get API Key</DialogTitle>
      <DialogDescription>
        Start building in 5 minutes. No credit card required.
      </DialogDescription>
    </DialogHeader>

    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="usecase">What are you building?</Label>
        <Select required>
          <SelectTrigger id="usecase">
            <SelectValue placeholder="Select use case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rag">RAG / Document Q&A System</SelectItem>
            <SelectItem value="agent">AI Agent / Automation</SelectItem>
            <SelectItem value="pipeline">Document Processing Pipeline</SelectItem>
            <SelectItem value="research">Research / Analysis Tool</SelectItem>
            <SelectItem value="nocode">No-Code Workflow (Make.com/Zapier)</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input
          id="company"
          placeholder="Which company are you building this for?"
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Get API Key
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By signing up, you agree to our{" "}
        <a href="/terms" className="underline">Terms</a> and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>
      </p>
    </form>
  </DialogContent>
</Dialog>
```

#### 5. Progress Bar (Processing View)

```tsx
import { Progress } from "@/components/ui/progress"

<div className="w-full space-y-2">
  <Progress value={45} className="h-1" />
  <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
    <span className="font-medium">45%</span>
    <span>•</span>
    <span>ETA: 8s</span>
  </div>
</div>
```

#### 6. Pricing Cards

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Developer Plan */}
  <Card>
    <CardHeader>
      <Badge variant="outline" className="w-fit mb-2">Developer</Badge>
      <CardTitle className="text-4xl">$0</CardTitle>
      <CardDescription>/month</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm">Perfect for side projects and testing</p>
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">100 documents/month</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">All features</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">Community support</span>
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">Try Free</Button>
    </CardFooter>
  </Card>

  {/* Startup Plan (Popular) */}
  <Card className="border-primary relative">
    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
      Popular
    </Badge>
    <CardHeader>
      <Badge variant="outline" className="w-fit mb-2">Startup</Badge>
      <CardTitle className="text-4xl">$99</CardTitle>
      <CardDescription>/month</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm">For growing teams and production apps</p>
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">1,000 documents/month</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">All features</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">Priority support (24hr)</span>
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Start Trial</Button>
    </CardFooter>
  </Card>

  {/* Enterprise Plan */}
  <Card>
    <CardHeader>
      <Badge variant="outline" className="w-fit mb-2">Enterprise</Badge>
      <CardTitle className="text-4xl">Custom</CardTitle>
      <CardDescription>Let's talk</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm">Self-hosted Docker deployment</p>
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">Unlimited documents</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">Self-hosted Docker</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-sm">Custom SLA</span>
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">Contact Sales</Button>
    </CardFooter>
  </Card>
</div>
```

### Custom Components (Not in shadcn)

These require custom implementation:

#### 1. Document Viewer with Bbox Overlay

```tsx
// components/document-viewer.tsx
"use client"

import { useRef, useState } from "react"

interface BoundingBox {
  bbox: [number, number, number, number]
  label: string
  content: string
}

export function DocumentViewer({
  imageUrl,
  boundingBoxes,
  imageDimensions
}: {
  imageUrl: string
  boundingBoxes: BoundingBox[]
  imageDimensions: { width: number; height: number }
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const getLabelColor = (label: string) => {
    const colors = {
      Title: "hsl(217 91% 60%)",     // Blue
      Text: "hsl(220 9% 46%)",        // Gray
      Table: "hsl(142 71% 45%)",      // Green
      Image: "hsl(263 70% 62%)",      // Purple
      Header: "hsl(38 92% 50%)",      // Amber
    }
    return colors[label as keyof typeof colors] || colors.Text
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-background">
      <img
        src={imageUrl}
        alt="Document"
        className="w-full h-auto"
      />

      {/* Bbox overlays */}
      {boundingBoxes.map((box, index) => {
        const [x0, y0, x1, y1] = box.bbox
        const color = getLabelColor(box.label)

        return (
          <div
            key={index}
            className="absolute border-2 transition-all cursor-pointer"
            style={{
              left: `${(x0 / imageDimensions.width) * 100}%`,
              top: `${(y0 / imageDimensions.height) * 100}%`,
              width: `${((x1 - x0) / imageDimensions.width) * 100}%`,
              height: `${((y1 - y0) / imageDimensions.height) * 100}%`,
              borderColor: color,
              backgroundColor: hoveredIndex === index
                ? `${color}33`
                : `${color}1A`,
              borderWidth: hoveredIndex === index ? '3px' : '2px',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              className="absolute -top-6 left-0 text-xs font-medium px-2 py-1 rounded"
              style={{
                backgroundColor: color,
                color: 'white',
              }}
            >
              {box.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
```

#### 2. Upload Area with Drag & Drop

```tsx
// components/upload-area.tsx
"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UploadArea({ onUpload }: { onUpload: (file: File) => void }) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0])
    }
  }, [onUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  return (
    <div
      {...getRootProps()}
      className={`
        relative w-full max-w-2xl mx-auto p-12
        border-2 border-dashed rounded-lg
        transition-all cursor-pointer
        ${isDragActive
          ? 'border-primary bg-primary/10 scale-105'
          : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
        }
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4 text-center">
        {isDragActive ? (
          <>
            <File className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-lg font-medium">Drop to upload</p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-medium">Drop file or paste URL</p>
              <p className="text-sm text-muted-foreground mt-1">
                PDF, PNG, JPG up to 100MB
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="secondary" size="sm">Hindi Receipt</Button>
              <Button variant="secondary" size="sm">Arabic Form</Button>
              <Button variant="secondary" size="sm">Japanese Invoice</Button>
              <Button variant="secondary" size="sm">Financial PDF</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
```

### Key Components to Build

**1. Landing Page:**
- Hero section with animated code
- Problem cards (3-column grid)
- Tabbed use cases
- Interactive demo (upload + split screen)
- Pricing table
- Roadmap
- CTA sections

**2. Demo Interface:**
- Upload component (drag-drop + URL input)
- Split-screen layout (resizable)
- Document viewer (with zoom)
- Bbox overlay (interactive)
- Markdown renderer (syntax highlighted)
- Progress bar (with ETA)

**3. Signup Flow:**
- Modal component
- Form with validation
- Use case dropdown (crucial for data collection)
- Success state → Redirect to dashboard

**4. API Dashboard (Post-Signup):**
- API key display (with copy button)
- Quick start guide (tabbed: Python/Node/cURL)
- Usage stats (documents processed, remaining quota)
- Example code snippets

---

## User Flows

### Flow 1: First-Time Visitor → Demo → Signup

1. **Land on homepage** (0s)
   - See hero: "Clean OCR for AI Workflows"
   - Read problem section (understand pain)
   - Scroll to demo

2. **Try demo** (30s)
   - Click "Hindi Receipt" example
   - Watch split-screen processing
   - See bboxes appear, markdown fills in
   - Hover bbox → Markdown highlights (aha moment!)
   - Think: "This actually works"

3. **Signup** (60s)
   - Click "Get API Key"
   - Fill form (email, name, use case)
   - Select "RAG / Document Q&A"
   - Submit

4. **Dashboard** (90s)
   - See API key
   - Copy Python example
   - Test API call
   - Think: "That was easy"

---

### Flow 2: Developer from Reddit → Code Example → Signup

1. **Click Reddit link** (0s)
   - Direct to landing page
   - Scan hero (5 seconds to decide if relevant)
   - See code snippet → "This looks developer-friendly"

2. **Jump to use cases** (10s)
   - Click "RAG Pipeline" tab
   - Read code example (LangChain integration)
   - Think: "This is exactly what I need"

3. **Try demo** (20s)
   - Upload own PDF from work
   - Watch it process
   - See clean markdown output
   - Think: "Way better than Textract"

4. **Signup immediately** (30s)
   - High intent (already convinced)
   - Quick signup
   - Start integrating right away

---

### Flow 3: No-Code User from Make.com → Template → Signup

1. **Click Make.com forum link** (0s)
   - Direct to landing page
   - See "No-Code Workflow" in use cases
   - Think: "Finally, OCR for Make!"

2. **Try demo** (15s)
   - Upload invoice
   - See structured output
   - Think: "I can connect this to Google Sheets"

3. **Signup** (30s)
   - Select "No-Code Workflow" in signup
   - Get API key

4. **Download template** (45s)
   - Click "Get Make.com Template"
   - Import to Make.com
   - Replace API key
   - Test workflow
   - Think: "It just works!"

---

## Success Metrics (Design Quality)

### Page Load Performance:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

### UX Metrics:
- Time to first demo: < 30s from landing
- Demo completion rate: > 70%
- Signup conversion: > 15% of demo users
- Mobile usability score: > 90

### Engagement:
- Avg time on page: > 2 minutes
- Scroll depth: > 60% reach demo section
- Demo interactions: > 60% hover bboxes
- Repeat visits: > 20% come back

---

## Open Questions for Designer

1. **Logo style:** Wordmark or icon+text? Prefer minimal or detailed?
2. **Illustrations:** Flat, gradient, or 3D style for flow diagrams?
3. **Animation intensity:** Subtle (professional) or playful (engaging)?
4. **Mobile demo:** Tabs vs collapsed split? Upload-first or examples-first?
5. **Social proof:** Show logos (if available) or testimonial quotes only?

---

## Next Steps

### Week 1:
1. Designer creates landing page mockups (desktop, mobile)
2. Developer sets up Next.js project + Tailwind
3. Content team prepares sample documents + code examples

### Week 2:
1. Designer creates component library (buttons, cards, modals)
2. Developer builds landing page (static sections)
3. Content team writes copy for all sections

### Week 3:
1. Designer creates demo interface mockups (split-screen)
2. Developer builds interactive demo (upload + processing)
3. Integrate with existing API endpoints

### Week 4:
1. Designer reviews implementation, provides feedback
2. Developer adds animations + polish
3. QA testing (cross-browser, mobile)
4. Deploy to production

---

**Document Version:** 2.0 (AI-focused)
**Date:** 2025-01-05
**Status:** Ready for Design
**Replaces:** DESIGN_BRIEF.md v1 (generic document demo)
