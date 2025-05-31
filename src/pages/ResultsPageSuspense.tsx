import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useApiSuspense, clearErrorCache } from '../hooks/useApiSuspense';
import JokeItem from '../components/JokeItem';
import { ErrorBoundary } from '../components/ErrorBoundary';
import type { SearchParams } from '../types';

// カスタムエラーコンポーネント
function JokeErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  const [searchParams] = useSearchParams();
  const jokeId = searchParams.get('id') || '';

  const handleRetry = () => {
    // エラーキャッシュをクリアしてリトライ
    clearErrorCache(jokeId);
    retry();
  };

  return (
    <div className="error-container">
      <h2>Oops! Couldn't find that joke</h2>
      <p className="error-message">
        {error.message.includes('404') || error.message.includes('not found') 
          ? `Joke with ID "${jokeId}" was not found. Try a different ID!`
          : `Failed to load joke: ${error.message}`
        }
      </p>
      
      <div className="error-actions">
        <button onClick={handleRetry} className="retry-button">
          Try Again
        </button>
        <a href="/" className="home-button">
          Search Another Joke
        </a>
      </div>
      
      <details className="error-details">
        <summary>Technical Details</summary>
        <pre>{error.stack}</pre>
      </details>
    </div>
  );
}

// Suspense内で実行されるコンポーネント
function JokeContent() {
  const [searchParams] = useSearchParams();
  
  // SearchParamsオブジェクトをuseMemoでキャッシュ
  const params: SearchParams = useMemo(() => ({
    id: searchParams.get('id') || ''
  }), [searchParams]);

  console.log('🔍 Search params:', params);

  if (!params.id) {
    return (
      <div className="no-results">
        <p>Joke ID が見つかりません</p>
      </div>
    );
  }

  // use()フックでデータを取得（Suspenseで処理される）
  const joke = useApiSuspense(params);

  return (
    <div className="results-container">
      <h2>Joke Found!</h2>
      <p>Joke ID: {params.id}</p>
      
      <div className="joke-display">
        <JokeItem joke={joke} />
      </div>
      
      <div className="actions">
        <a href="/" className="retry-button">
          Find Another Joke
        </a>
      </div>
    </div>
  );
}

// Suspenseでラップしたページコンポーネント
export function ResultsPageSuspense() {
  return (
    <div className="results-page">
      <ErrorBoundary fallback={JokeErrorFallback}>
        <Suspense 
          fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Looking for that joke...</p>
            </div>
          }
        >
          <JokeContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
