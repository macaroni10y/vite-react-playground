import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ResultsPageSuspense } from './pages/ResultsPageSuspense';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results-suspense" element={<ResultsPageSuspense />} />
      </Routes>
    </div>
  );
}

export default App;
