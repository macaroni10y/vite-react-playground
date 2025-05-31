import { use, useMemo } from 'react';
import type { SearchResult, SearchParams } from '../types';
import { ApiService } from '../services/api';

// Promise cache for avoiding duplicate requests
const promiseCache = new Map<string, Promise<SearchResult[]>>();

// Promiseを作成する関数
function createSearchPromise(params: SearchParams): Promise<SearchResult[]> {
  // Create cache key
  const cacheKey = `${params.type}:${params.value}`;
  
  // Return cached promise if exists
  if (promiseCache.has(cacheKey)) {
    console.log('📦 Using cached promise for:', cacheKey);
    return promiseCache.get(cacheKey)!;
  }
  
  console.log('🆕 Creating new promise for:', cacheKey);
  
  let promise: Promise<SearchResult[]>;
  
  if (params.type === 'id' && params.value) {
    promise = ApiService.getById(params.value).then(response => response.results);
  } else if (params.type === 'name' && params.value) {
    promise = ApiService.search(params).then(response => response.results);
  } else {
    promise = Promise.resolve([]);
  }
  
  // Cache the promise
  promiseCache.set(cacheKey, promise);
  
  // Remove from cache on error to allow retry
  promise.catch(() => {
    promiseCache.delete(cacheKey);
  });
  
  return promise;
}

// Suspense用のデータフェッチフック
export function useApiSuspense(params: SearchParams): SearchResult[] {
  // PromiseをuseMemoでキャッシュして無限ループを防ぐ
  const promise = useMemo(() => {
    return createSearchPromise(params);
  }, [params.type, params.value]);
  
  // React 19のuse()フックでPromiseを処理
  return use(promise);
}
