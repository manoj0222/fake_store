import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';
import ProductType from '../../../interfaces/ProductType';

describe('Search component', () => {
  // Mock props
  const mockOnSearch = jest.fn();
  const mockHandleCategory = jest.fn();
  const mockProducts = [] as ProductType[];
  const mockCategories = ['Category1', 'Category2'];

  // Test case: Renders without crashing
  it('renders without crashing', () => {
    render(
      <Search
        onSearch={mockOnSearch}
        products={mockProducts}
        categories={mockCategories}
        handleCategory={mockHandleCategory}
      />
    );
  });

  // Test case: Updates search content on user input
  it('updates search content on user input', () => {
    const { getByPlaceholderText } = render(
      <Search
        onSearch={mockOnSearch}
        products={mockProducts}
        categories={mockCategories}
        handleCategory={mockHandleCategory}
      />
    );

    const searchInput = getByPlaceholderText('Search by name or description') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Test search' } });

    expect(searchInput.value).toBe('Test search');
  });

  // Test case: Calls onSearch callback with correct argument on input change
  it('calls onSearch callback with correct argument on input change', () => {
    const { getByPlaceholderText } = render(
      <Search
        onSearch={mockOnSearch}
        products={mockProducts}
        categories={mockCategories}
        handleCategory={mockHandleCategory}
      />
    );

    const searchInput = getByPlaceholderText('Search by name or description');
    fireEvent.change(searchInput, { target: { value: 'Test search' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Test search');
  });

  // Test case: Calls handleCategory callback with correct argument on category change
  it('calls handleCategory callback with correct argument on category change', () => {
    const { getByTestId } = render(
      <Search
        onSearch={mockOnSearch}
        products={mockProducts}
        categories={mockCategories}
        handleCategory={mockHandleCategory}
      />
    );

    const categorySelect = getByTestId('category-select'); // Ensure to add data-testid="category-select" to your select element
    fireEvent.change(categorySelect, { target: { value: 'Category1' } });

    expect(mockHandleCategory).toHaveBeenCalledWith('Category1');
  });
});
