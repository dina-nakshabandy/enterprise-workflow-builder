import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import MyRequestsPage from "../pages/MyRequestsPage";
import PendingApprovalsPage from "../pages/PendingApprovalsPage";
import ProtectedRoute from "./ProtectedRoute";
import WorkflowRequestDetailsPage from "../pages/WorkflowRequestDetailsPage";
import CreateRequestPage from "../pages/CreateRequestPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflow-requests/:id"
          element={
            <ProtectedRoute>
              <WorkflowRequestDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending-approvals"
          element={
            <ProtectedRoute>
              <PendingApprovalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-request"
          element={
            <ProtectedRoute>
              <CreateRequestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
