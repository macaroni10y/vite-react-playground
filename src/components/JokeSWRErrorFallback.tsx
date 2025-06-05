import React from 'react';
import { useSearchParams } from 'react-router';
import { mutate } from 'swr';

interface JokeSWRErrorFallbackProps {
  error: Error;
  retry: () => void;
}

/**
 * SWR用のエラーフォールバックコンポーネント
 * SWRのmutate機能を使ったリトライを提供
 */
export const JokeSWRErrorFallback: React.FC<JokeSWRErrorFallbackProps> = ({ 
  error, 
  retry 
}) => {
  const [searchParams] = useSearchParams();
  const jokeId = searchParams.get('id') || '';

  const handleRetry = () => {
    // SWRのキャッシュをクリアして再取得
    mutate(`joke:${jokeId}`);
    // ErrorBoundaryのリトライも実行
    retry();
  };

  const isNotFound = error.message.includes('404') || 
                   error.message.includes('not found') ||
                   error.message.includes('joke not found');

  return (
    <div className="error-container">
      <h2>Oops! Couldn't find that joke</h2>
      <p className="error-message">
        {isNotFound
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
};

export default JokeSWRErrorFallback;
