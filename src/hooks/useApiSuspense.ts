import { use, useMemo } from 'react';
import type { Joke, SearchParams } from '../types';
import { ApiService } from '../services/api';

// Promise cache for avoiding duplicate requests
const promiseCache = new Map<string, Promise<Joke>>();
const errorCache = new Map<string, Error>();

// Promiseを作成する関数
function createJokePromise(params: SearchParams): Promise<Joke> {
  // Create cache key
  const cacheKey = `joke:${params.id}`;
  
  // Check if we have a cached error for this request
  if (errorCache.has(cacheKey)) {
    console.log('❌ Throwing cached error for:', cacheKey);
    throw errorCache.get(cacheKey);
  }
  
  // Return cached promise if exists
  if (promiseCache.has(cacheKey)) {
    console.log('📦 Using cached promise for:', cacheKey);
    return promiseCache.get(cacheKey)!;
  }
  
  console.log('🆕 Creating new promise for:', cacheKey);
  
  const promise = ApiService.getJokeById(params.id)
    .then((result) => {
      console.log('✅ Promise resolved for:', cacheKey);
      return result;
    })
    .catch((error) => {
      console.log('❌ Promise rejected for:', cacheKey, error);
      // Remove from promise cache but keep error cache
      promiseCache.delete(cacheKey);
      // Cache the error to prevent infinite retries
      errorCache.set(cacheKey, error);
      throw error;
    });
  
  // Cache the promise
  promiseCache.set(cacheKey, promise);
  
  return promise;
}

// エラーキャッシュをクリアする関数
export function clearErrorCache(jokeId?: string) {
  if (jokeId) {
    const cacheKey = `joke:${jokeId}`;
    errorCache.delete(cacheKey);
    promiseCache.delete(cacheKey);
  } else {
    errorCache.clear();
    promiseCache.clear();
  }
}

// Suspense用のデータフェッチフック
export function useApiSuspense(params: SearchParams): Joke {
  // PromiseをuseMemoでキャッシュして無限ループを防ぐ
  const promise = useMemo(() => {
    return createJokePromise(params);
  }, [params.id]);
  
  // React 19のuse()フックでPromiseを処理
  return use(promise);
}
