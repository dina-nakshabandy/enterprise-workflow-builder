import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import workflowRequestsReducer from "../features/workflowRequests/workflowRequestsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workflowRequests: workflowRequestsReducer,
  },
});
