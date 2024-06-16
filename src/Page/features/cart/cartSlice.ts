import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../reducers/store";
import { toast } from "react-toastify";
import CartType from "../../../interfaces/CartType";
import CartState from "../../../interfaces/CartState";

// Initial state for the cart slice
export const initialState: CartState = {
  cartproducts: [],
  isLoading: false,
  allCartProducts: [],
  error: null,
  total: 0,
};

// Helper function to calculate total price based on cart products
const calculateTotal = (cartproducts: CartType[]) => {
  return cartproducts.reduce((total, product) => total + product.price * product.quantity, 0);
};

// Slice for managing cart state and actions
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer to handle increasing quantity
    increase: (state) => {
      toast.info("Qty increased");
    },
    // Reducer to handle decreasing quantity
    decrease: (state) => {
      toast.warn("Qty decreased");
    },
  },
  // Extra reducers for handling asynchronous actions with createAsyncThunk
  extraReducers(builder) {
    builder
      // Fetch all cart products pending action
      .addCase(fetchAllCartProducts.pending, (state) => {
        state.isLoading = true;
      })
      // Fetch all cart products fulfilled action
      .addCase(fetchAllCartProducts.fulfilled, (state, action: PayloadAction<CartType[]>) => {
        state.isLoading = false;
        state.allCartProducts = action.payload;
        state.cartproducts = action.payload;
        state.total = calculateTotal(state.cartproducts);
      })
      // Fetch all cart products rejected action
      .addCase(fetchAllCartProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Error finding product';
      })
      // Find product by ID pending action
      .addCase(findProductById.pending, (state) => {
        state.isLoading = true;
      })
      // Find product by ID fulfilled action
      .addCase(findProductById.fulfilled, (state, action: PayloadAction<CartType>) => {
        state.isLoading = false;
        state.cartproducts.push(action.payload);
        state.total = calculateTotal(state.cartproducts);
      })
      // Find product by ID rejected action
      .addCase(findProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error finding product";
      })
      // Increase quantity fulfilled action
      .addCase(increaseQuantity.fulfilled, (state, action: PayloadAction<CartType>) => {
        const product = state.cartproducts.find(item => item.id === action.payload.id);
        if (product) {
          product.quantity = action.payload.quantity;
          state.total = calculateTotal(state.cartproducts);
        }
      })
      // Decrease quantity fulfilled action
      .addCase(decreaseQuantity.fulfilled, (state, action: PayloadAction<CartType>) => {
        const product = state.cartproducts.find(item => item.id === action.payload.id);
        if (product) {
          product.quantity = action.payload.quantity;
          state.total = calculateTotal(state.cartproducts);
        }
      })
      // Remove item fulfilled action
      .addCase(removeItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.cartproducts = state.cartproducts.filter(item => item.id !== action.payload);
        state.total = calculateTotal(state.cartproducts);
      });
  },
});

// Async thunk to fetch all cart products
export const fetchAllCartProducts = createAsyncThunk(
  "cart/fetchAllCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("Items not found in localStorage");
      }
      return JSON.parse(data) as CartType[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to find product by ID
export const findProductById = createAsyncThunk(
  "cart/findProductById",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = await localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("Items not found in localStorage");
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

// Async thunk to add product to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
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

// Async thunk to increase product quantity in cart
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("Items not found in localStorage");
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

// Async thunk to decrease product quantity in cart
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("Items not found in localStorage");
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

// Async thunk to remove product from cart
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId: number, { rejectWithValue }) => {
    try {
      const data = localStorage.getItem("cartitems");
      if (!data) {
        throw new Error("Items not found in localStorage");
      }

      const cartItems = JSON.parse(data) as CartType[];
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartitems", JSON.stringify(updatedCartItems));
      return productId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Exporting increase and decrease actions from cartSlice
export const { increase, decrease } = cartSlice.actions;

// Exporting default reducer for cartSlice
export default cartSlice.reducer;
