import { combineReducers } from "redux";
import productReducer from "../Page/features/product/productSlice.ts"; // Remove file extension
import cartReducer from "../Page/features/cart/cartSlice.ts";
import feedbackSlice from "../Page/features/feeback/feedbackSlice.ts";

const rootReducers = combineReducers({
      product:productReducer,
      cart:cartReducer,
      feedback:feedbackSlice,
})



export default rootReducers;