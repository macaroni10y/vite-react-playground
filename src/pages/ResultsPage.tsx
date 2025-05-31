import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ResultItem } from '../components/ResultItem';
import { useApi } from '../hooks/useApi';
import type { SearchParams, SearchType } from '../types';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, loading, error, search } = useApi();
  const [currentSearch, setCurrentSearch] = useState<SearchParams | null>(null);
  const [invalidParams, setInvalidParams] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type') as SearchType;
    const value = searchParams.get('query'); // 'value' から 'query' に修正

    if (type && value && (type === 'id' || type === 'name')) {
      const searchParamsObj: SearchParams = { type, value };
      setCurrentSearch(searchParamsObj);
      setInvalidParams(false);
      search(searchParamsObj).catch((error) => {
        console.error('Search failed:', error);
      });
    } else {
      // Invalid search parameters - show error instead of redirecting
      setInvalidParams(true);
      setCurrentSearch(null);
    }
  }, [searchParams, search]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (invalidParams) {
    return (
      <div className="results-page">
        <header className="page-header">
          <h1>検索結果</h1>
          <button onClick={handleBackToHome} className="back-button">
            ← 検索に戻る
          </button>
        </header>
        
        <div className="no-results">
          <h2>不正な検索パラメータです</h2>
          <p>検索タイプまたは検索クエリが指定されていません。</p>
          <button onClick={handleBackToHome} className="retry-button">
            新しい検索を行う
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-page">
        <header className="page-header">
          <h1>Search Results</h1>
          <button onClick={handleBackToHome} className="back-button">
            ← Back to Search
          </button>
        </header>
        
        <div className="error-container">
          <h2>Error occurred</h2>
          <p>{error.message}</p>
          {error.status && <p>Status Code: {error.status}</p>}
          <button onClick={handleBackToHome} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <header className="page-header">
        <h1>Search Results</h1>
        <button onClick={handleBackToHome} className="back-button">
          ← Back to Search
        </button>
      </header>

      {currentSearch && (
        <div className="search-info">
          <p>
            Searching for <strong>{currentSearch.value}</strong> by{' '}
            <strong>{currentSearch.type}</strong>
          </p>
        </div>
      )}

      <main className="page-content">
        {data && data.results.length > 0 ? (
          <div className="results-container">
            <div className="results-header">
              <p>{data.results.length} result(s) found</p>
            </div>
            
            <div className="results-list">
              {data.results.map((result) => (
                <ResultItem key={result.id} result={result} />
              ))}
            </div>
          </div>
        ) : data ? (
          <div className="no-results">
            <h2>検索結果が見つかりませんでした</h2>
            <p>
              「<strong>{currentSearch?.value}</strong>」で{currentSearch?.type === 'id' ? 'ID' : '名前'}検索した結果、該当するアイテムが見つかりませんでした。
            </p>
            <p>別の検索条件をお試しください。</p>
            <button onClick={handleBackToHome} className="retry-button">
              新しい検索を行う
            </button>
          </div>
        ) : null}
      </main>
    </div>
  );
};
