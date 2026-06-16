import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        borderRight: "1px solid #ddd",
        padding: 3,

        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Button
        component={Link}
        to="/dashboard"
      >
        Dashboard
      </Button>

      <Button
        component={Link}
        to="/create-request"
      >
        Create Request
      </Button>

      <Button
        component={Link}
        to="/my-requests"
      >
        My Requests
      </Button>

      <Button
        component={Link}
        to="/pending-approvals"
      >
        Pending Approvals
      </Button>
    </Box>
  );
};

export default Sidebar;