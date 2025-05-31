import React, { useState } from 'react';
import type { SearchType, SearchParams } from '../types';
import { SEARCH_TYPES } from '../utils/constants';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading = false }) => {
  const [idValue, setIdValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const handleSubmit = (type: SearchType, value: string) => {
    if (!value.trim()) return;
    
    onSearch({ type, value: value.trim() });
  };

  return (
    <div className="search-form">
      <div className="search-section">
        <h3>Search by ID</h3>
        <div className="search-input-group">
          <input
            type="text"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            placeholder="Enter ID to search..."
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(SEARCH_TYPES.ID, idValue);
              }
            }}
          />
          <button
            onClick={() => handleSubmit(SEARCH_TYPES.ID, idValue)}
            disabled={!idValue.trim() || loading}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search by ID'}
          </button>
        </div>
      </div>

      <div className="search-section">
        <h3>Search by Name</h3>
        <div className="search-input-group">
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Enter name to search..."
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(SEARCH_TYPES.NAME, nameValue);
              }
            }}
          />
          <button
            onClick={() => handleSubmit(SEARCH_TYPES.NAME, nameValue)}
            disabled={!nameValue.trim() || loading}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search by Name'}
          </button>
        </div>
      </div>
    </div>
  );
};
