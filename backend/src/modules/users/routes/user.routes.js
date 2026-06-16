const express = require("express");

const { authenticate } = require("../../../middlewares/auth.middleware");
const {authorizeRoles} = require("../../../middlewares/rbac.middleware");
const { getCurrentUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/me", authenticate, getCurrentUser);

router.get("/admin-only", authenticate, authorizeRoles("ADMIN"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

module.exports = router;