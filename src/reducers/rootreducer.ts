import { combineReducers } from "redux";
import productReducer from "../Page/features/product/productSlice"; // Remove file extension
import cartReducer from "../Page/features/cart/cartSlice";
import feedbackSlice from "../Page/features/feeback/feedbackSlice";

const rootReducers = combineReducers({
      product:productReducer,
      cart:cartReducer,
      feedback:feedbackSlice,
})



export default rootReducers;