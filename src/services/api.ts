import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Joke, ApiError } from '../types';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get joke by ID
 */
export const getJokeById = async (id: string): Promise<Joke> => {
  try {
    const response: AxiosResponse<Joke> = await apiClient.get(`/jokes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Joke not found',
        status: error.response?.status,
      };
      throw apiError;
    }
    
    throw new Error('Unknown error occurred');
  }
};

/**
 * Get all jokes (maximum 10)
 */
export const getAllJokes = async (): Promise<Joke[]> => {
  try {
    const response: AxiosResponse<Joke[]> = await apiClient.get('/jokes/ten');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Failed to fetch jokes',
        status: error.response?.status,
      };
      throw apiError;
    }
    
    throw new Error('Unknown error occurred');
  }
};
