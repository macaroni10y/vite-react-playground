import { Suspense } from 'react';
import { useSearchParams } from 'react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import JokeDisplay from '../components/JokeDisplay';
import JokeSWRErrorFallback from '../components/JokeSWRErrorFallback';

/**
 * 完全に宣言的なジョーク結果ページ
 * - データフェッチロジックは JokeDisplay コンポーネントに委譲
 * - エラーハンドリングは ErrorBoundary + JokeSWRErrorFallback に委譲
 * - ローディング状態は Suspense に委譲
 */
export function ResultsPageSuspense() {
  const [searchParams] = useSearchParams();
  const jokeId = searchParams.get('id');

  return (
    <div className="results-page">
      <ErrorBoundary fallback={JokeSWRErrorFallback}>
        <Suspense 
          fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Looking for that joke...</p>
            </div>
          }
        >
          {jokeId ? (
            <JokeDisplay jokeId={jokeId} />
          ) : (
            <div className="no-results">
              <p>Joke ID が見つかりません</p>
              <a href="/" className="home-button">
                Go Home
              </a>
            </div>
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
