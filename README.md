# Casa Rom Sales Quotation System – Frontend
*A React web application (deployed via Vercel) for product search and quotation generation*

## Overview
This frontend powers the UI for the “Casa Rom” quotation system. Built with **TypeScript/React**, it interacts with a FastAPI backend and provides:
- A searchable product catalogue (leveraging hybrid BM25 + vector similarity search via the backend)
- Quotation generation UI: users can select products, add/remove them from quotes, view pricing adjustments (transfer discounts, installment markups)
- Responsive design, clean UX, and deployment on Vercel

## Architecture & Folder Structure
- The project was bootstrapped with Create React App (TypeScript template).
- Main folders:
  - `src/` — React components, hooks, services (API integration), UI assets
  - `public/` — static assets
- `package.json` — dependencies (React, types, UI library if used)
- Deployed at: https://database-five-mu.vercel.app/

## Getting Started

### Prerequisites
- Node.js v16+ (or latest LTS)
- `npm` or `yarn`
- Access to backend API (base URL and any authentication/token details)

### Setup & Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/Jawadbro/database.git
   cd database
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
3. Configure environment variables (create `.env.local`):
   ```text
   REACT_APP_API_BASE_URL=https://your-backend-url.com/api
   ```
4. Run in development mode:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```
   The app will open at `http://localhost:3000` by default.
5. Build for production:
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```
   Deploy the contents of `build/` (e.g., automatically via Vercel).

## Key Features
- **Product Search UI**: Search bar with suggestions, filters (brand, price range) — consumes backend’s hybrid search results.
- **Quotation Workflow**: Add products to quote list, adjust quantities, view dynamic pricing that reflects backend‑computed discounts/markups.
- **Responsive & Accessible**: Mobile‑friendly layout, attention to UX details, clean state management (React hooks, context or Redux if used).
- **Deployment Ready**: Automatically deploys to Vercel on push with configured environment variables.

## Deployment & Scaling
- Hosted on Vercel (automatic CI/CD on push to main branch).
- Ensure environment variable `REACT_APP_API_BASE_URL` is set in Vercel’s project settings.
- For large product catalogues or search results: consider caching results locally, pagination/infinite scroll, and debounced search input to reduce backend load.
- Monitor performance (bundle size, network requests) and optimize (code splitting, lazy load, memoization) if UI becomes sluggish.

## Documentation & Maintenance
- Each major component (e.g., `SearchBar`, `QuoteList`) should include docstrings/comments describing props, state, and effects.
- API service files (e.g., `api.ts` or `services/searchService.ts`) should document endpoints and expected responses.
- UI library or design system (if used) should have style guidelines and consistent theming for maintainability.
- When adding new features (e.g., filtering, quote sharing, export PDF), update this README and add component‑level tests.

## Contribution & Workflow
- Use feature branches (`feature/search‑improvements`, `feature/quote‑export`).
- Write unit tests (e.g., Jest + React Testing Library) for new UI logic.
- Commit message convention: `<scope>: <short description>` (e.g., `search: add filter by brand`).
- Pull requests require code review and passing tests before merge.

## License & Confidentiality
This codebase is proprietary and shared under confidentiality. Unauthorized public sharing or disclosure is prohibited.

## Contact
For questions or issues, please contact the project lead or repository owner.
