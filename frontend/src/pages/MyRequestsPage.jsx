import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyRequests } from "../features/workflowRequests/workflowRequestsSlice";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

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
    <Layout>
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
            <Link to={`/workflow-requests/${request.id}`}>
              <h3>{request.workflowTemplate.name}</h3>
            </Link>
            <p>Status: {request.status}</p>
            <p>Created: {new Date(request.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MyRequestsPage;
