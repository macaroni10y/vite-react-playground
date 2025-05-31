import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiResponse, SearchParams, ApiError } from '../types';
import { API_BASE_URL, USE_MOCK_DATA } from '../utils/constants';
import { mockSearchResults, mockApiDelay } from '../utils/mockData';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service class
export class ApiService {
  // Development mode check
  static {
    if (import.meta.env.DEV) {
      console.log('🔧 Development mode: Using mock data');
      console.log('📡 API Base URL:', API_BASE_URL);
      console.log('🎭 Mock data enabled:', USE_MOCK_DATA);
    }
  }

  /**
   * Search for items based on type and value
   */
  static async search(params: SearchParams): Promise<ApiResponse> {
    // Use mock data in development environment
    if (USE_MOCK_DATA) {
      await mockApiDelay();
      
      // Filter mock results based on search parameters
      const filteredResults = mockSearchResults.results.filter(item => {
        if (params.type === 'id') {
          return item.id.toLowerCase().includes(params.value.toLowerCase());
        } else if (params.type === 'name') {
          return item.name.toLowerCase().includes(params.value.toLowerCase());
        }
        return false;
      });

      return {
        results: filteredResults,
        total: filteredResults.length,
        page: 1,
      };
    }

    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.get('/search', {
        params: {
          type: params.type,
          value: params.value,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status,
        };
        throw apiError;
      }
      
      throw new Error('Unknown error occurred');
    }
  }

  /**
   * Get item by ID (example of additional API method)
   */
  static async getById(id: string): Promise<ApiResponse> {
    // Use mock data in development environment
    if (USE_MOCK_DATA) {
      await mockApiDelay();
      
      // Find mock result by ID
      const foundResult = mockSearchResults.results.find(item => 
        item.id.toLowerCase() === id.toLowerCase()
      );

      return {
        results: foundResult ? [foundResult] : [],
        total: foundResult ? 1 : 0,
        page: 1,
      };
    }

    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status,
        };
        throw apiError;
      }
      
      throw new Error('Unknown error occurred');
    }
  }
}

export default ApiService;
