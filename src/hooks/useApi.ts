import { useState, useCallback } from 'react';
import type { ApiResponse, SearchParams, ApiError } from '../types';
import { ApiService } from '../services/api';

interface UseApiState {
  data: ApiResponse | null;
  loading: boolean;
  error: ApiError | null;
}

export const useApi = () => {
  const [state, setState] = useState<UseApiState>({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (params: SearchParams) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await ApiService.search(params);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  const getById = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await ApiService.getById(id);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearData = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    search,
    getById,
    clearError,
    clearData,
  };
};
