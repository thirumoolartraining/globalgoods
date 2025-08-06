# RS Enterprises - Premium Cashew E-commerce Platform

## Overview

RS Enterprises is a premium e-commerce website for a high-quality cashew manufacturer serving both domestic and international markets. The platform combines luxurious aesthetics with robust functionality, featuring a modern React frontend, Express.js backend, and PostgreSQL database. The design emphasizes sophistication through elegant typography, dark earth-tone color palette, and high-quality product presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for cart management and TanStack Query for server state
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom design system variables matching luxury brand aesthetics
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture  
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Data Validation**: Zod schemas for runtime type checking and API validation
- **Storage**: In-memory storage with interface pattern for easy database migration
- **Middleware**: Custom logging, error handling, and request parsing

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schemas between frontend and backend using Drizzle-Zod
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting

### Authentication and Authorization
- **Current State**: No authentication system implemented (business website focused)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (infrastructure ready)
- **Architecture**: Prepared for user authentication with database schemas defined

### API Structure
- **Products API**: CRUD operations for product catalog with category filtering
- **Orders API**: Order creation and retrieval with full customer information
- **Inquiries API**: Contact and export inquiry form submissions
- **Error Handling**: Centralized error middleware with structured JSON responses
- **Validation**: Zod schema validation for all API endpoints

### Design System
- **Typography**: Playfair Display (serif) for headings, Inter for body text
- **Color Palette**: Midnight Green (#1C2B2D), Warm Ivory (#F8F4EE), Muted Gold (#C2B280)
- **Components**: Consistent spacing, shadows, and border radius throughout
- **Responsive**: Mobile-first design with breakpoint-based layouts

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form for form management
- **Routing**: Wouter for lightweight client-side navigation
- **State Management**: TanStack React Query for server state caching and synchronization

### UI and Styling Dependencies
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS for utility-first CSS framework
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority (CVA) for component variant management

### Backend Dependencies
- **Server Framework**: Express.js for REST API development
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **Validation**: Zod for runtime type checking and schema validation
- **Session Storage**: connect-pg-simple for PostgreSQL session management

### Development Tools
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: tsx for TypeScript execution, Replit-specific development plugins

### Database and Storage
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migration Tool**: Drizzle Kit for schema management and migrations
- **Local Storage**: Browser localStorage for cart persistence

### Form and Data Handling
- **Form Management**: React Hook Form with Hookform Resolvers for Zod integration
- **Date Handling**: date-fns for date manipulation and formatting
- **Utilities**: clsx and tailwind-merge for conditional className management

The architecture supports a seamless transition from development to production with a focus on type safety, performance, and maintainability. The modular design allows for easy scaling and feature additions as the business grows.