import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchWorkflowRequestById } from "../features/workflowRequests/workflowRequestsSlice";

const WorkflowRequestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedRequest, loading, error } = useSelector(
    (state) => state.workflowRequests,
  );

  useEffect(() => {
    dispatch(fetchWorkflowRequestById(id));
  }, [dispatch, id]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  if (!selectedRequest) return <h2>No request found</h2>;

  return (
    <div>
      <h1>{selectedRequest.workflowTemplate.name}</h1>

      <p>Status: {selectedRequest.status}</p>
      <p>Current Step: {selectedRequest.currentStep}</p>

      <h3>Payload</h3>
      <pre>{JSON.stringify(selectedRequest.payload, null, 2)}</pre>

      <h3>Created By</h3>
      <p>{selectedRequest.createdBy.fullName}</p>
      <p>{selectedRequest.createdBy.email}</p>

      <h3>Approval History</h3>

      {selectedRequest.approvals.length === 0 ? (
        <p>No approvals yet</p>
      ) : (
        selectedRequest.approvals.map((approval) => (
          <div key={approval.id}>
            <p>Decision: {approval.decision}</p>
            <p>Comments: {approval.comments}</p>
            <p>By: {approval.approvedBy.fullName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkflowRequestDetailsPage;
