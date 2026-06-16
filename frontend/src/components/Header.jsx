import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        height: 70,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div>{user?.email}</div>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Header;
