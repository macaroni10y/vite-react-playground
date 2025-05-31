import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useApiSuspense } from '../hooks/useApiSuspense';
import { ResultItem } from '../components/ResultItem';
import { ErrorBoundary } from '../components/ErrorBoundary';
import type { SearchParams } from '../types';

// Suspense内で実行されるコンポーネント
function ResultsContent() {
  const [searchParams] = useSearchParams();
  
  // SearchParamsオブジェクトをuseMemoでキャッシュ
  const params: SearchParams = useMemo(() => ({
    type: (searchParams.get('type') as 'id' | 'name') || 'name',
    value: searchParams.get('query') || ''
  }), [searchParams]);

  console.log('🔍 Search params:', params);

  if (!params.value) {
    return (
      <div className="no-results">
        <p>検索クエリが見つかりません</p>
      </div>
    );
  }

  // use()フックでデータを取得（Suspenseで処理される）
  const results = useApiSuspense(params);

  return (
    <div className="results-container">
      <h2>検索結果</h2>
      <p>検索タイプ: {params.type}, クエリ: "{params.value}"</p>
      
      {results.length === 0 ? (
        <div className="no-results">
          <h2>検索結果が見つかりませんでした</h2>
          <p>
            「<strong>{params.value}</strong>」で{params.type === 'id' ? 'ID' : '名前'}検索した結果、該当するアイテムが見つかりませんでした。
          </p>
          <p>別の検索条件をお試しください。</p>
          <a href="/" className="retry-button">
            新しい検索を行う
          </a>
        </div>
      ) : (
        <div className="results-list">
          {results.map((result) => (
            <ResultItem key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}

// Suspenseでラップしたページコンポーネント
export function ResultsPageSuspense() {
  return (
    <div className="results-page">
      <ErrorBoundary>
        <Suspense 
          fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>データを読み込み中...</p>
            </div>
          }
        >
          <ResultsContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
