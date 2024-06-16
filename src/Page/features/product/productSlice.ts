import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import ProductType from "../../../interfaces/ProductType";
import { RootState } from "src/reducers/store";
import { toast } from "react-toastify";
import { sortBy, sortByRatings } from "../../../util/customSort";
import { paginateProducts } from "../../../util/productReducerHelper";

// Define the state structure for products slice
export interface ProductsState {
  allProducts: ProductType[]; // Array of all products fetched
  products: ProductType[]; // Array of products to display based on pagination and filters
  isLoading: boolean; // Loading indicator
  error: string; // Error message if any
  page: number; // Current page number for pagination
  itemsPerPage: number; // Number of items per page
  isSelectedProduct: ProductType | null; // Currently selected product
  filteredProducts: ProductType[]; // Array of products after applying filters
  searchText: string | null; // Text for searching products by name or description
  selectedCategory: string | null; // Selected category for filtering products
  unSortedProducts: ProductType[] | []; // Unsorted products as fetched from API
  sortBypriceHightoLowfilterFlag: boolean; // Flag for sorting by price high to low
  sortBypriceLowtoHighFlag: boolean; // Flag for sorting by price low to high
  sortByratingFlag: boolean; // Flag for sorting by rating
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
  unSortedProducts: [],
  sortBypriceHightoLowfilterFlag: false,
  sortBypriceLowtoHighFlag: false,
  sortByratingFlag: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.page = action.payload;
      state.products = paginateProducts(
        state.filteredProducts,
        state.page,
        state.itemsPerPage
      );
    },
    onsucess: (state) => {
      toast.success("Added Cart");
    },
    filterProducts: (
      state,
      action: PayloadAction<{ searchText: string; category: string }>
    ) => {
      state.searchText = action.payload.searchText;
      state.selectedCategory = action.payload.category;
      state.page = 1;
      if (state.searchText !== "" && state.selectedCategory !== "") {
        state.filteredProducts = state.allProducts.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(state.searchText!.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.searchText!.toLowerCase())
        );
        state.filteredProducts = state.filteredProducts.filter((product) =>
          product.category??""
            .toLowerCase()
            .includes(state.selectedCategory!.toLowerCase())
        );
      } else if (state.searchText !== "" && state.selectedCategory === "") {
        state.filteredProducts = state.allProducts.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(state.searchText!.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.searchText!.toLowerCase())
        );
      } else if (state.selectedCategory !== "" && state.searchText === "") {
        state.filteredProducts = state.allProducts.filter((product) =>
          product.category??""
            .toLowerCase()
            .includes(state.selectedCategory!.toLowerCase())
        );
      } else {
        state.filteredProducts = state.allProducts;
      }
      state.unSortedProducts = state.filteredProducts;
      state.products = paginateProducts(
        state.filteredProducts,
        state.page,
        state.itemsPerPage
      );
    },
    sortByLowToHigh: (state) => {
      state.sortBypriceLowtoHighFlag = !state.sortBypriceLowtoHighFlag;
      if (state.sortBypriceLowtoHighFlag) {
        state.filteredProducts = state.filteredProducts.sort(
          sortBy("price", -1)
        );
      } else if (state.sortByratingFlag) {
        state.filteredProducts = state.unSortedProducts.sort(
          sortByRatings("rating")
        );
      } else {

        state.filteredProducts = state.unSortedProducts;
      }
      state.products = paginateProducts(state.filteredProducts,state.page,state.itemsPerPage);
      state.sortBypriceHightoLowfilterFlag = false;
    },
    sortByHighToLow: (state) => {
      state.sortBypriceHightoLowfilterFlag =
        !state.sortBypriceHightoLowfilterFlag;
      if (state.sortBypriceHightoLowfilterFlag) {
        state.filteredProducts = state.filteredProducts.sort(
          sortBy("price", 1)
        ); // Assuming `sortBy` handles the sort order with a second parameter
      }
      else if (state.sortByratingFlag) {
        // Assuming there's a flag for sorting by rating
        state.filteredProducts = state.unSortedProducts.sort(
          sortByRatings("rating")
        );
      } else {
        console.log("Inside this");
        state.filteredProducts = state.unSortedProducts;
      }
      state.products = paginateProducts(state.filteredProducts,state.page,state.itemsPerPage);
      state.sortBypriceLowtoHighFlag = false;
    },
    sortByRating: (state) => {
      state.sortByratingFlag = !state.sortByratingFlag;
      if (state.sortByratingFlag) {
        state.filteredProducts = state.filteredProducts
          .sort(sortByRatings("rating"))
          .map((e) => e);
      } 
      else if(state.sortBypriceHightoLowfilterFlag){
        state.filteredProducts = state.filteredProducts.sort(
          sortBy("price", 1)
        );
      }
      else if(state.sortBypriceLowtoHighFlag){
        state.filteredProducts = state.filteredProducts.sort(
          sortBy("price", -1)
        );
      }
      else {
        state.filteredProducts = state.unSortedProducts;
      }
      state.products = paginateProducts(
        state.filteredProducts,
        state.page,
        state.itemsPerPage
      );
    },
    resetAll: (state) => {
      state.filteredProducts = state.unSortedProducts;
      state.products = paginateProducts(state.filteredProducts,state.page,state.itemsPerPage);
      state.sortBypriceHightoLowfilterFlag = false;
      state.sortBypriceLowtoHighFlag = false;
      state.sortByratingFlag = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
        state.unSortedProducts = action.payload;
        state.products = paginateProducts(state.allProducts,state.page, state.itemsPerPage);
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

export const {
  setPage,
  onsucess,
  filterProducts,
  sortByLowToHigh,
  sortByHighToLow,
  resetAll,
  sortByRating,
} = productSlice.actions;

export default productSlice.reducer;
