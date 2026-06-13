import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchMyRequests = createAsyncThunk(
  "workflowRequests/fetchMyRequests",
  async () => {
    const response = await api.get("/workflow-requests/my-requests");
    return response.data;
  },
);

const workflowRequestsSlice = createSlice({
  name: "workflowRequests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchMyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workflowRequestsSlice.reducer;
