import type { ApiResponse } from '../types';

// Mock data for development and testing
export const mockSearchResults: ApiResponse = {
  results: [
    {
      id: '1',
      name: 'Example Item 1',
      description: 'This is a sample item for testing the search functionality.',
      createdAt: '2025-01-15T10:30:00Z',
      category: 'Electronics',
      price: '$299.99',
      status: 'Available',
    },
    {
      id: '2',
      name: 'Example Item 2',
      description: 'Another sample item with different properties.',
      createdAt: '2025-02-20T14:45:00Z',
      category: 'Books',
      author: 'John Doe',
      pages: 350,
      status: 'In Stock',
    },
    {
      id: '3',
      name: 'Example Item 3',
      description: 'A third sample item to demonstrate the list view.',
      createdAt: '2025-03-10T09:15:00Z',
      category: 'Clothing',
      size: 'Medium',
      color: 'Blue',
      material: 'Cotton',
    },
  ],
  total: 3,
  page: 1,
};

export const mockApiDelay = () => {
  return new Promise(resolve => setTimeout(resolve, 800));
};
