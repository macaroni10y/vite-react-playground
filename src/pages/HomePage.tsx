import React from 'react';
import { useNavigate } from 'react-router';
import SearchForm from '../components/SearchForm';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (jokeId: string) => {
    // Navigate to results page with joke ID
    navigate(`/results-suspense?id=${jokeId}`);
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
