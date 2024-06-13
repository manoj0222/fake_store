import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import ProductType from "../../../interfaces/ProductType";
import { RootState } from "../../../reducers/store";
import { toast } from "react-toastify";

interface ProductsState {
  allProducts: ProductType[];
  products: ProductType[];
  isLoading: boolean;
  error: String;
  page: number;
  itemsPerPage: number;
  isSelectedProduct: ProductType | null;
  filteredProducts: ProductType[];
  searchText: string | null;
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  products: [],
  isLoading: false,
  error: "",
  page: 1,
  itemsPerPage: 5,
  isSelectedProduct: null,
  filteredProducts: [],
  searchText: null,
  selectedCategory: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      const start = (state.page - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      state.products = state.filteredProducts.slice(start, end);
    },
    onsucess: (state) => {
      toast.success("Added Cart");
    },
    filterProducts: (state, action: PayloadAction<{searchText: string; category: string }>) => {
      state.searchText = action.payload.searchText;
      state.selectedCategory=action.payload.category;
      state.page = 1;
      if(state.searchText!==""&&state.selectedCategory!==""){
        state.filteredProducts = state.allProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchText.toLowerCase())||product.description.toLowerCase().includes(state.searchText.toLowerCase())
        );
        state.filteredProducts = state.filteredProducts.filter((product) =>
          product.category.toLowerCase().includes(state.selectedCategory.toLowerCase())
        );
      }
      else if(state.searchText!==""&&state.selectedCategory===""){
        state.filteredProducts = state.allProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchText.toLowerCase())||product.description.toLowerCase().includes(state.searchText.toLowerCase())
        );
      }
      else if(state.selectedCategory!==""&&state.searchText ===""){
        state.filteredProducts = state.allProducts.filter((product) =>
          product.category.toLowerCase().includes(state.selectedCategory.toLowerCase())
        );
      }
      else{
        state.filteredProducts = state.allProducts;
      }

      const start = (state.page - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      state.products = state.filteredProducts.slice(start, end);
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
        state.filteredProducts=action.payload;
        const start = (state.page - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        state.products = state.allProducts.slice(start, end);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Resource Not Found";
      })
      .addCase(getProductById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSelectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error while fetching Product";
      });
  },
});

export const getProducts = createAsyncThunk("products/fetchAll", async () => {
  try {
    const response = await axios.get<[]>("https://fakestoreapi.com/products");
    // console.log(response)
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
});

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId: number) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching product");
    }
  }
);

export const selectProducts = (state: RootState) => state.product;

export const { setPage, onsucess,filterProducts} = productSlice.actions;

export default productSlice.reducer;
