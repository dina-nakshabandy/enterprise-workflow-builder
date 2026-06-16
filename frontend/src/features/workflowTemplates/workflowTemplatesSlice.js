import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchWorkflowTemplates =
  createAsyncThunk(
    "workflowTemplates/fetchWorkflowTemplates",
    async () => {
      const response = await api.get(
        "/workflow-templates"
      );

      return response.data;
    }
  );

  export const fetchWorkflowTemplateById = createAsyncThunk(
  "workflowTemplates/fetchWorkTemplateById",
  async (workflowTemplateId) => {
    const response = await api.get(`/workflow-templates/${workflowTemplateId}`);

    return response.data;
  },
);

const workflowTemplatesSlice = createSlice({
  name: "workflowTemplates",

  initialState: {
    templates: [],
    selectedTemplate: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchWorkflowTemplates.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        fetchWorkflowTemplates.fulfilled,
        (state, action) => {
          state.loading = false;
          state.templates =
            action.payload;
        }
      )
      .addCase(
        fetchWorkflowTemplates.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      )
      .addCase(fetchWorkflowTemplateById.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchWorkflowTemplateById.fulfilled, (state, action) => {
              state.loading = false;
              state.selectedTemplate = action.payload;
            })
            .addCase(fetchWorkflowTemplateById.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
  },
});

export default workflowTemplatesSlice.reducer;
