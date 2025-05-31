import React from 'react';
import type { SearchResult } from '../types';

interface ResultItemProps {
  result: SearchResult;
}

export const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  return (
    <div className="result-item">
      <div className="result-header">
        <h3 className="result-title">{result.name}</h3>
        <span className="result-id">ID: {result.id}</span>
      </div>
      
      {result.description && (
        <p className="result-description">{result.description}</p>
      )}
      
      <div className="result-metadata">
        <span className="result-date">
          Created: {new Date(result.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {/* Display additional properties if they exist */}
      {Object.entries(result)
        .filter(([key]) => !['id', 'name', 'description', 'createdAt'].includes(key))
        .map(([key, value]) => (
          <div key={key} className="result-extra">
            <span className="extra-key">{key}:</span>
            <span className="extra-value">{String(value)}</span>
          </div>
        ))}
    </div>
  );
};
