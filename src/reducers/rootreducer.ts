import { combineReducers } from "redux";
import productReducer from "../Page/features/product/productSlice.ts"; // Remove file extension
import cartReducer from "../Page/features/cart/cartSlice.ts";


const rootReducers = combineReducers({
      product:productReducer,
      cart:cartReducer
})



export default rootReducers;