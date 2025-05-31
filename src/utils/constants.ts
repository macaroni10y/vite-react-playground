// API configuration
export const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api' // Development API (or mock will be used instead)
  : 'https://example.com/api';   // Production API

// Development configuration
export const USE_MOCK_DATA = import.meta.env.DEV; // Use mock data in development

// Search types
export const SEARCH_TYPES = {
  ID: 'id' as const,
  NAME: 'name' as const,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  RESULTS: '/results',
} as const;
