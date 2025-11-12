# Dovito EDU

## Overview

Dovito EDU is a modern educational platform built as a Progressive Web App (PWA) that provides access to AI workshops, tools directory, and prompt library. The application features a clean, professional design inspired by modern SaaS platforms, with a focus on educational content delivery and minimal friction user experience.

The platform is built using a full-stack TypeScript architecture with React on the frontend and Express on the backend, utilizing PostgreSQL for data persistence through Drizzle ORM. It emphasizes mobile-first design with responsive layouts, offline capabilities, and social sharing features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management
- shadcn/ui component library built on Radix UI primitives

**Styling System:**
- Tailwind CSS with custom design tokens
- CSS variables for theming (light/dark mode support)
- Custom spacing system using Tailwind units (3, 4, 6, 8, 12, 16, 20, 24)
- Typography: Roboto for all text (headings and body)
- Design inspired by Levoair, Dovito.ai, and shadcn/ui aesthetics

**Component Structure:**
- UI components in `/client/src/components/ui/` (shadcn/ui components)
- Feature components in `/client/src/components/` (AppSidebar, MobileNav, ShareButtons, ThemeProvider, UserAvatar, LightRays)
- Page components in `/client/src/pages/` for each route
- Reusable hooks in `/client/src/hooks/`

**Navigation Pattern:**
- Desktop: Fixed left sidebar (w-64) with logo, navigation items, and user avatar
- Mobile: Bottom navigation bar with 5 primary items (iOS-style, safe-area aware)
- Responsive breakpoint at 768px

**PWA Features:**
- Progressive Web App manifest configured for installable experience
- Offline-capable design
- Mobile-optimized with touch-friendly tap targets
- Theme color and app icons configured

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Session-based authentication using express-session with MemoryStore
- Development mode uses Vite middleware for HMR
- Production mode serves static files from dist/public

**API Design:**
- RESTful endpoints under `/api` prefix
- Authentication endpoints: `/api/register`, `/api/login`, `/api/logout`, `/api/user`
- Session management with cookies (secure in production)
- JSON request/response format

**Authentication:**
- bcrypt for password hashing (10 rounds)
- Session-based authentication (no JWT)
- Password and email-based registration/login
- Google OAuth planned but not yet implemented
- User initials-based avatars (no profile picture uploads to avoid storage costs)

### Data Storage

**Database:**
- PostgreSQL database via Neon serverless driver
- Drizzle ORM for type-safe database queries
- Schema defined in `/shared/schema.ts`

**Schema Design:**
- `users` table with fields: id (UUID), email (unique), password (hashed), name (optional)
- Zod schemas for validation (insertUserSchema)
- Shared types between client and server via `/shared` directory

**Migration Strategy:**
- Drizzle Kit for schema migrations
- Migration files in `/migrations` directory
- `npm run db:push` to sync schema to database

### External Dependencies

**Core Infrastructure:**
- Neon PostgreSQL (serverless PostgreSQL hosting)
- Environment variable: `DATABASE_URL` required for database connection
- Google Analytics GA4 (mentioned in requirements, integration pending)

**UI Component Libraries:**
- Radix UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, etc.)
- cmdk for command palette functionality
- vaul for drawer component
- embla-carousel-react for carousels
- react-day-picker for date selection
- recharts for data visualization

**Styling & Design:**
- Tailwind CSS for utility-first styling
- class-variance-authority (cva) for component variants
- clsx and tailwind-merge for className composition
- Google Fonts CDN for Roboto font

**Development Tools:**
- Replit-specific plugins for development environment integration
- tsx for TypeScript execution in development
- esbuild for production bundling
- TypeScript with strict mode enabled

**Authentication & Security:**
- bcrypt for password hashing
- express-session for session management
- connect-pg-simple for PostgreSQL session store (installed but using MemoryStore)

**Form Management:**
- React Hook Form with @hookform/resolvers
- Zod for validation schemas
- Integration with shadcn/ui form components

**Icons:**
- Lucide React for general icons
- react-icons (Simple Icons) for brand icons (social media platforms)

**Social Sharing:**
- Client-side share functionality for Facebook, Twitter/X, LinkedIn, Email
- Clipboard API for copy-to-clipboard features
- Automatic backlinks to platform URL

**Future Integrations:**
- Google OAuth (planned but not implemented)
- Google Analytics GA4 (mentioned in requirements)
- GitHub Pages hosting (mentioned in original requirements but current setup uses Node.js server)