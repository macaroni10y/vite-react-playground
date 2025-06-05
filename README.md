# Joke Search Application

A modern React application built with Vite, TypeScript, and SWR for searching and displaying jokes from external REST APIs. This application demonstrates advanced React patterns including Suspense, Error Boundaries, and declarative data fetching.

## Features

- 😂 **Joke Search**: Search jokes by ID
- 🔄 **SWR Integration**: Efficient data fetching with caching and revalidation
- ⚡ **React Suspense**: Seamless loading states with declarative components
- 🛡️ **Error Boundaries**: Graceful error handling and recovery
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- ⚡ **Fast Development**: Powered by Vite for instant hot module replacement
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🛠️ **TypeScript**: Full type safety and IntelliSense support

## Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript 5.8.3
- **Data Fetching**: SWR 2.3.3 (with Suspense support)
- **HTTP Client**: Axios 1.9.0
- **Routing**: React Router 7.6.1
- **Styling**: CSS with modern features

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx    # Error boundary for graceful error handling
│   ├── JokeDisplay.tsx      # Main joke display component (Suspense-ready)
│   ├── JokeItem.tsx         # Individual joke item component
│   ├── JokeSWRErrorFallback.tsx # SWR-specific error fallback component
│   └── SearchForm.tsx       # Joke search form
├── pages/               # Page components
│   ├── HomePage.tsx         # Main search page
│   └── ResultsPageSuspense.tsx # Results page with Suspense integration
├── services/            # API communication
│   └── api.ts              # Joke API service with axios
├── hooks/               # Custom React hooks
│   └── useJoke.ts          # SWR-based joke data fetching hooks
├── types/               # TypeScript type definitions
│   └── index.ts            # Joke and API error type definitions
└── utils/               # Utility functions and constants
    └── constants.ts        # API URLs and route constants
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

The application is configured to work with a joke API service running on `http://localhost:3005`.

### API Endpoints

- **Get Joke by ID**: `GET /jokes/{id}`
- **Get All Jokes**: `GET /jokes`

### Expected API Response Format

```json
{
  "id": 1,
  "type": "general",
  "setup": "Why don't scientists trust atoms?",
  "punchline": "Because they make up everything!"
}
```

### Production API

For production, update the `API_BASE_URL` in `src/utils/constants.ts` to point to your actual joke API endpoint.

## Usage

1. **Home Page**: Enter a joke ID in the search field
2. **Search**: Click the search button to find the joke
3. **Results**: View the joke with setup and punchline on the results page
4. **Error Handling**: If a joke is not found, an error message will be displayed
5. **Navigation**: Use the "Find Another Joke" button to return to the search

## Architecture Highlights

This application demonstrates several advanced React patterns:

### Suspense Integration
- Components are designed to work seamlessly with React Suspense
- Loading states are handled declaratively without manual loading spinners
- Data fetching is transparent to components

### Error Boundaries
- Graceful error handling at the component level
- Specialized error fallbacks for different error types
- Automatic error recovery options

### SWR Data Fetching
- Efficient caching and revalidation of API data
- Automatic background updates
- Optimistic UI updates

## Development

The application includes several development features:

- **Hot Module Replacement**: Changes reflect instantly during development
- **TypeScript**: Full type checking and IntelliSense support
- **ESLint**: Code quality and consistency checks with React-specific rules
- **SWR DevTools**: Built-in support for debugging data fetching
- **React Suspense**: Declarative loading states without boilerplate

### Development Server

To start the development server with a mock joke API, you'll need to run a local server on port 3005. The application expects the following endpoints:

- `GET /jokes/:id` - Get a specific joke by ID
- `GET /jokes` - Get all jokes

You can use tools like `json-server` or create a simple Express server for development testing.

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
