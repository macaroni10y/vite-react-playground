import useSWR from 'swr';
import type { Joke } from '../types';
import { ApiService } from '../services/api';

/**
 * ジョーク取得用のSWRフック（Suspenseサポート）
 * @param jokeId - 取得するジョークのID
 * @returns SWRの戻り値（data, error, mutate など）
 */
export function useJoke(jokeId: string | null) {
  return useSWR(
    jokeId ? `joke:${jokeId}` : null,
    () => ApiService.getJokeById(jokeId!),
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // エラーの自動リトライを無効化（ErrorBoundaryで処理）
      shouldRetryOnError: false,
    }
  );
}

/**
 * ジョーク取得用のSWRフック（非Suspense版）
 * ローディング状態やエラー状態を明示的に処理したい場合に使用
 */
export function useJokeWithStates(jokeId: string | null) {
  return useSWR(
    jokeId ? `joke:${jokeId}` : null,
    () => ApiService.getJokeById(jokeId!),
    {
      suspense: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
}

/**
 * 型安全なジョークデータ取得
 * Suspenseモードでは data は必ず存在することが保証される
 */
export function useJokeData(jokeId: string | null): Joke {
  const { data } = useJoke(jokeId);
  // Suspenseモードでは data は必ず存在
  return data!;
}
