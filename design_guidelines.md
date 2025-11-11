# Dovito EDU Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing primary inspiration from Levoair (modern SaaS), Dovito.ai (clean educational platform), and shadcn/ui (component library aesthetic). The design should feel like a premium educational platform with vibrant PWA characteristics and engaging, friction-free interactions.

## Core Design Principles
1. **Educational Authority**: Professional, trustworthy aesthetic that positions Dovito EDU as a credible learning resource
2. **Minimal Friction**: Every interaction should feel effortless - from login to content consumption to sharing
3. **PWA-First**: App-like experience with smooth transitions and native feel
4. **Content Showcase**: Design serves the educational content, never overshadows it

## Typography System
- **Primary Font**: Inter or similar modern sans-serif (Google Fonts CDN)
- **Accent Font**: Space Grotesk for headings and CTAs (adds personality)
- **Hierarchy**: 
  - Hero Headlines: text-5xl to text-6xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Card Titles: text-xl, font-semibold
  - Body Text: text-base, font-normal
  - UI Labels: text-sm, font-medium

## Layout & Spacing System
**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24 for consistency
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-20
- Card gaps: gap-6 to gap-8
- Container max-width: max-w-7xl

## Navigation Patterns

### Desktop: Left Sidebar
- Fixed sidebar (w-64), full-height
- Logo at top with square format
- Navigation items with icons (Heroicons)
- User avatar (initials) at bottom
- Active state with subtle background highlight

### Mobile: Bottom Navigation
- Fixed bottom bar (iOS-style safe area aware)
- 4-5 primary navigation items with icons
- Active state with icon fill + label color change
- Compact, thumb-friendly tap targets (min h-16)

## Page-Specific Guidelines

### Landing Page
- **Hero Section** (80vh): Large hero image showing collaborative learning or modern workspace. Overlay with semi-transparent gradient (bottom to top). Headline centered with dual CTAs ("Get Instant Access" primary, "Learn More" secondary). CTAs with backdrop-blur-md background.
- **Value Proposition**: 3-column grid showcasing Workshop Access, AI Tools Directory, Prompt Library with icons
- **Social Proof**: Logos/testimonials in 2-column layout
- **Final CTA**: Full-width section with background image, blurred CTA buttons

### Login Page
- Centered card (max-w-md) with generous padding (p-8)
- Email/password fields stacked vertically (gap-4)
- Divider with "OR" text between email and Google Auth
- Google button with logo, distinct styling
- "Forgot Password" and "Register" links below

### Dashboard
- **Overview Cards Grid**: 2x2 on desktop (lg:grid-cols-2), single column mobile
- Each card: Icon, title, description, interaction count/badge, arrow icon for navigation
- Quick access to: Workshop, AI Tools, Prompts, Media Links
- Recent activity feed in sidebar (desktop) or below cards (mobile)

### Workshop Viewer
- Embedded HTML slide deck in iframe (w-full, aspect-video or responsive height)
- Navigation controls: Previous/Next buttons, slide counter, fullscreen toggle
- Sidebar (collapsible mobile): Table of contents, download button, share buttons
- Clean white background to keep focus on content

### AI Tools List
- Searchable/filterable table with sticky header
- Columns: Tool Name (with icon), Category, Pricing, Features (tags), Use Cases, External Link button
- Alternating row backgrounds for readability
- Filter chips at top (category, pricing tier)
- Mobile: Card view with same information stacked

### Prompt Library
- Masonry grid layout (2-3 columns desktop, 1 mobile)
- Each prompt card: Category tag, prompt text (truncated with expand), action buttons row (Copy, Download, Share)
- Copy feedback: Toast notification with checkmark
- Search bar with real-time filtering at top

### Media Links
- Grid of social media cards (3 columns desktop, 2 tablet, 1 mobile)
- Each card: Platform icon, platform name, follower count, "Visit" button
- Consistent card height with centered content
- Hover state: subtle lift (transform translateY)

### Profile Management
- Two-column layout (desktop): Avatar section (left), Settings form (right)
- Avatar: Large circle with initials, gradient background based on name hash
- Forms: Name change, password change in separate bordered sections
- Save buttons at section bottoms

## Component Library

### Buttons
- Primary: Solid background, medium shadow, rounded-lg
- Secondary: Border outline, transparent background
- Blurred (for image overlays): backdrop-blur-md with semi-transparent background
- Icon buttons: Square with hover background

### Cards
- Border: border with subtle shadow (shadow-sm)
- Padding: p-6
- Rounded: rounded-xl
- Hover: Subtle shadow increase (shadow-md transition)

### Form Inputs
- Border style with focus ring
- Padding: px-4 py-3
- Rounded: rounded-lg
- Labels: text-sm font-medium, margin-b-2

### Share Buttons
- Icon-only compact buttons in horizontal row
- Platforms: Facebook, Twitter/X, LinkedIn, Email, Copy Link
- Tooltip on hover showing platform name
- Quick copy-link feedback

## PWA Elements
- **Install Prompt**: Banner or modal encouraging home screen installation (dismissible, shows once)
- **Offline Indicator**: Toast notification when offline with retry option
- **Loading States**: Skeleton screens during content load (matching layout structure)
- **App Icons**: Square logo in multiple sizes (192x192, 512x512) with solid background

## Images

### Landing Page Hero
Large, high-quality image (1920x1080 minimum) showing:
- Modern learning environment OR
- Collaborative workspace with laptops/devices OR
- Abstract tech/AI visualization with warm tones
Placement: Full-width background with gradient overlay (rgba gradient from transparent to semi-opaque)

### Dashboard Section Cards
Small icon-style illustrations (optional) for each content section card:
- Workshop: Presentation icon visualization
- AI Tools: Grid of app icons
- Prompts: Text/document visualization
- Media: Social media icons collage

### Workshop Content
User-provided HTML slide deck content (embedded)

## Accessibility
- ARIA labels on all navigation items, buttons, and interactive elements
- Keyboard navigation: Focus visible states (ring-2 ring-offset-2)
- Skip to content link for screen readers
- Sufficient contrast ratios (WCAG AA minimum)
- Form validation with clear error messages

## Animations (Minimal)
- Page transitions: Subtle fade (200ms)
- Button hovers: Scale slightly (1.02) with shadow increase
- Card hovers: translateY(-2px) with shadow
- No page scroll animations - keep performance optimal