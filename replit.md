# Salsabeel Real Estate

## Overview

A modern real estate web application for Salsabeel Real Estate, a property developer based in Ajman, UAE. The platform showcases luxury properties including apartments, townhouses, and commercial units with features for property browsing, filtering, viewing requests, and contact inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Design**: RESTful JSON API under `/api` prefix
- **Development**: Hot module replacement via Vite middleware

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Managed via `drizzle-kit push`

### Key Data Models
- **Projects**: Real estate listings with images, features, pricing, location, status
- **Contact Inquiries**: User contact form submissions
- **Viewing Requests**: Property viewing appointment requests linked to projects

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components (Navbar, Footer, ProjectCard, etc.)
│   ├── pages/           # Route components (Home, Projects, ProjectDetails, etc.)
│   ├── lib/             # API client, utilities, query client
│   └── hooks/           # Custom React hooks
├── server/              # Express backend
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database access layer
│   ├── db.ts            # Database connection
│   └── seed.ts          # Initial data seeding
├── shared/              # Shared code between client/server
│   └── schema.ts        # Drizzle schema definitions
└── attached_assets/     # Static images (project photos, team photos)
```

### Design Patterns
- **Storage Pattern**: `IStorage` interface abstracts database operations for testability
- **API Layer**: Dedicated `lib/api.ts` handles all fetch requests with typed responses
- **Component Composition**: Layout component wraps pages with Navbar/Footer
- **Form Handling**: Native form elements with manual state management and toast notifications

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- `connect-pg-simple` for session storage (prepared but not actively used)

### UI Libraries
- Full suite of Radix UI primitives for accessible components
- `embla-carousel-react` for image carousels
- `lucide-react` for icons
- `cmdk` for command palette functionality

### Validation
- Zod for runtime schema validation
- `drizzle-zod` for generating Zod schemas from Drizzle tables

### Development Tools
- Replit-specific Vite plugins for dev banner, cartographer, and error overlay
- Custom `vite-plugin-meta-images` for OpenGraph image handling