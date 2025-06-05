import React from 'react';
import { useJokeData } from '../hooks/useJoke';
import JokeItem from './JokeItem';

interface JokeDisplayProps {
  jokeId: string;
}

/**
 * 完全に宣言的なジョーク表示コンポーネント
 * データフェッチは内部で自動的に処理され、Suspenseによって非同期処理も透明化される
 */
export const JokeDisplay: React.FC<JokeDisplayProps> = ({ jokeId }) => {
  // SWR + Suspenseによって、この行でデータは必ず取得される
  const joke = useJokeData(jokeId);

  return (
    <div className="results-container">
      <h2>Joke Found!</h2>
      <p>Joke ID: {jokeId}</p>
      
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
};

export default JokeDisplay;
