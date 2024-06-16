// src/components/CartIsEmpty.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react'; // Import act from '@testing-library/react'
import CartIsEmpty from './CartIsEmpty';

test('renders CartIsEmpty component with message prop', () => {
  const message = 'Cart is currently empty';

  act(() => { // Wrap rendering in act to comply with React's testing recommendations
    render(<CartIsEmpty message={message} />);
  });

  const textElement = screen.getByText(message);
  expect(textElement).toBeInTheDocument();
});
