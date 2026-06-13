import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPendingApprovals,
  approveWorkflowRequest,
  rejectWorkflowRequest,
} from "../features/workflowRequests/workflowRequestsSlice";
import { Link } from "react-router-dom";

const PendingApprovalsPage = () => {
  const dispatch = useDispatch();

  const { pendingApprovals, loading, error } = useSelector(
    (state) => state.workflowRequests,
  );

  useEffect(() => {
    dispatch(fetchPendingApprovals());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const handleApprove = async (workflowRequestId) => {
    await dispatch(approveWorkflowRequest(workflowRequestId));
    dispatch(fetchPendingApprovals());
  };

  const handleReject = async (workflowRequestId) => {
    await dispatch(
      rejectWorkflowRequest({
        workflowRequestId,
        comments: "Rejected from UI",
      }),
    );
    dispatch(fetchPendingApprovals());
  };

  return (
    <div>
      <h1>Pending Approvals</h1>
      {pendingApprovals.length === 0 && <p>No pending approvals found.</p>}
      {pendingApprovals.map((request) => (
        <div
          key={request.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Link to={`/workflow-requests/${request.id}`}>
            <h3>{request.workflowTemplate.name}</h3>
          </Link>
          <p>Status: {request.status}</p>
          <p>Created: {new Date(request.createdAt).toLocaleString()}</p>
          <button onClick={() => handleApprove(request.id)}>Approve</button>
          <button onClick={() => handleReject(request.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default PendingApprovalsPage;
