import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FeedbackType from "../../../interfaces/FeebackType"
import { toast } from "react-toastify";

// Initial state for the feedback slice
const initialState: FeedbackType = {
  description: "",
  experience: 0,
};

// Slice for managing feedback state and actions
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  // Extra reducer for handling asynchronous action with createAsyncThunk
  extraReducers(builder) {
    builder
      // Save feedback fulfilled action
      .addCase(saveFeedback.fulfilled, (state, action: PayloadAction<FeedbackType>) => {
        toast.success("Thanks for the Feedback");
        // No state change needed for feedback slice since feedback is saved to localStorage
      });
  },
});

// Async thunk to save feedback
export const saveFeedback = createAsyncThunk(
  "save/feedback",
  async (feedback: FeedbackType, { rejectWithValue }) => {
    try {
      await localStorage.setItem("feedback", JSON.stringify(feedback));
      return feedback;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Exporting default reducer for feedback slice
export default feedbackSlice.reducer;
