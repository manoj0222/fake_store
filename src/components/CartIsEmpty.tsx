import React, { memo } from "react";

/**
 * Props for the CartIsEmpty component.
 */
interface CartIsEmptyProps {
  message: string;
}

/**
 * CartIsEmpty Component
 *
 * This component displays a message indicating that the cart is empty.
 * It is memoized using React.memo to prevent unnecessary re-renders
 * when the props do not change.
 *
 * @param {CartIsEmptyProps} props - The props object containing the message.
 * @returns {JSX.Element} The rendered component.
 */
const CartIsEmpty: React.FC<CartIsEmptyProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default memo(CartIsEmpty);
