import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchMyRequests = createAsyncThunk(
  "workflowRequests/fetchMyRequests",
  async () => {
    const response = await api.get("/workflow-requests/my-requests");
    return response.data;
  },
);

export const fetchWorkflowRequestById = createAsyncThunk(
  "workflowRequests/fetchWorkflowRequestById",
  async (workflowRequestId) => {
    const response = await api.get(`/workflow-requests/${workflowRequestId}`);

    return response.data;
  },
);

const workflowRequestsSlice = createSlice({
  name: "workflowRequests",
  initialState: {
    requests: [],
    selectedRequest: null,
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
      })
      .addCase(fetchWorkflowRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkflowRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload;
      })
      .addCase(fetchWorkflowRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workflowRequestsSlice.reducer;
