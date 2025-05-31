// Joke API response types
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
}
