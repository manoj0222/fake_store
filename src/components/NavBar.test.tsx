// src/components/NavBar.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react'; // Import necessary functions from testing library
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing context
import NavBar from './NavBar'; // Import the NavBar component

/**
 * Test Suite: NavBar Component
 *
 * This suite contains tests to verify the rendering and styling of the NavBar component.
 */
describe('NavBar Component', () => {
    /**
     * Test Case: Renders the NavBar component
     *
     * This test verifies that the NavBar component renders correctly with all the expected elements.
     */
    test('renders the NavBar component', () => {
        // Wrap rendering in act to ensure that all updates related to rendering are processed
        act(() => {
            render(
                <Router>
                    <NavBar />
                </Router>
            );
        });

        // Check if the logo is rendered
        const logoElement = screen.getByAltText(/logo/i);
        expect(logoElement).toBeInTheDocument();

        // Check if the Fake_Store text is rendered
        const storeNameElement = screen.getByText(/Fake_Store/i);
        expect(storeNameElement).toBeInTheDocument();

        // Check if Home link is rendered
        const homeLinkElement = screen.getByText(/home/i);
        expect(homeLinkElement).toBeInTheDocument();
        expect(homeLinkElement).toHaveAttribute('href', '/products');

        // Check if Cart link is rendered
        const cartLinkElement = screen.getByText(/cart/i);
        expect(cartLinkElement).toBeInTheDocument();
        expect(cartLinkElement).toHaveAttribute('href', '/cart');

        // Assert that the avatar button (RxAvatar) is rendered
        const avatarButtonElement = screen.getByTestId("avatar-icon");
        expect(avatarButtonElement).toBeInTheDocument();
        expect(avatarButtonElement.tagName).toBe('BUTTON');
    });

    /**
     * Test Case: Has correct styles
     *
     * This test verifies that the NavBar component and its elements have the correct styles applied.
     */
    test('has correct styles', () => {
        // Render the NavBar component within a Router
        render(
            <Router>
                <NavBar />
            </Router>
        );

        // Verify the styles of the navigation element
        const navElement = screen.getByRole('navigation');
        expect(navElement).toHaveClass('flex', 'w-full', 'justify-between', 'items-center', 'h-12', 'rounded-l', 'border-2', 'shadow-slate-100', 'sticky', 'top-0', 'border-slate-200', 'px-2', 'bg-white');

        // Verify the styles of the logo element
        const logoElement = screen.getByAltText(/logo/i);
        expect(logoElement).toHaveClass('object-cover', 'h-10', 'w-10', 'sm:h-8', 'w-10');

        // Verify the styles of the store name element
        const storeNameElement = screen.getByText(/Fake_Store/i);
        expect(storeNameElement).toHaveClass('lg:text-xl', 'sm:text-xs');

        // Verify the styles of the home link element
        const homeLinkElement = screen.getByText(/home/i);
        expect(homeLinkElement).toHaveClass('text-center', 'flex', 'text-emerald-400', 'px-2', 'lg:text-xl', 'sm:text-xs');

        // Verify the styles of the cart link element
        const cartLinkElement = screen.getByText(/cart/i);
        expect(cartLinkElement).toHaveClass('text-center', 'flex', 'text-emerald-400', 'px-2', 'lg:text-xl', 'sm:text-xs');

        // Verify the styles of the parent element of the avatar button
        const avatarButtonParent = screen.getByRole('button').parentElement;
        expect(avatarButtonParent).toHaveClass('flex items-center text-emerald-400');
    });
});
