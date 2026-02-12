# 📱 Mobile Store SPA

A single-page application for browsing and managing mobile phone products. Built with React, TypeScript, and following Clean Architecture principles.

## 🚀 Features

- Product list with search by brand and model
- View detailed product specifications
- Add products to cart with variant selection (color, storage)

## 🛠️ Tech Stack

- **Core:** React 19 • TypeScript 5.9 • Vite 7
- **State & Data:** React Query (TanStack Query) • Zustand
- **UI:** TailwindCSS 4 • React Router 7
- **Testing:** Vitest • Testing Library • Cypress
- **Code Quality:** ESLint 9 • Prettier • Husky + lint-staged

## ⚡ Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)

### Installation & Running

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd spa-mobile-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment** (optional)

   The project uses a default API URL. To override it, create a `.env` file:

   ```env
   VITE_API_URL=https://itx-frontend-test.onrender.com
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
npm start                 # Start development server

# Build & Preview
npm run build            # Create production build
npm run preview          # Preview production build locally

# Testing
npm run test             # Run unit tests in watch mode
npm run e2e              # Open Cypress for E2E tests
npm run e2e:ci           # Run E2E tests in headless mode

# Code Quality
npm run lint             # Lint code
npm run format           # Format code
```

## 📁 Architecture & Project Structure

This project follows **Clean Architecture** principles with clear separation of concerns:

### Layers

- **Domain Layer** (`src/domain/`)
  - Business entities, repository interfaces, and business rules
  - Cart and Product domain models with type-safe contracts

- **Infrastructure Layer** (`src/infrastructure/`)
  - Concrete implementations of domain repository contracts
  - API clients, DTOs, and adapters for data transformation
  - Handles external service communication (REST API)

- **Presentation Layer** (`src/presentation/`)
  - React components organized by feature (product pages, shared components)
  - Responsive design with TailwindCSS

- **Services Layer** (`src/services/`)
  - Bridges domain and presentation layers using React Query
  - Custom hooks for data fetching and mutations
  - Dependency injection containers for repositories

## 💡 Technical Highlights

### State Management

- **React Query** for server state (products, API data)
- **Zustand** for client state (cart, with persistence)
- **React hooks** for local component state

### Performance Optimizations

- **Lazy Loading**: Route-based code splitting with `React.lazy()` and Suspense boundaries
- **Image Loading**: Custom `ImageLoader` component with skeleton states to prevent Cumulative Layout Shift (CLS)
- **Caching**: React Query with 1-hour stale time and localStorage persistence

### Testing

- **Unit Tests (Vitest)**: Component testing, repository adapters, and state management
- **E2E Tests (Cypress)**: Product search/cart flows with page object pattern
