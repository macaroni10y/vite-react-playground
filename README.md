# Search Application

A modern React application built with Vite, TypeScript, and React Router v7 for searching and displaying data from external REST APIs.

## Features

- 🔍 **Multi-type Search**: Search by ID or Name
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- ⚡ **Fast Development**: Powered by Vite for instant hot module replacement
- 🔄 **Client-side Routing**: Smooth navigation with React Router v7
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🛠️ **TypeScript**: Full type safety and IntelliSense support
- 🧪 **Mock Data**: Built-in mock data for development and testing

## Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript 5.8.3
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS with modern features

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchForm.tsx   # Search form with ID and Name inputs
│   └── ResultItem.tsx   # Individual search result display
├── pages/               # Page components
│   ├── HomePage.tsx     # Main search page
│   └── ResultsPage.tsx  # Search results display
├── services/            # API communication
│   └── api.ts           # API service with mock data support
├── hooks/               # Custom React hooks
│   └── useApi.ts        # API state management hook
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared types and interfaces
└── utils/               # Utility functions and constants
    ├── constants.ts     # App constants and configuration
    └── mockData.ts      # Mock data for development
```

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Configuration

The application is configured to work with external REST APIs. 

### API Endpoints

- **Search**: `GET /search?type={id|name}&value={searchValue}`

### Mock Data

In development mode, the application uses mock data to simulate API responses. This allows you to test the functionality without a real backend.

To disable mock data and use real API calls, update the `USE_MOCK_DATA` constant in `src/utils/constants.ts`.

### Production API

For production, update the `API_BASE_URL` in `src/utils/constants.ts` to point to your actual API endpoint.

## Usage

1. **Home Page**: Enter a search term in either the ID or Name search field
2. **Search**: Click the respective search button to execute the search
3. **Results**: View results on the dedicated results page
4. **Navigation**: Use the "Back to Search" button to return to the home page

## Development

The application includes several development features:

- **Hot Module Replacement**: Changes reflect instantly during development
- **TypeScript**: Full type checking and IntelliSense support
- **ESLint**: Code quality and consistency checks
- **Mock API**: Built-in mock data for testing without backend

## Deployment

This is a Single Page Application (SPA) designed for static hosting services like:

- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.
