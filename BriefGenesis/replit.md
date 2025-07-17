# Briefly - UX/UI Brief Generator

## Overview

Briefly is a web application designed to generate fictional UX/UI project briefs for designers to practice their skills and build their portfolios. The application provides randomized project challenges similar to UX Challenges, helping designers improve their abilities through realistic practice scenarios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Design System**: Dark mode by default with modern typography (Inter font)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **UI Components**: Comprehensive set of Radix UI-based components via shadcn/ui

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build Process**: esbuild for server bundling

### Data Storage Solutions
- **Database**: PostgreSQL with persistent storage for saved briefings
- **ORM**: Drizzle with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless for PostgreSQL hosting
- **Implementation**: DatabaseStorage class replaces MemStorage for production use

## Key Components

### Frontend Components
1. **Home Page** (`/pages/home.tsx`): Main interface with project generation
2. **Project Card** (`/components/project-card.tsx`): Displays generated briefs with copy functionality
3. **UI Library**: Complete set of shadcn/ui components for consistent design
4. **Brief Generator** (`/utils/generate-brief.ts`): Client-side logic for creating fictional projects

### Backend Components
1. **Express Server** (`/server/index.ts`): Main application server with middleware
2. **Routes Handler** (`/server/routes.ts`): API endpoint definitions
3. **Storage Interface** (`/server/storage.ts`): Abstracted data access layer
4. **Development Server**: Vite integration for hot reloading

### Shared Components
1. **Database Schema** (`/shared/schema.ts`): Type-safe database definitions
2. **Type Definitions**: Shared TypeScript interfaces between client and server

## Data Flow

### Brief Generation Flow
1. User can optionally select project type from dropdown (mobile, web, desktop, etc.)
2. User clicks "Generate Challenge" button on home page
3. Client-side generator creates random project brief from predefined data sets
4. Project data includes: name, area, type, audience, problem, objective, features, duration, context, constraints, deliverables, inspiration
5. Generated brief displays in detailed card format with enhanced information

### Enhanced Briefing Content
- **Context**: Market background and situational information
- **Constraints**: Technical and business limitations
- **Deliverables**: Expected outputs and documentation
- **Inspiration**: Reference applications and design systems

### Save and Load Functionality
1. User can save generated briefings to memory storage
2. Saved briefings appear in "Briefings Salvos" section
3. Users can view, load, or delete saved briefings
4. Saved briefings include creation timestamp

### Copy Functionality
1. User clicks "Copy Briefing" button
2. Application formats comprehensive brief as structured text with all sections
3. Uses browser Clipboard API to copy formatted content
4. Toast notification confirms successful copy operation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm** & **drizzle-zod**: Type-safe database operations and validation
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React routing
- **express**: Node.js web framework

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Combined Deployment**: Single deployment artifact with both client and server

### Environment Configuration
- **Development**: Uses tsx for server and Vite dev server for client
- **Production**: Serves static files from Express with built client assets
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL

### Key Features
- **Dark Mode**: Default dark theme with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **TypeScript**: Full type safety across client, server, and shared code
- **Replit Integration**: Configured for Replit development environment

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and a focus on developer experience and user interface quality.