import Cart from "../Page/Cart";
import CartType from "./CartType";

interface CartState {
    allCartProducts: CartType[];
    cartproducts: CartType[];
    isLoading: boolean;
    error: string | null;
    total: number;
  }

export default CartState;