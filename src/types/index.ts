// API response types
export interface SearchResult {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  [key: string]: any; // Allow additional properties
}

export interface ApiResponse {
  results: SearchResult[];
  total?: number;
  page?: number;
}

// Search types
export type SearchType = 'id' | 'name';

export interface SearchParams {
  type: SearchType;
  value: string;
}

// API error type
export interface ApiError {
  message: string;
  status?: number;
}
