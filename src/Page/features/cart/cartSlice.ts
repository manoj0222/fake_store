import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartType from "../../../interfaces/CartType";
import axios from "axios";
import { act } from "react";
import ProductType from "../../../interfaces/ProductType";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../reducers/store";

interface CartState {
  allCartProducts: CartType[];
  cartproducts: CartType[];
  isLoading: boolean;
  error: Error;
}

const initialState: CartState = {
  cartproducts: [],
  isLoading: false,
  allCartProducts: [],
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCartProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCartProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCartProducts = action.payload;
        state.cartproducts = action.payload;
      })
      .addCase(fetchAllCartProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      })
      .addCase(findProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        findProductById.fulfilled,
        (state, action: PayloadAction<CartType>) => {
          state.isLoading = false;
          state.cartproducts.push(action.payload);
        }
      )
      .addCase(findProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      });
  },
});

export const fetchAllCartProducts = createAsyncThunk(
  "/cart/products",
  async (_, { rejectWithValue }) => {
    try {
      const data = await localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("items not found in localStorage");
      }
      return JSON.parse(data) as CartType[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const findProductById = createAsyncThunk(
  "/cart/productId",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = await localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("items not found in localStorage");
      }
      const products = JSON.parse(data) as CartType[];
      const product = products.find((product) => product.id === productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "/cart/product",
  async (product: CartType, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const existingProductIndex = state.cart.allCartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity
        const existingProduct =
          state.cart.allCartProducts[existingProductIndex];
        const updatedProduct: CartType = {
          ...existingProduct,
          quantity: existingProduct.quantity + product.quantity,
        };
        const updatedCartItems = [...state.cart.allCartProducts];
        updatedCartItems[existingProductIndex] = updatedProduct;
        localStorage.setItem("cartitems", JSON.stringify(updatedCartItems));
        return updatedProduct;
      } else {
        // If the product is not in the cart, add it
        const data = await localStorage.getItem("cartitems");
        let cartItems = data ? (JSON.parse(data) as CartType[]) : [];
        const existingCartItemIndex = cartItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingCartItemIndex !== -1) {
          // If the product already exists in local storage, update its quantity
          cartItems[existingCartItemIndex].quantity += product.quantity;
        } else {
          // If the product is not in local storage, add it
          cartItems.push(product);
        }
        localStorage.setItem("cartitems", JSON.stringify(cartItems));
        return product;
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("items not found in localStorage");
      }

      const cartItems = JSON.parse(data) as CartType[];
      const productIndex = cartItems.findIndex((item) => item.id === productId);

      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }

      cartItems[productIndex].quantity += 1;
      localStorage.setItem("cartitems", JSON.stringify(cartItems));
      return cartItems[productIndex];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("items not found in localStorage");
      }

      const cartItems = JSON.parse(data) as CartType[];
      const productIndex = cartItems.findIndex((item) => item.id === productId);

      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }

      if (cartItems[productIndex].quantity > 1) {
        cartItems[productIndex].quantity -= 1;
        localStorage.setItem("cartitems", JSON.stringify(cartItems));
        return cartItems[productIndex];
      } else {
        throw new Error("Quantity cannot be less than 1");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export default CartSlice.reducer;
