import React from 'react';
import type { Joke } from '../types';

interface JokeItemProps {
  joke: Joke;
}

const JokeItem: React.FC<JokeItemProps> = ({ joke }) => {
  return (
    <div className="joke-item">
      <div className="joke-header">
        <span className="joke-id">Joke #{joke.id}</span>
        <span className="joke-type">{joke.type}</span>
      </div>
      
      <div className="joke-content">
        <p className="joke-setup">{joke.setup}</p>
        <p className="joke-punchline">{joke.punchline}</p>
      </div>
    </div>
  );
};

export { JokeItem };
export default JokeItem;
