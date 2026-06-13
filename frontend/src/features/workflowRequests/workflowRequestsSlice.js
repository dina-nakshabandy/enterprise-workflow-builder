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

export const fetchPendingApprovals = createAsyncThunk(
  "workflowRequests/fetchPendingApprovals",
  async () => {
    const response = await api.get("/workflow-requests/pending");
    return response.data;
  },
);

export const approveWorkflowRequest = createAsyncThunk(
  "workflowRequests/approveWorkflowRequest",
  async (workflowRequestId) => {
    const response = await api.post(
      `/workflow-requests/${workflowRequestId}/approve`,
      {
        comments: "Approved from UI",
      },
    );

    return response.data;
  },
);

export const rejectWorkflowRequest = createAsyncThunk(
  "workflowRequests/rejectWorkflowRequest",
  async ({ workflowRequestId, comments }) => {
    const response = await api.post(
      `/workflow-requests/${workflowRequestId}/reject`,
      {
        comments,
      },
    );

    return response.data;
  },
);

const workflowRequestsSlice = createSlice({
  name: "workflowRequests",
  initialState: {
    requests: [],
    pendingApprovals: [],
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
      })
      .addCase(fetchPendingApprovals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingApprovals = action.payload;
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workflowRequestsSlice.reducer;
