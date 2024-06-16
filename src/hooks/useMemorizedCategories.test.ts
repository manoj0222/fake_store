import { renderHook } from '@testing-library/react-hooks';
import useMemorizedCategories from './useMemorizedCategories';
import ProductType from '../interfaces/ProductType';

describe('useMemorizedCategories', () => {
  it('returns unique categories from products', () => {
    const products: ProductType[] = [
      {
        id: 1,
        href: '/product/1',
        image: '/images/product1.jpg',
        title: 'Product 1',
        price: '$100',
        description: 'Description of Product 1',
        category: 'Category A',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        href: '/product/2',
        image: '/images/product2.jpg',
        title: 'Product 2',
        price: '$80',
        description: 'Description of Product 2',
        category: 'Category B',
        rating: { rate: 4.0, count: 8 },
      },
      {
        id: 3,
        href: '/product/3',
        image: '/images/product3.jpg',
        title: 'Product 3',
        price: '$120',
        description: 'Description of Product 3',
        category: 'Category A',
        rating: { rate: 4.2, count: 12 },
      },
    ];

    // Render the hook with initial products
    const { result, rerender } = renderHook(({ products }) => useMemorizedCategories(products), {
      initialProps: { products },
    });

    // Assert initial categories
    expect(result.current).toEqual(['Category A', 'Category B']);

    // Update products and rerender
    const newProducts: ProductType[] = [
      ...products,
      {
        id: 4,
        href: '/product/4',
        image: '/images/product4.jpg',
        title: 'Product 4',
        price: '$90',
        description: 'Description of Product 4',
        category: 'Category C',
        rating: { rate: 4.5, count: 11 },
      },
    ];

    rerender({ products: newProducts });

    // Assert updated categories
    expect(result.current).toEqual(['Category A', 'Category B', 'Category C']);
  });

  it('returns empty array if no products are provided', () => {
    // Render the hook with empty products array
    const { result } = renderHook(() => useMemorizedCategories([]));
    expect(result.current).toEqual([]);
  });

  it('handles null or undefined category values', () => {
    // Mock products data with null or undefined category values
    const products: ProductType[] = [
      {
        id: 1,
        href: '/product/1',
        image: '/images/product1.jpg',
        title: 'Product 1',
        price: '$100',
        description: 'Description of Product 1',
        category: null,
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        href: '/product/2',
        image: '/images/product2.jpg',
        title: 'Product 2',
        price: '$80',
        description: 'Description of Product 2',
        category: null,
        rating: { rate: 4.0, count: 8 },
      },
    ];

    // Render the hook
    const { result } = renderHook(() => useMemorizedCategories(products));
    expect(result.current).toEqual([]);
  });

  it('returns unique categories even with duplicate products', () => {
    // Mock products data with duplicate products
    const products: ProductType[] = [
      {
        id: 1,
        href: '/product/1',
        image: '/images/product1.jpg',
        title: 'Product 1',
        price: '$100',
        description: 'Description of Product 1',
        category: 'Category A',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        href: '/product/2',
        image: '/images/product2.jpg',
        title: 'Product 2',
        price: '$80',
        description: 'Description of Product 2',
        category: 'Category A',
        rating: { rate: 4.0, count: 8 },
      },
    ];

    // Render the hook
    const { result } = renderHook(() => useMemorizedCategories(products));
    expect(result.current).toEqual(['Category A']);
  });

  it('returns categories in the order they appear', () => {
    // Mock products data with mixed category orders
    const products: ProductType[] = [
      {
        id: 1,
        href: '/product/1',
        image: '/images/product1.jpg',
        title: 'Product 1',
        price: '$100',
        description: 'Description of Product 1',
        category: 'Category B',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        href: '/product/2',
        image: '/images/product2.jpg',
        title: 'Product 2',
        price: '$80',
        description: 'Description of Product 2',
        category: 'Category A',
        rating: { rate: 4.0, count: 8 },
      },
      {
        id: 3,
        href: '/product/3',
        image: '/images/product3.jpg',
        title: 'Product 3',
        price: '$120',
        description: 'Description of Product 3',
        category: 'Category B',
        rating: { rate: 4.2, count: 12 },
      },
    ];

    // Render the hook
    const { result } = renderHook(() => useMemorizedCategories(products));
    expect(result.current).toEqual(['Category B', 'Category A']);
  });
});

