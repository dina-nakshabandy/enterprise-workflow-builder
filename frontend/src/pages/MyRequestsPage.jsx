import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyRequests } from "../features/workflowRequests/workflowRequestsSlice";

const MyRequestsPage = () => {
  const dispatch = useDispatch();

  const { requests, loading, error } = useSelector(
    (state) => state.workflowRequests,
  );

  useEffect(() => {
    dispatch(fetchMyRequests());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Requests</h1>

      {requests.map((request) => (
        <div
          key={request.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{request.workflowTemplate.name}</h3>

          <p>Status: {request.status}</p>

          <p>Created: {new Date(request.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRequestsPage;
