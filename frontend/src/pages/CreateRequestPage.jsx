import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { fetchWorkflowTemplates } from "../features/workflowTemplates/workflowTemplatesSlice";
import { createWorkflowRequest } from "../features/workflowRequests/workflowRequestsSlice";

const CreateRequestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { templates } = useSelector(
    (state) => state.workflowTemplates
  );

  const [workflowTemplateId, setWorkflowTemplateId] = useState("");

  const [payload, setPayload] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchWorkflowTemplates());
  }, [dispatch]);

  const handlePayloadChange = (event) => {
    setPayload({
      ...payload,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      createWorkflowRequest({
        workflowTemplateId,
        payload,
      })
    );

    navigate("/my-requests");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Typography variant="h5" mb={3}>
          Create Workflow Request
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Workflow Template"
            value={workflowTemplateId}
            onChange={(e) =>
              setWorkflowTemplateId(e.target.value)
            }
            margin="normal"
          >
            {templates.map((template) => (
              <MenuItem
                key={template.id}
                value={template.id}
              >
                {template.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            type="date"
            value={payload.startDate}
            onChange={handlePayloadChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            type="date"
            value={payload.endDate}
            onChange={handlePayloadChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Reason"
            name="reason"
            value={payload.reason}
            onChange={handlePayloadChange}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Submit Request
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateRequestPage;