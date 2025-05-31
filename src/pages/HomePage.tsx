import React from 'react';
import { useNavigate } from 'react-router';
import SearchForm from '../components/SearchForm';
import type { SearchParams } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (params: SearchParams) => {
    // Navigate to results page with search parameters
    const searchParams = new URLSearchParams({
      id: params.id,
    });
    
    navigate(`/results-suspense?${searchParams.toString()}`);
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Joke Finder</h1>
        <p>Find hilarious jokes by their ID</p>
      </header>
      
      <main className="page-content">
        <SearchForm onSearch={handleSearch} />
      </main>
    </div>
  );
};
