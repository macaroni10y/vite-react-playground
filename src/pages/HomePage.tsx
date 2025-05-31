import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { SearchForm } from '../components/SearchForm';
import type { SearchParams } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [useSuspense, setUseSuspense] = useState(false);

  const handleSearch = (params: SearchParams) => {
    // Navigate to results page with search parameters
    const searchParams = new URLSearchParams({
      type: params.type,
      query: params.value,
    });
    
    const basePath = useSuspense ? '/results-suspense' : '/results';
    navigate(`${basePath}?${searchParams.toString()}`);
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Search Application</h1>
        <p>Search for items using ID or Name</p>
        
        <div className="implementation-toggle">
          <label>
            <input
              type="checkbox"
              checked={useSuspense}
              onChange={(e) => setUseSuspense(e.target.checked)}
            />
            Use React 19 Suspense Implementation
          </label>
        </div>
      </header>
      
      <main className="page-content">
        <SearchForm onSearch={handleSearch} />
      </main>
    </div>
  );
};
