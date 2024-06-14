import React, { ReactNode, memo } from "react";

interface CartIsEmptyProps {
    message: string;
}

const CartIsEmpty: React.FC<CartIsEmptyProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default memo(CartIsEmpty);
