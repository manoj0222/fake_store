import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FeebackType from "../../../interfaces/FeebackType";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: FeebackType = {
  description: "",
  experience: 0,
};

const feebackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(saveFeedBack.fulfilled, (state, action) => {
        toast.success("Thanks for the Feedback");
      })
  },
});

export const saveFeedBack = createAsyncThunk(
  "save/feedback",
  async (feeback:FeebackType, { rejectWithValue }) => {
    try {
      await localStorage.setItem("feedback", JSON.stringify(feeback));
      return feeback;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export default feebackSlice.reducer;