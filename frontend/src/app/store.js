import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import workflowRequestsReducer from "../features/workflowRequests/workflowRequestsSlice";
import workflowTemplatesReducer from "../features/workflowTemplates/workflowTemplatesSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    workflowRequests: workflowRequestsReducer,
    workflowTemplates: workflowTemplatesReducer,
  },
});
