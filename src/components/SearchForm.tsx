import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (jokeId: string) => void;
  loading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading = false }) => {
  const [jokeId, setJokeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jokeId.trim()) return;
    
    onSearch(jokeId.trim());
  };

  return (
    <div className="search-form">
      <div className="search-section">
        <h3>Search for a Joke by ID</h3>
        <form onSubmit={handleSubmit}>
          <div className="search-input-group">
            <input
              type="number"
              value={jokeId}
              onChange={(e) => setJokeId(e.target.value)}
              placeholder="Enter joke ID (e.g., 1, 2, 3...)"
              disabled={loading}
              min="1"
              required
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading || !jokeId.trim()}
            >
              {loading ? 'Searching...' : 'Find Joke'}
            </button>
          </div>
        </form>
        <p className="search-hint">
          Enter a joke ID to find a random joke from the collection.
        </p>
      </div>
    </div>
  );
};

export { SearchForm };
export default SearchForm;
